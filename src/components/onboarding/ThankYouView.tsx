"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquare, Mail, CheckCircle2, ShieldCheck, ArrowLeft, Clock, Calendar, Printer, AlertCircle } from "lucide-react";
import { IntakeSubmissionPayload } from "./types";

interface ThankYouViewProps {
  intakeId?: string;
  initialPayload?: IntakeSubmissionPayload | null;
}

export default function ThankYouView({ intakeId, initialPayload }: ThankYouViewProps) {
  const [payload, setPayload] = useState<IntakeSubmissionPayload | null>(initialPayload || null);
  const [emailDelivery, setEmailDelivery] = useState<{ sent: boolean; provider?: string; error?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (!payload) {
          const stored = sessionStorage.getItem("bookmoar_last_intake");
          if (stored) {
            setPayload(JSON.parse(stored));
          }
        }
        const deliveryStored = sessionStorage.getItem("bookmoar_email_delivery");
        if (deliveryStored) {
          setEmailDelivery(JSON.parse(deliveryStored));
        }
      } catch (e) {
        console.warn("Could not read stored intake from sessionStorage", e);
      }
    }
  }, [payload]);

  const businessName = payload?.business_identity?.business_name || "Partner";
  const alertPhone = payload?.business_identity?.alert_phone;
  const alertEmail = payload?.business_identity?.alert_email;
  const referenceId = payload?.intake_id || intakeId || "BM-INTAKE-CONFIRMED";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-bg bg-grid-pattern text-white-text selection:bg-primary-red selection:text-white-text relative overflow-hidden font-sans">
      {/* Background radial glows matching Book Moar homepage */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />

      {/* Sticky Header */}
      <header className="border-b border-white/10 bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40 text-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-primary-red shadow-[0_0_8px_#FF2538]" />
            <span className="text-white-text font-bold tracking-wider uppercase text-sm">
              BOOK <span className="font-brush text-primary-red text-base tracking-wide normal-case inline-block">Moar</span>
            </span>
          </a>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-text hidden sm:inline uppercase text-[11px] font-bold">STATUS:</span>
            <span className="text-primary-red font-display text-base tracking-wide uppercase">INTAKE CONFIRMED</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14 space-y-8 relative z-10">
        
        {/* Email delivery diagnostic banner if email dispatch did not confirm */}
        {emailDelivery && !emailDelivery.sent && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-xs text-amber-200 flex items-start gap-3.5 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <span className="font-bold text-amber-300 uppercase tracking-wider block text-xs">
                SERVER NOTICE: DIRECT EMAIL DISPATCH PENDING VERCEL CREDENTIALS
              </span>
              <p className="text-white/80 leading-relaxed text-xs">
                Your intake specification is safely saved with reference ID <span className="font-mono text-white font-bold">{referenceId}</span>. The server recorded your submission, but automatic email forwarding to hello@bookmoar.com requires email credentials configured on Vercel (RESEND_API_KEY or SMTP credentials).
              </p>
              <p className="text-amber-300 font-medium text-xs">
                To confirm setup immediately, please text or call Derek directly at <a href="tel:9193519505" className="underline font-bold text-white">(919) 351-9505</a>.
              </p>
            </div>
          </div>
        )}

        {/* Top Hero Thank You Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center sm:text-left space-y-6">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary-red/10 blur-[90px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-red/10 border border-primary-red/30 text-primary-red flex items-center justify-center font-bold shrink-0 shadow-[0_0_25px_rgba(255,37,56,0.3)]">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
                ONBOARDING SUBMISSION RECEIVED
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white-text uppercase tracking-tight leading-[0.9]">
                THANK YOU FOR TRUSTING BOOK <span className="font-brush text-primary-red text-4xl sm:text-5xl md:text-6xl normal-case tracking-wider inline-block -rotate-2">Moar</span>
              </h1>
            </div>
          </div>

          <div className="space-y-4 pt-2 text-muted-text text-sm sm:text-base leading-relaxed relative z-10">
            <p>
              I know your business is your lifeblood, and trusting me to build and launch your booking system means everything. <strong className="text-white-text">You made the right call.</strong>
            </p>
            <p>
              I&apos;ve received your intake details at <span className="text-primary-red font-medium">hello@bookmoar.com</span>. I&apos;m reviewing your submission now and getting your build underway.
            </p>
          </div>

          {/* Reference Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/5 relative z-10">
            <div className="flex items-center gap-2 text-muted-text">
              <span className="uppercase font-bold text-[10px] tracking-wider">REFERENCE IDENTIFIER:</span>
              <span className="text-primary-red font-mono font-bold text-sm">{referenceId}</span>
            </div>
            {businessName !== "Partner" && (
              <div className="text-white-text font-semibold">
                Client Entity: <span className="text-white-text font-bold">{businessName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Call / Text Direct Contact Card */}
        <div className="rounded-2xl border-2 border-primary-red/40 bg-[#101014] p-6 sm:p-8 shadow-[0_0_35px_rgba(255,37,56,0.25)] space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-red">
                <Phone className="w-4 h-4 text-primary-red" />
                <span>DIRECT FOUNDER &amp; SUPPORT LINE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white-text tracking-wide uppercase">
                CALL OR TEXT ME DIRECTLY ANYTIME
              </h2>
              <p className="text-sm text-muted-text leading-relaxed max-w-xl">
                Have a question about your setup, want to add a custom service, or need immediate assistance? Reach out to me directly:
              </p>
            </div>

            {/* Big Phone Number Display */}
            <div className="text-left md:text-right shrink-0">
              <span className="text-[10px] text-muted-text font-bold uppercase tracking-widest block">DIRECT LINE:</span>
              <a
                href="tel:9193519505"
                className="font-display text-3xl sm:text-4xl text-white-text hover:text-primary-red tracking-wider transition-colors inline-block whitespace-nowrap"
              >
                (919) 351-9505
              </a>
              <span className="text-xs text-primary-red block font-medium">Available via Call or SMS Text</span>
            </div>
          </div>

          {/* 1-Tap Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Call */}
            <a
              href="tel:9193519505"
              className="min-h-[50px] px-6 py-3.5 bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.35)] flex items-center justify-center gap-2.5 text-xs sm:text-sm text-center"
            >
              <Phone className="w-4 h-4" />
              <span>CALL (919) 351-9505</span>
            </a>

            {/* Text SMS */}
            <a
              href="sms:9193519505?body=Hey%20Derek,%20I%20just%20submitted%20my%20Book%20Moar%20intake%20form..."
              className="min-h-[50px] px-6 py-3.5 bg-[#050505] hover:bg-[#0B0B0D] border border-white/10 hover:border-primary-red text-white-text font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm text-center"
            >
              <MessageSquare className="w-4 h-4 text-primary-red" />
              <span>TEXT (919) 351-9505</span>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@bookmoar.com?subject=Book%20Moar%20Intake%20Follow-up"
              className="min-h-[50px] px-6 py-3.5 bg-[#050505] hover:bg-[#0B0B0D] border border-white/10 hover:border-primary-red text-muted-text hover:text-white-text font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm text-center"
            >
              <Mail className="w-4 h-4 text-primary-red" />
              <span>HELLO@BOOKMOAR.COM</span>
            </a>
          </div>
        </div>

        {/* What Happens Right Now Section */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Clock className="w-4 h-4 text-primary-red" />
            <h2 className="text-white-text text-sm font-bold uppercase tracking-wider">
              WHAT HAPPENS RIGHT NOW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#050505] border border-white/5 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-primary-red font-display text-lg">
                <span>01</span>
                <span className="text-white-text text-xs font-sans font-bold uppercase tracking-wider">
                  I BUILD YOUR SYSTEM
                </span>
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                I build your booking site and follow-up automations over the next 2 weeks. No extra work needed on your end—just relax while I put everything in place. If I need any clarification, I&apos;ll reach out directly.
              </p>
            </div>

            <div className="p-5 bg-[#050505] border border-white/5 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-primary-red font-display text-lg">
                <span>02</span>
                <span className="text-white-text text-xs font-sans font-bold uppercase tracking-wider">
                  WE TEST IT TOGETHER ON YOUR PHONE
                </span>
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                Before launch, I send a live test straight to your phone so you can see a simulated inquiry arrive in real time—giving you complete confidence in how it works.
              </p>
            </div>

            <div className="p-5 bg-[#050505] border border-white/5 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-primary-red font-display text-lg">
                <span>03</span>
                <span className="text-white-text text-xs font-sans font-bold uppercase tracking-wider">
                  YOU GO LIVE
                </span>
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                Your site goes live and your number gets verified. Then I&apos;ll send you short video walkthroughs showing everything working — watch them anytime, at your own pace. Got questions? Text me directly, I answer fast.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-text">
          <a
            href="/"
            className="flex items-center gap-2 text-muted-text hover:text-white-text font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-primary-red" />
            <span>RETURN TO BOOK MOAR HOME</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#101014] hover:bg-[#181820] border border-white/10 hover:border-white/20 text-muted-text hover:text-white-text font-bold uppercase rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT CONFIRMATION</span>
            </button>

            <a
              href="/onboarding"
              className="px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 text-muted-text hover:text-white-text font-bold uppercase rounded-xl transition-colors"
            >
              START NEW INTAKE
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
