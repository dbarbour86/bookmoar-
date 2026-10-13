"use client";

import { Shield, RefreshCw, Clock } from "lucide-react";

interface TelemetryHeaderProps {
  lastSavedTime: string | null;
  onResetDraft: () => void;
  currentStep: number;
}

export default function TelemetryHeader({
  lastSavedTime,
  onResetDraft,
  currentStep,
}: TelemetryHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40 text-xs font-sans">
      {/* Top Telemetry Strip */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse shadow-[0_0_8px_#FF2538]" />
          <span className="text-white-text font-bold tracking-wider uppercase text-xs">
            BOOK <span className="font-brush text-primary-red text-sm tracking-wide normal-case inline-block">Moar</span>
            <span className="text-muted-text font-sans font-normal ml-1.5">// CLIENT INTAKE</span>
          </span>
          <span className="hidden sm:inline-block text-white/20">|</span>
          <span className="hidden sm:inline-block text-muted-text text-[11px] font-mono">
            CLIENT ONBOARDING
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-text">
            <Clock className="w-3.5 h-3.5 text-primary-red" />
            <span className="hidden xs:inline text-[11px] uppercase tracking-wider">EST. TIME:</span>
            <span className="text-white-text font-bold">&lt; 4 MINS</span>
          </div>

          <span className="text-white/20">|</span>

          {lastSavedTime ? (
            <div className="flex items-center gap-1.5 text-white-text" title="Draft saved in local browser storage">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
              <span className="text-[10px] text-muted-text uppercase tracking-wider hidden sm:inline">AUTOSAVED</span>
              <span className="text-[10px] text-white-text font-mono font-medium">{lastSavedTime}</span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-text uppercase tracking-wider">SYNCING DRAFT...</span>
          )}

          <button
            type="button"
            onClick={onResetDraft}
            className="text-muted-text hover:text-primary-red p-1 transition-colors text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 cursor-pointer"
            title="Reset form and clear stored draft"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden md:inline">RESET</span>
          </button>
        </div>
      </div>

      {/* Sub-bar with step coordinates */}
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between text-[11px] text-muted-text">
        <div className="flex items-center gap-2">
          <span className="text-muted-text uppercase font-semibold">STAGE:</span>
          <span className="text-white-text font-medium">NEW CLIENT ONBOARDING</span>
          <span className="text-white/20">/</span>
          <span className="text-primary-red font-bold font-mono">STEP 0{currentStep} OF 03</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-text text-[10px] uppercase tracking-wider">
          <Shield className="w-3 h-3 text-primary-red" />
          <span>SECURE FORM</span>
        </div>
      </div>
    </header>
  );
}
