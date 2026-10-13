"use client";

import { motion } from "framer-motion";
import { Check, Laptop, MapPin, Sparkles } from "lucide-react";
import BrowserMockup from "../BrowserMockup";

export default function ServicesExperiment() {
  const services = [
    {
      title: "WEBSITE DESIGN",
      description: "High-converting websites built to turn local traffic into booked jobs.",
      icon: Laptop,
      highlight: true,
      bullets: [
        "Conversion-first layouts",
        "Fast, mobile-ready builds",
        "Booking and lead forms",
      ],
    },
    {
      title: "SEO & GOOGLE MAPS",
      description: "Get found by customers already searching for your services.",
      icon: MapPin,
      highlight: false,
      bullets: [
        "Google Business Profile optimization",
        "Local service and location pages",
        "Search visibility tracking",
      ],
    },
    {
      title: "AUTOMATIONS",
      description: "Follow up instantly without living on your phone.",
      icon: Sparkles,
      highlight: false,
      bullets: [
        "Missed-call text back",
        "Review request campaigns",
        "Lead follow-up sequences",
      ],
    },
  ];

  const designFeatures = [
    "Designed for speed and mobile",
    "Clear calls to action",
    "Fast quote and booking forms",
    "Conversion-focused copy structure",
  ];

  return (
    <section id="services" className="relative bg-brand-bg py-28 sm:py-36 overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Asymmetric Typography */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
            <span className="text-xs font-black text-primary-red tracking-widest uppercase">
              THE THREE CORE PILLARS
            </span>
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-white-text tracking-tight uppercase leading-[0.85]">
            EVERYTHING YOU NEED TO <br />
            GET <span className="font-brush text-primary-red normal-case tracking-wider inline-block transform -rotate-3 text-5xl sm:text-6xl md:text-7xl -mx-1 select-none">Moar</span> BOOKINGS.
          </h2>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                key={idx}
                className={`relative rounded-2xl p-8 flex flex-col bg-[#0C0C10] transition-all duration-300 border ${
                  service.highlight
                    ? "border-primary-red/50 shadow-[0_0_35px_rgba(255,37,56,0.18)] md:scale-102 z-10"
                    : "border-white/10 hover:border-primary-red/30"
                }`}
              >
                {/* Top Icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.highlight
                      ? "bg-primary-red text-white-text shadow-[0_0_20px_rgba(255,37,56,0.5)]"
                      : "bg-[#14141A] text-muted-text border border-white/10"
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {service.highlight && (
                    <span className="bg-primary-red/15 border border-primary-red/40 text-primary-red text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                      Core Engine
                    </span>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-display text-2xl font-normal tracking-wide text-white-text uppercase">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-text leading-relaxed mt-3 flex-1">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-white-text font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Wide Feature Panel (High-Converting Design) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-[#0B0B0E] border border-white/10 p-8 sm:p-14 overflow-hidden shadow-2xl"
        >
          {/* Radial ambient glow behind panel */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary-red/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side details */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-0.5 bg-primary-red" />
                <span className="text-[10px] font-black text-primary-red uppercase tracking-widest">
                  CONVERSION-FIRST ARCHITECTURE
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-normal text-white-text uppercase tracking-tight leading-none">
                HIGH-CONVERTING DESIGN SYSTEM
              </h3>
              <p className="text-sm text-muted-text mt-4 max-w-md leading-relaxed">
                Most agencies build pretty layouts that fail to convert. We build high-converting website engines engineered specifically to turn local searchers into booked phone calls and online leads.
              </p>

              {/* Bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {designFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-sm font-medium text-white-text">
                    <div className="w-5 h-5 rounded-full bg-primary-red/20 border border-primary-red/40 flex items-center justify-center text-primary-red shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side Browser Mockup */}
            <div className="lg:col-span-6 w-full">
              <BrowserMockup />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
