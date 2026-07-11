"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative bg-brand-bg py-36 sm:py-48 overflow-hidden border-t border-border-color">
      {/* Heavy Radial Red Glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-red/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-6"
        >
          READY TO BOOK MOAR?
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
          <span className="font-brush text-primary-red normal-case tracking-normal inline-block transform -rotate-3 py-2 text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_15px_rgba(255,37,56,0.3)] mt-2 -mb-2 select-none">
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
          Stop losing leads to slower competitors. Schedule a free strategy call and let's identify the fastest way to generate more bookings for your business.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href="#book-call"
            className="group px-8 py-4 rounded-xl bg-white-text hover:bg-white text-brand-bg text-base font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:-translate-y-0.5 focus:outline-none focus-ring-red"
          >
            <Calendar className="w-5 h-5 text-brand-bg fill-brand-bg" />
            Book My Free Strategy Call
          </a>
          <span className="text-xs font-semibold text-muted-text uppercase tracking-widest">
            No pressure. No hard sell. Just a practical growth plan.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
