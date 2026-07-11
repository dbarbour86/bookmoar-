"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

interface Step {
  num: string;
  tabTitle: string;
  title: string;
  description: string;
  items: string[];
}

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      num: "01",
      tabTitle: "Discover",
      title: "DEEP-DIVE STRATEGY & AUDIT",
      description:
        "We learn your business, services, audience, competitors, goals, and current lead flow before we design anything.",
      items: [
        "Competitor and market review",
        "Current website audit",
        "Booking-flow analysis",
        "Offer and messaging strategy",
      ],
    },
    {
      num: "02",
      tabTitle: "Design",
      title: "DESIGN THE CONVERSION SYSTEM",
      description:
        "We turn the strategy into a premium website and frictionless customer journey.",
      items: [
        "Custom responsive design",
        "Lead and booking forms",
        "Conversion-focused copy",
        "Analytics foundation",
      ],
    },
    {
      num: "03",
      tabTitle: "Launch",
      title: "BUILD, TEST & LAUNCH",
      description:
        "We develop the site, connect the necessary tools, test every path, and launch it properly.",
      items: [
        "Fast production build",
        "Mobile and browser testing",
        "Domain and analytics setup",
        "Launch support",
      ],
    },
    {
      num: "04",
      tabTitle: "Grow",
      title: "IMPROVE & GROW",
      description:
        "We monitor what is working and improve the system as your business grows.",
      items: [
        "Review automation",
        "Local SEO improvements",
        "Conversion optimization",
        "Ongoing support",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-brand-bg py-36 sm:py-48 overflow-hidden border-t border-border-color">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Heading */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-bold text-primary-red uppercase tracking-widest">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-white-text tracking-tight uppercase mt-3 leading-[0.85]">
            SIMPLE PROCESS. <br />
            <span className="font-brush text-primary-red normal-case tracking-normal inline-block transform -rotate-3 text-5xl sm:text-6xl md:text-7xl -mx-1 select-none">Moar</span> RESULTS.
          </h2>
        </div>

        {/* Process Component Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Desktop Navigation Column (Left) - Hidden on Mobile */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-center gap-5 focus:outline-none focus-ring-red ${
                    isActive
                      ? "bg-card-bg border-primary-red/35 shadow-[0_0_20px_rgba(255,37,56,0.06)] text-white-text"
                      : "bg-transparent border-border-color hover:border-white/10 text-muted-text hover:text-white-text"
                  }`}
                >
                  <span className={`font-display text-3xl font-normal transition-colors ${
                    isActive ? "text-primary-red" : "text-white/15"
                  }`}>
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50 mb-0.5">Step {step.num}</span>
                    <span className="font-display text-xl font-normal uppercase tracking-wider">{step.tabTitle}</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "translate-x-1 text-primary-red opacity-100" : "opacity-0 -translate-x-2"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Desktop Content Display Card (Right) - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-8">
            <div className="relative min-h-[420px] rounded-2xl bg-card-bg border border-border-color p-10 sm:p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-primary-red uppercase tracking-widest">
                          STEP {steps[activeStep].num} — {steps[activeStep].tabTitle}
                        </span>
                        <h3 className="font-display text-4xl font-normal text-white-text uppercase tracking-tight mt-1 leading-none">
                          {steps[activeStep].title}
                        </h3>
                      </div>
                      <span className="font-display text-8xl font-normal text-white/5 select-none leading-none -mt-4">
                        {steps[activeStep].num}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-muted-text leading-relaxed max-w-2xl mb-8">
                      {steps[activeStep].description}
                    </p>

                    {/* Included details */}
                    <div className="border-t border-border-color pt-8">
                      <p className="text-xs font-bold text-white-text uppercase tracking-widest mb-4">
                        What's Included:
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {steps[activeStep].items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-3 text-sm text-white-text">
                            <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Layout (Accordion Stack) - Visible on Mobile/Tablet */}
          <div className="lg:hidden w-full flex flex-col gap-4">
            {steps.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border bg-card-bg overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-primary-red/35" : "border-border-color"
                  }`}
                >
                  {/* Step Button */}
                  <button
                    onClick={() => setActiveStep(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-ring-red"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-display text-2xl font-normal ${
                        isOpen ? "text-primary-red" : "text-white/15"
                      }`}>
                        {step.num}
                      </span>
                      <div>
                        <span className="text-[9px] font-bold text-muted-text uppercase tracking-widest block leading-none mb-1">
                          STEP {step.num}
                        </span>
                        <span className="font-display text-lg font-normal uppercase text-white-text tracking-wide">
                          {step.tabTitle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-primary-red" : "text-muted-text"
                    }`} />
                  </button>

                  {/* Step Content */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[500px] border-t border-border-color" : "max-h-0"
                    }`}
                  >
                    <div className="p-6">
                      <h4 className="font-display text-xl font-normal text-white-text uppercase mb-3 leading-none">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-text leading-relaxed mb-6">
                        {step.description}
                      </p>
                      
                      <div className="border-t border-border-color pt-5">
                        <p className="text-[10px] font-bold text-white-text uppercase tracking-widest mb-3">
                          What's Included:
                        </p>
                        <div className="flex flex-col gap-3">
                          {step.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2.5 text-xs text-white-text">
                              <div className="w-4 h-4 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
