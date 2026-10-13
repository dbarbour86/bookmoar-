"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IntakeFormData,
  INITIAL_INTAKE_DATA,
  IntakeSubmissionPayload,
} from "./types";
import TelemetryHeader from "./TelemetryHeader";
import ProgressBar from "./ProgressBar";
import Step1Identity from "./Step1Identity";
import Step2Services from "./Step2Services";
import Step3SetupAssets from "./Step3SetupAssets";
import TerminalLoader from "./TerminalLoader";
import ConfirmationView from "./ConfirmationView";
import ThankYouView from "./ThankYouView";
import { ShieldCheck } from "lucide-react";

/**
 * CONFIGURABLE WEBHOOK ENDPOINT
 * Easily point to Make.com, Votel AI, Zapier, or your custom receiver.
 */
export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL ||
  "https://hook.us1.make.com/bookmoar-intake-receiver";

const STORAGE_KEY = "bookmoar_intake_draft";

export default function OnboardingApp() {
  const [formData, setFormData] = useState<IntakeFormData>(INITIAL_INTAKE_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedPayload, setSubmittedPayload] =
    useState<IntakeSubmissionPayload | null>(null);

  // Load draft from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          // Exclude base64 heavy image payloads from draft loading if damaged
          setFormData((prev) => ({
            ...prev,
            ...parsed,
            services:
              Array.isArray(parsed.services) && parsed.services.length > 0
                ? parsed.services
                : prev.services,
          }));
          setLastSavedTime(new Date().toLocaleTimeString());
        }
      }
    } catch (e) {
      console.warn("Failed to retrieve intake draft from localStorage", e);
    }
  }, []);

  // Save draft to localStorage whenever formData updates
  const saveDraft = useCallback((data: IntakeFormData) => {
    try {
      // Exclude large dataUrl strings from localStorage to prevent quota exhaustion
      const draftToSave = {
        ...data,
        assets: data.assets.map((a) => ({
          id: a.id,
          name: a.name,
          size: a.size,
          type: a.type,
        })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftToSave));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn("Could not save intake draft to localStorage", e);
    }
  }, []);

  const handleFieldChange = (fields: Partial<IntakeFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...fields };
      saveDraft(next);
      return next;
    });
  };

  const handleResetDraft = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the intake form? All unsaved inputs will be cleared."
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(INITIAL_INTAKE_DATA);
      setCurrentStep(1);
      setMaxStepReached(1);
      setLastSavedTime(null);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxStepReached) {
      setMaxStepReached(step);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNavigateToStep = (step: number) => {
    return step <= maxStepReached || step === currentStep;
  };

  // Submission handler
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const intakeId = `BM-INTAKE-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const payload: IntakeSubmissionPayload = {
      intake_id: intakeId,
      timestamp: new Date().toISOString(),
      system_version: "bookmoar-v4.2-intake",
      source: "client_onboarding_portal",
      business_identity: {
        business_name: formData.business_name,
        owner_name: formData.owner_name,
        business_address: formData.business_address,
        public_phone: formData.public_phone,
        alert_phone: formData.alert_phone,
        verification_phone: formData.verification_phone,
        alert_email: formData.alert_email,
        service_area: formData.service_area,
        business_hours: formData.business_hours || formData.operating_hours,
        ideal_job: formData.ideal_job,
      },
      services_configuration: {
        selected_trade: formData.selected_trade,
        total_services: formData.services.length,
        services: formData.services.map((s) => ({
          service_name: s.service_name,
          duration_mins: s.duration_mins,
          price_or_deposit: s.price_or_deposit,
        })),
        excluded_services: formData.excluded_services,
        booking_preference: formData.booking_preference,
        inquiry_instructions: formData.inquiry_instructions,
        operating_hours: formData.operating_hours || formData.business_hours,
        buffer_time: formData.buffer_time,
      },
      setup_and_assets: {
        domain_choice: formData.domain_choice,
        domain_name:
          formData.domain_choice === "own_domain"
            ? formData.domain_name
            : `${(formData.business_name || "client")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "")
                .slice(0, 20)}.bookmoar.com`,
        registrar_access_notes: formData.registrar_access_notes,
        gbp_link: formData.gbp_link,
        gbp_admin_invite_sent: formData.gbp_admin_invite_sent,
        existing_website_url: formData.existing_website_url,
        social_links: formData.social_links,
        existing_booking_software: formData.existing_booking_software,
        notes_and_requests: formData.notes_and_requests,
        hosting_cms_logins: formData.hosting_cms_logins,
        asset_count: formData.assets.length,
        assets: formData.assets.map((a) => ({
          name: a.name,
          size: a.size,
          type: a.type,
          dataUrl: a.dataUrl,
        })),
        used_template_fallback: formData.assets.length === 0,
      },
    };

    // Keep loader active for realistic telemetry sequence (~3.5s)
    const minLoaderDelay = new Promise((resolve) => setTimeout(resolve, 3500));

    // 1. Dispatch to local /api/intake which relays to hello@bookmoar.com
    let emailDeliveryResult: {
      sent: boolean;
      provider?: string;
      error?: string;
      attempts?: any[];
    } = { sent: false };

    try {
      const apiRes = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const apiData = await apiRes.json();
      if (apiRes.ok && apiData.email_sent) {
        emailDeliveryResult = {
          sent: true,
          provider: apiData.delivery_provider,
        };
        console.log(`[INTAKE ROUTED] Sent intake payload via ${apiData.delivery_provider}`);
      } else {
        emailDeliveryResult = {
          sent: false,
          error: apiData.email_error || "Could not deliver notification email",
          attempts: apiData.delivery_attempts,
        };
        console.warn("[INTAKE EMAIL DELIVERY WARNING]", apiData);
      }
    } catch (apiErr: any) {
      emailDeliveryResult = {
        sent: false,
        error: apiErr.message || "Network error",
      };
      console.warn("Could not route to /api/intake", apiErr);
    }

    // 2. Also dispatch to external WEBHOOK_URL if configured
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (err) {
      // Ignored if external webhook is mock or offline
    }

    // Wait for the full terminal telemetry animation
    await minLoaderDelay;

    // Cache to sessionStorage for Thank You page reload resilience
    try {
      sessionStorage.setItem("bookmoar_last_intake", JSON.stringify(payload));
      sessionStorage.setItem("bookmoar_email_delivery", JSON.stringify(emailDeliveryResult));
    } catch (e) {
      // sessionStorage quota or private mode
    }

    // Clear draft and show thank you view
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitting(false);
    setSubmittedPayload(payload);
  };

  const handleStartNew = () => {
    setSubmittedPayload(null);
    setFormData(INITIAL_INTAKE_DATA);
    setCurrentStep(1);
    setMaxStepReached(1);
    setLastSavedTime(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg bg-grid-pattern text-white-text selection:bg-primary-red selection:text-white-text relative overflow-hidden font-sans">
      {/* Background radial glows matching Book Moar homepage */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      {isSubmitting ? (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 relative z-10">
          <TerminalLoader businessName={formData.business_name} />
        </main>
      ) : submittedPayload ? (
        /* Thank You View matching intake page */
        <ThankYouView
          intakeId={submittedPayload.intake_id}
          initialPayload={submittedPayload}
        />
      ) : (
        /* Form Active State */
        <>
          {/* Telemetry Header */}
          <TelemetryHeader
            lastSavedTime={lastSavedTime}
            onResetDraft={handleResetDraft}
            currentStep={currentStep}
          />

          <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 relative z-10">
            {/* System Title Banner */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
                    CLIENT ONBOARDING
                  </div>
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white-text tracking-tight uppercase leading-[0.9]">
                    BOOK <span className="font-brush text-primary-red text-4xl sm:text-5xl md:text-6xl normal-case tracking-wider inline-block -rotate-2">Moar</span> INTAKE
                  </h1>
                </div>

                <div className="bg-[#101014] border border-white/5 rounded-xl p-3.5 text-left sm:text-right text-xs hidden sm:block">
                  <span className="text-muted-text text-[10px] block font-bold uppercase tracking-wider">PACKAGE:</span>
                  <span className="text-primary-red font-display text-lg tracking-wider">FOUNDING PARTNER</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-text mt-3 max-w-2xl leading-relaxed">
                Complete this 3-step intake so we can build your booking calendar, automated lead alerts, and custom trade website.
              </p>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              currentStep={currentStep}
              onSelectStep={goToStep}
              canNavigateToStep={canNavigateToStep}
            />

            {/* Step Content Card */}
            <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {currentStep === 1 && (
                <Step1Identity
                  data={formData}
                  onChange={handleFieldChange}
                  onNext={() => goToStep(2)}
                />
              )}

              {currentStep === 2 && (
                <Step2Services
                  data={formData}
                  onChange={handleFieldChange}
                  onNext={() => goToStep(3)}
                  onBack={() => goToStep(1)}
                />
              )}

              {currentStep === 3 && (
                <Step3SetupAssets
                  data={formData}
                  onChange={handleFieldChange}
                  onSubmit={handleFinalSubmit}
                  onBack={() => goToStep(2)}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>

            {/* Bottom Support Footer */}
            <footer className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-text">
              <div>BOOK MOAR &copy; 2026</div>
              <div className="flex items-center gap-2 text-white/70">
                <ShieldCheck className="w-4 h-4 text-primary-red" />
                <span>Your information is securely submitted to Book Moar.</span>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}
