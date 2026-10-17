"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Why is the pricing so low?",
      answer: "I'm keeping introductory pricing locked for my first five clients while I build out my initial case studies. Once those five spots are filled, future clients will pay my standard rates. If you lock in one of the five spots now, you keep your rate for life.",
    },
    {
      question: "Is there a long-term contract?",
      answer: "No. All plans are month-to-month. You can cancel anytime without fees or penalties. I want to earn your business every single month.",
    },
    {
      question: "How fast is the setup process?",
      answer: "Your two-week setup timeline starts as soon as I receive your completed intake form and materials. I build the site and configure your system right away, while managing mandatory phone carrier verification so your automated texts deliver reliably. If I miss that two-week deadline, your second month is free.",
    },
    {
      question: "What is the difference between MOAR LEADS and MOAR LEADS: VOICE?",
      answer: "MOAR LEADS includes your custom website, lead capture forms, instant text follow-up, and automated Google review requests. MOAR LEADS: VOICE includes everything in MOAR LEADS, plus an AI voice receptionist to answer customer calls when your hands are full, automated appointment reminders, customer rebooking prompts, and dormant-customer reactivation.",
    },
    {
      question: "Do you support my specific service business?",
      answer: "Yes. I build systems specifically for mobile detailers, roofing contractors, landscapers, movers, dent repair techs, and other appointment-based local service pros.",
    },
  ];

  return (
    <section id="faq" className="relative bg-brand-bg py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary-red uppercase tracking-widest">
            HAVE QUESTIONS?
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white-text tracking-tight uppercase mt-3">
            FREQUENTLY ASKED <span className="text-primary-red">QUESTIONS</span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl bg-card-bg border transition-all duration-300 ${
                  isOpen ? "border-primary-red/35 shadow-[0_0_20px_rgba(255,37,56,0.04)]" : "border-border-color"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-primary-red/50 rounded-xl"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl font-normal uppercase text-white-text tracking-wide pr-4">
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-6 h-6 rounded-md bg-elevated-bg border border-border-color flex items-center justify-center text-muted-text transition-colors duration-200">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-primary-red" />
                    ) : (
                      <Plus className="w-4 h-4 hover:text-white-text" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/5 text-sm sm:text-base text-muted-text leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
