"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const STEPS = [
  { step: 1, code: "01", label: "IDENTITY & ALERTS", shortLabel: "IDENTITY" },
  { step: 2, code: "02", label: "SERVICES & PRICING", shortLabel: "SERVICES" },
  { step: 3, code: "03", label: "ACCESS & ASSETS", shortLabel: "ASSETS" },
];

export default function ProgressBar({
  currentStep,
  onSelectStep,
  canNavigateToStep,
}: ProgressBarProps) {
  const percentage = Math.round((currentStep / 3) * 100);

  return (
    <div className="w-full space-y-2.5">
      {/* Percentage telemetry bar */}
      <div className="flex items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-2">
          <span className="text-primary-red font-bold font-mono">&gt;&gt;</span>
          <span className="uppercase text-muted-text font-bold tracking-wider text-[11px]">
            SETUP COMPLETION
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-sans">
          <span className="text-primary-red font-bold text-sm font-mono">{percentage}%</span>
          <span className="text-muted-text text-[11px] uppercase tracking-wider">COMPLETE</span>
        </div>
      </div>

      {/* Step Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {STEPS.map((s) => {
          const isActive = currentStep === s.step;
          const isDone = currentStep > s.step;
          const canClick = canNavigateToStep(s.step);

          return (
            <button
              key={s.step}
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onSelectStep(s.step)}
              className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isActive
                  ? "bg-[#0B0B0D] border-primary-red/80 shadow-[0_0_20px_rgba(255,37,56,0.2)]"
                  : isDone
                  ? "bg-[#08080A] border-white/10 hover:border-white/20 text-muted-text cursor-pointer"
                  : "bg-[#050505]/60 border-white/5 text-muted-text/40 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <span className="w-5 h-5 rounded-full bg-primary-red/20 border border-primary-red/50 text-primary-red flex items-center justify-center font-bold text-[10px] shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-primary-red" : "text-muted-text/50"
                    }`}
                  >
                    [{s.code}]
                  </span>
                )}
                <span
                  className={`font-display text-sm sm:text-base tracking-wide uppercase truncate ${
                    isActive
                      ? "text-white-text"
                      : isDone
                      ? "text-white-text/80"
                      : "text-muted-text/50"
                  }`}
                >
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.shortLabel}</span>
                </span>
              </div>

              {/* Active Indicator Underline */}
              <div
                className={`h-0.5 w-full mt-2.5 rounded-full transition-all ${
                  isActive
                    ? "bg-primary-red shadow-[0_0_8px_#FF2538]"
                    : isDone
                    ? "bg-primary-red/40"
                    : "bg-white/5"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
