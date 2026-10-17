import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, ShieldAlert, Code2, Sparkles } from "lucide-react";
import MetricsRow, { DEMO_METRICS } from "@/components/MetricsRow";

export const metadata: Metadata = {
  title: "Statistics Strip (Design Preview) | Book Moar",
  description:
    "Local-only reference preview of the homepage statistics strip. Kept offline until verified stats are confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StatsPreviewPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white-text flex flex-col font-sans selection:bg-primary-red selection:text-white-text">
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-50 bg-[#0B0B0E]/95 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-text hover:text-white-text uppercase tracking-wider transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white-text">
                Statistics Strip Reference
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Local Preview Only
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/hero-preview"
              className="text-muted-text hover:text-white-text transition-colors"
            >
              Hero Preview
            </Link>
            <span className="text-white/20">&bull;</span>
            <Link
              href="/get-started"
              className="text-muted-text hover:text-white-text transition-colors"
            >
              Get Started Page
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Status Callout Banner */}
        <section className="bg-[#0e0e13] border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-300 uppercase tracking-wider">
                  Removed from Public Display — Design Preserved
                </p>
                <p className="text-amber-200/90 leading-relaxed">
                  Per project guidelines, unverified metrics are removed entirely from public homepage rendering. The original component styling, responsive 4-column layout, framer-motion animations, and hover accents are preserved below using isolated demo numbers for future reference.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-[#070709] border border-white/5 space-y-1">
                <span className="text-muted-text uppercase font-semibold block text-[10px] tracking-wider">Public Status</span>
                <span className="text-primary-red font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                  Not Rendered in Public HTML
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#070709] border border-white/5 space-y-1">
                <span className="text-muted-text uppercase font-semibold block text-[10px] tracking-wider">Gap Closure</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Homepage Flow Adjusted
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#070709] border border-white/5 space-y-1">
                <span className="text-muted-text uppercase font-semibold block text-[10px] tracking-wider">Component State</span>
                <span className="text-white-text font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-primary-red" />
                  Ready for Verified Stats
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Label */}
        <div className="pt-10 pb-4 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-red inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Live Component Render (Isolated Demo Figures)
          </span>
        </div>

        {/* =================================================================== */}
        {/* THE PRESERVED METRICS ROW COMPONENT */}
        {/* =================================================================== */}
        <div className="relative">
          <MetricsRow isDemoPreview={true} />
        </div>

        {/* Technical Restoration Guide */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary-red" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white-text">
                How to Re-Enable on the Homepage
              </h3>
            </div>
            
            <p className="text-xs text-muted-text leading-relaxed">
              When real performance numbers (e.g. from the first cohort of service businesses) are verified, re-enable the section by importing the component and passing verified data directly into <code className="text-white-text font-mono">src/app/page.tsx</code>:
            </p>

            <pre className="p-4 rounded-xl bg-[#050507] border border-white/5 text-xs font-mono text-white-text/90 overflow-x-auto leading-relaxed">
{`// 1. In src/app/page.tsx:
import MetricsRow from "@/components/MetricsRow";

// 2. Insert between <Hero /> and <Services />:
<MetricsRow
  metrics={[
    { number: "150+", label: "LEADS DELIVERED" },
    { number: "12", label: "ACTIVE CONTRACTORS" },
    { number: "< 60s", label: "MISSED CALL REPLY" },
    { number: "5.0★", label: "CLIENT EXPERIENCE" },
  ]}
/>`}
            </pre>

            <div className="pt-2 text-[11px] text-muted-text">
              Note: Calling <code className="text-white-text font-mono">&lt;MetricsRow /&gt;</code> without verified props safely returns <code className="text-white-text font-mono">null</code> to guard against accidental unverified displays.
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#08080C] py-6 px-4 text-center text-xs text-muted-text">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Book Moar Internal Design System Reference</span>
          <Link href="/" className="text-primary-red hover:underline font-semibold">
            View Live Homepage
          </Link>
        </div>
      </footer>
    </div>
  );
}
