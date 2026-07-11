"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Check, Star, ArrowLeft, Shield, Clock, Zap } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import { Niche } from "@/data/niches";

interface NichePageClientProps {
  nicheData: Niche;
}

export default function NichePageClient({ nicheData }: NichePageClientProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-brand-bg bg-dot-pattern flex flex-col text-left">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 py-5 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5 text-white-text" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider flex items-center">
              <span className="text-white-text">BOOK</span>
              <span className="text-primary-red ml-0.5">MOAR</span>
            </span>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-muted-text hover:text-white-text uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to main
          </a>
        </div>
      </header>

      {/* Page Body content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Copywriting & Bullet list */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Tag / Eyebrow */}
            <span className="inline-block text-[10px] font-bold text-primary-red tracking-widest uppercase border border-primary-red/30 bg-primary-red/10 px-3 py-1 rounded-full mb-6">
              SYSTEM FOR {nicheData.industry.toUpperCase()}
            </span>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white-text tracking-tight uppercase leading-[0.9] mb-6">
              {nicheData.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-text leading-relaxed max-w-2xl mb-10">
              {nicheData.subheadline}
            </p>

            {/* Check list */}
            <div className="w-full border-t border-white/5 pt-8 mb-10">
              <h3 className="text-xs font-bold text-white-text uppercase tracking-widest mb-6">
                What is included in the connected booking system:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {nicheData.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-white-text">
                    <div className="w-5 h-5 rounded-full bg-primary-red/15 border border-primary-red/35 flex items-center justify-center text-primary-red shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-tight">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Block */}
            <div className="w-full bg-card-bg border border-border-color rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-red/5 rounded-full blur-xl -z-10" />
              <div className="flex gap-0.5 text-primary-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-red" />
                ))}
              </div>
              <p className="text-sm italic text-muted-text leading-relaxed mb-4">
                "{nicheData.testimonials.quote}"
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white-text">{nicheData.testimonials.author}</span>
                <span className="text-muted-text font-semibold uppercase tracking-wider">{nicheData.testimonials.company}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Image & Pricing Card */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-28">
            <div className="rounded-2xl bg-card-bg border border-border-color p-6 sm:p-8 shadow-2xl flex flex-col relative overflow-hidden group hover:border-primary-red/20 transition-all duration-300">
              
              {/* Image Preview */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-border-color bg-brand-bg">
                <Image
                  src={nicheData.image}
                  alt={nicheData.name}
                  fill
                  sizes="(max-w-7xl) 100vw, 50vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  priority
                />
                {/* Image overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-80" />
              </div>

              {/* Pricing block */}
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold text-muted-text uppercase tracking-wider">
                  ALL-INCLUSIVE SYSTEM
                </span>
                <div className="text-right">
                  <span className="font-display text-4xl sm:text-5xl font-normal text-white-text leading-none">
                    {nicheData.price}
                  </span>
                  <span className="text-sm text-muted-text font-semibold uppercase tracking-wider ml-1">
                    /{nicheData.period}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2.5 border-y border-white/5 py-4 mb-6 text-xs text-muted-text">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-red shrink-0" />
                  No long-term contracts. Cancel anytime.
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-red shrink-0" />
                  10-minute setup phone call guarantee.
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-red shrink-0" />
                  Custom business calendar & Stripe integration.
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.3)] hover:shadow-[0_0_25px_rgba(255,37,56,0.55)] transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Started Now
              </button>

              <span className="text-[10px] text-muted-text font-semibold uppercase tracking-widest text-center mt-3 block">
                30-Day Satisfaction Guarantee
              </span>

            </div>
          </div>

        </div>
      </main>

      {/* Checkout Modal overlay */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        nicheName={nicheData.name}
        price={nicheData.price}
        period={nicheData.period}
      />
    </div>
  );
}
