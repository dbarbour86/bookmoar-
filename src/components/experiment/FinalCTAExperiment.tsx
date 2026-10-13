"use client";

import { motion } from "framer-motion";
import { Calendar, Flame, ShieldCheck, ArrowRight } from "lucide-react";

export default function FinalCTAExperiment() {
  return (
    <section id="contact" className="relative bg-[#060608] py-28 sm:py-36 overflow-hidden border-t border-white/10">
      {/* Heavy Radial Red Glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary-red/12 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Asymmetric Typography Lead Accent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
          <span className="text-xs font-black text-primary-red tracking-widest uppercase">
            READY TO DOMINATE YOUR LOCAL MARKET?
          </span>
          <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white-text tracking-tight uppercase leading-[0.85]"
        >
          READY TO BOOK <br />
          <span className="font-brush text-primary-red normal-case tracking-normal inline-block transform -rotate-3 py-2 text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_20px_rgba(255,37,56,0.5)] mt-2 -mb-2 select-none">
            Moar Customers?
          </span>
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-text max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Stop losing jobs to slower competitors. Schedule a 15-minute strategy call and we'll map out the exact setup to double your monthly booking capacity on autopilot.
        </motion.p>

        {/* High-Converting CTA Container with Prominent Founding Spot Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 bg-[#0F0F14] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-lg mx-auto"
        >
          {/* Founding Offer Badge */}
          <div className="flex items-center gap-2 bg-primary-red/10 border border-primary-red/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-white-text">
            <Flame className="w-4 h-4 text-primary-red animate-bounce" />
            <span className="text-primary-red font-black uppercase tracking-wider">FOUNDING OFFER:</span>
            <span>5 of 5 spots remaining</span>
          </div>

          <a
            href="#lock-pricing"
            className="w-full group px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text text-base font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(255,37,56,0.4)] hover:shadow-[0_0_40px_rgba(255,37,56,0.6)] transform hover:-translate-y-0.5 focus:outline-none"
          >
            <Calendar className="w-5 h-5 text-white-text" />
            Lock In Pricing
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-muted-text mt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-red" />
              Secure Checkout via Stripe
            </span>
            <span>•</span>
            <span>No long-term contract</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
