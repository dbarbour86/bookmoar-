"use client";

import { useState } from "react";
import { IntakeSubmissionPayload } from "./types";
import { CheckCircle2, MessageSquare, Copy, Check, ShieldCheck, Printer, RefreshCw } from "lucide-react";

interface ConfirmationViewProps {
  payload: IntakeSubmissionPayload;
  onStartNew: () => void;
}

export default function ConfirmationView({ payload, onStartNew }: ConfirmationViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const { business_identity, services_configuration, setup_and_assets } = payload;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Notice */}
      <div className="p-6 sm:p-8 bg-[#0B0B0D] border border-primary-red/40 rounded-2xl shadow-[0_0_40px_rgba(255,37,56,0.25)] space-y-5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary-red/10 blur-[90px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-red/10 border border-primary-red/30 text-primary-red flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-primary-red font-bold text-xs uppercase tracking-wider block">
                STATUS: PROVISIONING INITIATED
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-white-text uppercase tracking-tight leading-none">
                INTAKE COMPLETE
              </h1>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="text-muted-text block text-[10px] uppercase font-bold tracking-wider">INTAKE IDENTIFIER:</span>
            <span className="text-primary-red font-mono font-bold text-sm">{payload.intake_id}</span>
          </div>
        </div>

        {/* Primary Required Bold Notice */}
        <div className="p-4 bg-[#101014] border border-primary-red/40 text-white-text text-sm sm:text-base font-bold rounded-xl leading-relaxed relative z-10">
          <span className="text-primary-red font-mono mr-2">&gt;&gt;</span>
          INTAKE COMPLETE. ENGINE PROVISIONING UNDERWAY. LIVE VERIFICATION ALERT INCOMING VIA SMS.
        </div>

        {/* SMS Dispatch Verification Banner */}
        <div className="p-4 bg-[#050505] border border-white/5 rounded-xl flex items-start gap-3 relative z-10">
          <MessageSquare className="w-5 h-5 text-primary-red shrink-0 mt-0.5" />
          <div className="text-xs text-muted-text space-y-1">
            <p className="font-bold text-white-text uppercase">
              SMS DISPATCH ROUTED TO:{" "}
              <span className="text-primary-red underline font-mono text-sm">
                {business_identity.alert_phone}
              </span>
            </p>
            <p>
              A test dispatch ping has been sent to confirm receipt. Your staging engine will be online within minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Telemetry Summary Card */}
      <div className="p-6 sm:p-8 bg-[#0B0B0D] border border-white/10 rounded-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-red" />
            <h2 className="text-white-text text-xs sm:text-sm font-bold uppercase tracking-wider">
              CLIENT SPECIFICATION SUMMARY
            </h2>
          </div>
          <span className="text-muted-text text-[11px] font-mono">
            TIMESTAMP: {new Date(payload.timestamp).toLocaleTimeString()}
          </span>
        </div>

        {/* Summary Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Identity Block */}
          <div className="p-5 bg-[#050505] border border-white/5 rounded-xl space-y-3">
            <span className="text-primary-red font-bold text-xs uppercase tracking-wider block border-b border-white/5 pb-2">
              [01] BUSINESS INFORMATION
            </span>
            <div className="space-y-2 text-muted-text">
              <p>
                <strong className="text-white-text uppercase text-[10px] block">Business Name:</strong>
                <span className="text-white-text font-bold text-sm">{business_identity.business_name}</span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Primary Owner:</strong>
                <span className="text-white-text">{business_identity.owner_name}</span>
              </p>
              {business_identity.business_address && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Business Address:</strong>
                  <span className="text-white-text">{business_identity.business_address}</span>
                </p>
              )}
              {business_identity.public_phone && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Public Customer Phone:</strong>
                  <span className="text-white-text font-mono">{business_identity.public_phone}</span>
                </p>
              )}
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Lead Alert Text Mobile:</strong>
                <span className="text-primary-red font-bold font-mono">{business_identity.alert_phone}</span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Carrier Verification Phone:</strong>
                <span className="text-white-text font-bold font-mono">{business_identity.verification_phone || business_identity.alert_phone}</span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Notification Email:</strong>
                <span className="text-white-text">{business_identity.alert_email}</span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Service Area:</strong>
                <span className="text-white-text">{business_identity.service_area}</span>
              </p>
              {business_identity.ideal_job && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Jobs Wanted More Of:</strong>
                  <span className="text-white-text italic">&quot;{business_identity.ideal_job}&quot;</span>
                </p>
              )}
            </div>
          </div>

          {/* Schedule Rules */}
          <div className="p-5 bg-[#050505] border border-white/5 rounded-xl space-y-3">
            <span className="text-primary-red font-bold text-xs uppercase tracking-wider block border-b border-white/5 pb-2">
              [02] SERVICES &amp; ONLINE SETUP
            </span>
            <div className="space-y-2 text-muted-text">
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Trade Focus:</strong>
                <span className="text-primary-red font-bold uppercase">{services_configuration.selected_trade || "Auto Detailing"}</span>
              </p>
              {services_configuration.booking_preference && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Booking Preference:</strong>
                  <span className="text-white-text font-bold">{services_configuration.booking_preference}</span>
                </p>
              )}
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Business Hours:</strong>
                <span className="text-white-text font-bold">{services_configuration.operating_hours}</span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Travel / Buffer Time:</strong>
                <span className="text-primary-red font-bold">{services_configuration.buffer_time}</span>
              </p>
              {services_configuration.excluded_services && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Excluded Services:</strong>
                  <span className="text-white-text">{services_configuration.excluded_services}</span>
                </p>
              )}
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Domain Route:</strong>
                <span className="text-white-text">
                  {setup_and_assets.domain_choice === "own_domain"
                    ? `Custom: ${setup_and_assets.domain_name}`
                    : "Fast-Launch Book Moar Link"}
                </span>
              </p>
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Google Business Profile:</strong>
                <span className="text-white-text">
                  {setup_and_assets.gbp_link ? (
                    <>
                      <span>{setup_and_assets.gbp_link}</span>
                      {setup_and_assets.gbp_admin_invite_sent && (
                        <span className="text-primary-red font-bold ml-1.5">[Admin Invite Sent ✓]</span>
                      )}
                    </>
                  ) : (
                    "Pending / Assist Onboarding"
                  )}
                </span>
              </p>
              {setup_and_assets.existing_website_url && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Existing Website:</strong>
                  <span className="text-white-text">{setup_and_assets.existing_website_url}</span>
                </p>
              )}
              {setup_and_assets.existing_booking_software && (
                <p>
                  <strong className="text-muted-text uppercase text-[10px] block">Current Software:</strong>
                  <span className="text-white-text">{setup_and_assets.existing_booking_software}</span>
                </p>
              )}
              <p>
                <strong className="text-muted-text uppercase text-[10px] block">Assets Staged:</strong>
                <span className="text-white-text">
                  {setup_and_assets.asset_count > 0
                    ? `${setup_and_assets.asset_count} images uploaded`
                    : "Template fallback deployed"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Services List Breakdown */}
        <div className="space-y-2.5">
          <span className="text-white-text font-bold text-xs uppercase tracking-wider block">
            CONFIGURED BOOKING SERVICES ({services_configuration.services.length} ACTIVE)
          </span>
          <div className="border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden">
            {services_configuration.services.map((srv, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#050505] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 text-primary-red flex items-center justify-center font-bold text-[10px]">
                    0{idx + 1}
                  </span>
                  <span className="text-white-text font-bold">{srv.service_name}</span>
                </div>
                <div className="flex items-center gap-4 text-muted-text text-xs">
                  <span>DURATION: <strong className="text-white-text">{srv.duration_mins} MINS</strong></span>
                  <span>PRICE: <strong className="text-primary-red font-bold font-mono">{srv.price_or_deposit}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyJson}
              className="px-4 py-2.5 bg-[#101014] hover:bg-[#181820] border border-white/10 hover:border-primary-red/50 text-white-text text-xs uppercase font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary-red" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "JSON PAYLOAD COPIED!" : "COPY STRUCTURED JSON"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 bg-[#101014] hover:bg-[#181820] border border-white/10 hover:border-white/20 text-muted-text hover:text-white-text text-xs uppercase font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT RECEIPT</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onStartNew}
            className="px-4 py-2.5 bg-transparent hover:bg-white/5 border border-white/10 text-muted-text hover:text-white-text text-xs uppercase font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>SUBMIT ANOTHER INTAKE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
