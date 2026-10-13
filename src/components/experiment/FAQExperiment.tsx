"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Zap, Shield, DollarSign } from "lucide-react";

export default function FAQExperiment() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "setup", label: "Setup & Speed", icon: Zap },
    { id: "pricing", label: "Pricing & Contract", icon: DollarSign },
    { id: "system", label: "Automations & SEO", icon: Shield },
  ];

  const faqs = [
    {
      category: "setup",
      question: "How fast can my new website and booking engine be live?",
      answer: "Most setups launch within 5 to 7 business days. We handle the design, copy, Google Business Profile integration, and missed-call text back automations so you don't have to lift a finger."
    },
    {
      category: "system",
      question: "How does the missed-call text back automation work?",
      answer: "When a potential customer calls your business line while you're busy on a job site, our system immediately sends them a personalized SMS within 30 seconds (e.g. 'Hey! Sorry I missed your call, I'm currently on a job. How can I help you today?'). This keeps them from calling your competitor."
    },
    {
      category: "pricing",
      question: "Are there long-term contracts or cancellation fees?",
      answer: "No long-term contracts. We operate on a month-to-month basis because we believe our system should earn your business every single month through measurable booked jobs."
    },
    {
      category: "system",
      question: "Can I keep my existing phone number and business domain?",
      answer: "Yes! We connect directly with your current domain name and phone number. There's zero downtime or interruption to your existing customer lines."
    },
    {
      category: "setup",
      question: "What do I need to provide to get started?",
      answer: "Just your business logo, basic service list/pricing, and photos of your work if you have them. If you don't have high-res photos, our team sources industry-specific imagery for your niche."
    },
    {
      category: "pricing",
      question: "What is included in the Founding Client Offer?",
      answer: "The Founding Client Offer includes a custom website, Google Business Profile setup, Missed-Call SMS Bot, and Automated Google Review campaign for a discounted founding rate locked in for life."
    }
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="relative bg-brand-bg py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Radial Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
            <span className="text-xs font-black text-primary-red tracking-widest uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-normal text-white-text tracking-tight uppercase leading-[0.85]">
            GOT QUESTIONS? WE'VE GOT <br />
            <span className="font-brush text-primary-red normal-case tracking-wider inline-block transform -rotate-3 text-4xl sm:text-5xl mt-1 select-none">
              Straight Answers.
            </span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-primary-red text-white-text shadow-[0_0_15px_rgba(255,37,56,0.4)]"
                    : "bg-[#0E0E14] text-muted-text border border-white/10 hover:border-white/20 hover:text-white-text"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0B0B0E] border border-white/10 rounded-xl overflow-hidden transition-colors duration-200 hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-base font-bold text-white-text uppercase tracking-wide">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-primary-red text-white-text rotate-180" : "bg-[#14141A] text-muted-text"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 text-sm text-muted-text leading-relaxed border-t border-white/5 mt-1"
                    >
                      <p className="pt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
