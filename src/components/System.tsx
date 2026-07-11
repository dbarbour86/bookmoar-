"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, ArrowUpRight } from "lucide-react";

export default function System() {
  const cards = [
    {
      title: "PREMIUM DESIGN",
      label: "LOOK LEGIT",
      copy: "A polished website gives customers confidence before they ever call.",
      badge: "More Trust",
      icon: Trophy,
    },
    {
      title: "MORE GOOGLE REVIEWS",
      label: "GET CHOSEN",
      copy: "Automated review requests help your business build social proof consistently.",
      badge: "More Authority",
      icon: Sparkles,
    },
    {
      title: "MORE BOOKINGS",
      label: "FOLLOW UP FAST",
      copy: "Instant responses and automated follow-up stop valuable leads from going cold.",
      badge: "More Revenue",
      icon: ArrowUpRight,
    },
  ];

  return (
    <section id="results" className="relative bg-brand-bg py-36 sm:py-48 overflow-hidden bg-dot-pattern">
      {/* Red ambient glows */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-primary-red uppercase tracking-widest">
              THE BOOK MOAR SYSTEM
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-white-text tracking-tight uppercase mt-3 leading-[0.85]">
              WEBSITES ARE EASY. <br />
              <span className="text-primary-red">GROWING YOUR BUSINESS ISN'T.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-muted-text leading-relaxed">
              Anyone can launch a template. We build a connected booking system designed to attract attention, build trust, follow up with leads, and turn interest into revenue.
            </p>
          </div>
        </div>

        {/* 3 Tall Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                key={idx}
                className="group relative rounded-2xl bg-card-bg hover:bg-elevated-bg border border-border-color hover:border-primary-red/35 p-8 flex flex-col justify-between min-h-[380px] transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,37,56,0.03)]"
              >
                {/* Background grid details */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />
                
                {/* Ambient glow inside card on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-red/0 group-hover:bg-primary-red/10 rounded-full blur-xl transition-all duration-300 pointer-events-none" />

                {/* Top Section */}
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest border border-border-color px-2.5 py-1 rounded">
                      {card.label}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-elevated-bg border border-border-color group-hover:border-primary-red/35 group-hover:text-primary-red flex items-center justify-center text-muted-text transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-wide text-white-text uppercase mb-4 leading-none group-hover:text-primary-red transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                    {card.copy}
                  </p>
                </div>

                {/* Bottom Outcome Badge */}
                <div className="mt-8 pt-6 border-t border-border-color flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                    KEY OUTCOME:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-red/10 border border-primary-red/25 text-primary-red text-xs font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-ping" />
                    {card.badge}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
