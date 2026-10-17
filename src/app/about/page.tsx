import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Derek & Book Moar | Good Work Deserves to Get Booked",
  description:
    "Meet Derek, the dude behind Book Moar. Helping solo operators and small local service businesses capture inquiries and book more jobs without endless phone tag.",
  alternates: {
    canonical: "https://www.bookmoar.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-brand-bg text-white-text pt-36 sm:pt-44 pb-24 sm:pb-32 relative overflow-hidden font-sans selection:bg-primary-red selection:text-white-text">
        {/* Subtle Ambient Red Glows */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-red/5 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
            ABOUT BOOK MOAR
          </div>

          {/* Primary Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-white-text uppercase tracking-tight leading-[0.95] mb-8">
            Good work deserves to get{" "}
            <span className="font-brush text-primary-red normal-case tracking-wider inline-block transform -rotate-1 text-5xl sm:text-6xl md:text-7xl select-none">
              booked.
            </span>
          </h1>

          {/* Opening Introduction */}
          {/* 
            PHOTO LAYOUT NOTE:
            When Derek supplies a portrait photo (e.g. /derek.jpg), it can be placed here beside
            the intro on desktop and above on mobile. The current layout is designed to feel
            complete, balanced, and editorial without requiring a stock or placeholder image.
          */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <p className="font-display text-2xl sm:text-3xl text-white-text uppercase tracking-wide">
              I’m Derek...the dude behind Book Moar.
            </p>
            <p className="text-base sm:text-lg text-white-text/85 leading-relaxed mt-4">
              I work a full-time job, and I’m building Book Moar on the side. For now, it’s just me. When you reach out, I’m the person you’re talking to.
            </p>
          </div>

          {/* Narrative Body */}
          <article className="space-y-6 sm:space-y-7 text-base sm:text-lg text-muted-text leading-relaxed font-normal">
            
            <p className="text-white-text/90 font-medium">
              I started this for the small local businesses doing good work but trying to handle everything themselves.
            </p>

            <p>
              When you’re on a roof, under a sink, or detailing someone’s car, answering the phone isn’t always an option. But the person calling still needs help—and they might call someone else before you get a chance to respond.
            </p>

            <div className="py-2">
              <span className="font-display text-2xl sm:text-3xl text-primary-red uppercase tracking-wider block">
                That’s where Book Moar comes in.
              </span>
            </div>

            <p>
              I build professional websites and simple follow-up systems that help you capture inquiries, respond quickly, and keep track of who needs a reply. You get back to doing the work, with a better way to handle the next opportunity.
            </p>

            <p className="text-white-text/90 font-medium">
              My goal is simple: make that kind of help affordable for a one-person shop or a small local team.
            </p>

            {/* Clear Terms & Timeline Highlights */}
            <div className="my-8 p-6 sm:p-7 rounded-2xl bg-[#0B0B0E] border-l-4 border-primary-red border-y border-r border-white/5 space-y-3">
              <p className="text-white-text font-semibold text-base sm:text-lg">
                No required sales call. No long-term contract. Clear pricing and a straightforward setup.
              </p>
              <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                Your two-week setup timeline starts once I have your completed intake form and required materials. If I miss that deadline, your second month is free.
              </p>
            </div>

            <p>
              Speed matters on both sides. I need your intake form within seven days of payment, along with timely responses during setup. Once your system is running, you or your team need to take over when a customer needs a person. If that kind of follow-through isn’t a priority, we probably aren’t the right fit.
            </p>

            <p className="text-white-text font-medium text-lg sm:text-xl pt-2">
              You’ve worked hard to get good at what you do. I want to help make sure more people get the chance to hire you.
            </p>

            {/* Personal Signoff */}
            <div className="pt-6">
              <span className="font-brush text-4xl sm:text-5xl text-primary-red select-none block">
                — Derek
              </span>
              <span className="text-xs font-mono text-muted-text uppercase tracking-widest block mt-2">
                Founder, Book Moar • North Carolina
              </span>
            </div>

          </article>

          {/* Closing CTA */}
          <section className="mt-16 pt-12 border-t border-white/10">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0B0E] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-primary-red uppercase tracking-widest block">
                  READY TO PARTNER?
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-normal text-white-text uppercase tracking-wide">
                  Ready to get started?
                </h2>
                <p className="text-xs sm:text-sm text-muted-text">
                  See what’s included and how setup works.
                </p>
              </div>

              <Link
                href="/get-started"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_20px_rgba(255,37,56,0.35)] transition-all shrink-0 inline-flex items-center justify-center gap-2 group"
              >
                <span>See How to Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
