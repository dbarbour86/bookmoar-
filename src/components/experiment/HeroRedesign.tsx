"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Flame, Clock, Sparkles } from "lucide-react";
import PhoneDashboardMockup from "../PhoneDashboardMockup";

export default function HeroRedesign() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] pt-36 pb-24 md:pt-44 md:pb-32 flex items-center overflow-hidden bg-[#050507]">
      {/* Texture Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a24_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-red/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary-red/6 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Copy and CTAs) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Redesign Lead Accent */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-0.5 bg-primary-red shadow-[0_0_12px_rgba(255,37,56,0.9)]" />
              <span className="text-xs font-black text-primary-red tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-red" />
                AUTOMATED BOOKING SYSTEM FOR LOCAL SERVICES
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white-text tracking-tighter leading-[0.8] uppercase flex flex-col"
            >
              <span>MORE BOOKINGS.</span>
              <span className="relative inline-block -mt-1.5 sm:-mt-2.5 md:-mt-4 lg:-mt-5">
                <span className="font-brush text-primary-red text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider normal-case block transform -rotate-3 origin-left py-2 drop-shadow-[0_0_25px_rgba(255,37,56,0.5)]">
                  Less Guesswork.
                </span>
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-muted-text max-w-xl mt-6 leading-relaxed"
            >
              High-converting website systems, missed-call SMS text backs, Google Review automation, and local SEO built specifically for contractors, detailers, roofers, and local pros.
            </motion.p>

            {/* Bolder Urgency Badge + Active CTA Buttons */}
            <div className="flex flex-col items-start gap-4 mt-8 w-full">
              
              {/* Founding Client Spot Urgency Banner */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 bg-[#16080A] border border-primary-red/40 px-4 py-2 rounded-xl text-xs font-bold text-white-text shadow-[0_0_20px_rgba(255,37,56,0.2)]"
              >
                <Flame className="w-4 h-4 text-primary-red animate-bounce" />
                <span className="text-primary-red uppercase font-black tracking-wider">FOUNDING OFFER:</span>
                <span className="font-mono tabular-nums">5 of 5 spots remaining</span>
                <Clock className="w-3.5 h-3.5 text-muted-text ml-1" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="w-full sm:w-auto flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#lock-pricing"
                  className="group px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] active:scale-[0.98] text-white-text text-base font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-[0_0_35px_rgba(255,37,56,0.6)] transform hover:-translate-y-0.5 focus:outline-none"
                >
                  Lock In Pricing
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#how-it-works"
                  className="group px-8 py-4 rounded-xl bg-[#0D0D12] border border-white/15 hover:border-primary-red/50 hover:text-primary-red active:scale-[0.98] text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none"
                >
                  See How It Works
                </a>
              </motion.div>
            </div>

            {/* Trust and Reviews row */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-text font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  No long-term contracts
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  Built for local service pros
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  Launch in 7 days
                </div>
              </div>

              {/* Compact Review Display */}
              <div className="flex items-center gap-2.5 bg-[#0D0D11] border border-white/10 px-4 py-2.5 rounded-xl shadow-lg">
                <div className="flex gap-0.5 text-primary-red">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-red" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white-text tracking-wide uppercase border-l border-white/10 pl-2.5 font-mono tabular-nums">
                  5.0 ★ (Verified)
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (Phone Dashboard Mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="lg:col-span-5 flex justify-center items-center lg:pl-4"
          >
            <PhoneDashboardMockup />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
