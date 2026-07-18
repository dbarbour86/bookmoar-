"use client";

import { motion } from "framer-motion";

export default function FoundingOfferBottom() {
  return (
    <section className="bg-[#0B0B0D] border-t border-white/5 py-16 sm:py-20 relative overflow-hidden">
      {/* Soft red radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Flame Icon Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-6">
            <span>🔥</span> Founding Client Offer
          </div>

          {/* Heading */}
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white-text uppercase tracking-tight leading-none mb-6">
            LOCK IN INTRODUCTORY PRICING <span className="text-primary-red">FOR LIFE</span>
          </h3>

          {/* Description Copy */}
          <p className="text-sm sm:text-base text-muted-text max-w-2xl leading-relaxed mb-8">
            We're looking for our first <strong>five businesses</strong> to partner with. If you're one of the first five clients, you'll lock in our introductory pricing forever. Once all five spots are filled, pricing will increase. Founding clients are grandfathered in and keep their pricing for as long as they remain active.
          </p>

          {/* Spots remaining indicator */}
          <div className="flex items-center gap-3 bg-[#101014] border border-white/5 px-4 py-2.5 rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-red"></span>
            </span>
            <span className="text-xs font-bold text-white-text uppercase tracking-wider">
              Only 5 Founding Client Spots Available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
