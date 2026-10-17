"use client";

import { motion } from "framer-motion";

export interface MetricItem {
  number: string;
  label: string;
}

/**
 * ============================================================================
 * DEMO STATISTICS DATA - LOCAL PREVIEW REFERENCE ONLY
 * ============================================================================
 * These sample figures were used for initial design visualization.
 * Per project policy: Keep these figures strictly isolated to local previews
 * and never output unverified performance claims in public customer-facing renders.
 */
export const DEMO_METRICS: MetricItem[] = [
  { number: "100+", label: "LEADS GENERATED" },
  { number: "10+", label: "LOCAL BUSINESSES" },
  { number: "24/7", label: "AUTOMATED FOLLOW-UP" },
  { number: "5★", label: "CLIENT EXPERIENCE" },
];

export interface MetricsRowProps {
  /**
   * Verified client performance metrics to render.
   * If omitted and isDemoPreview is false, the component safely returns null
   * so no unverified claims or empty containers leak into public HTML.
   */
  metrics?: MetricItem[];
  /**
   * Explicit flag required to render sample figures in internal/local preview mode.
   */
  isDemoPreview?: boolean;
}

export default function MetricsRow({ metrics, isDemoPreview = false }: MetricsRowProps) {
  // Use verified metrics if provided; fall back to demo data only when explicitly in preview mode
  const activeMetrics = metrics || (isDemoPreview ? DEMO_METRICS : null);

  // If no verified stats are supplied and we are not in preview, do not render to public DOM
  if (!activeMetrics || activeMetrics.length === 0) {
    return null;
  }

  return (
    <section
      className="relative bg-brand-bg border-y border-white/5 py-16 overflow-hidden"
      aria-label={isDemoPreview ? "Demo Statistics Reference" : "Performance Metrics"}
    >
      <div className="absolute inset-0 bg-[#0B0B0D]/30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center text-center">
          {activeMetrics.map((metric, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="flex flex-col items-center group"
            >
              <div className="relative">
                <span className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white-text tracking-tight transition-transform duration-300 group-hover:scale-105 block">
                  {metric.number}
                </span>
                {/* Accent red underline glow */}
                <div className="w-12 h-1 bg-primary-red mx-auto mt-2 rounded-full opacity-60 group-hover:w-16 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-muted-text uppercase tracking-widest mt-4 max-w-[150px] mx-auto leading-relaxed group-hover:text-white-text transition-colors duration-200">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
