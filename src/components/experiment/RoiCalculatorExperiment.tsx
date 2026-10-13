"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, PhoneOff, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

export default function RoiCalculatorExperiment() {
  const [missedCalls, setMissedCalls] = useState<number>(8);
  const [ticketSize, setTicketSize] = useState<number>(450);

  // Math: 8 missed calls/wk * 4 wks = 32 missed calls/mo.
  // 35% recovered via instant SMS text-back = ~11 extra booked jobs.
  const monthlyMissed = missedCalls * 4;
  const estimatedBookedJobs = Math.round(monthlyMissed * 0.35);
  const monthlyLostRevenue = monthlyMissed * ticketSize;
  const monthlyRecoveredRevenue = estimatedBookedJobs * ticketSize;
  const annualRecoveredRevenue = monthlyRecoveredRevenue * 12;

  return (
    <section id="roi-calculator" className="relative bg-[#09090D] py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-primary-red/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
            <span className="text-xs font-black text-primary-red tracking-widest uppercase">
              INSTANT LEAKAGE CALCULATOR
            </span>
            <div className="w-8 h-0.5 bg-primary-red shadow-[0_0_10px_rgba(255,37,56,0.8)]" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white-text tracking-tight uppercase leading-[0.85]">
            HOW MUCH REVENUE ARE MISSED CALLS <br />
            <span className="font-brush text-primary-red normal-case tracking-normal inline-block transform -rotate-3 text-4xl sm:text-5xl md:text-6xl mt-2 select-none">
              Costing Your Business?
            </span>
          </h2>
          <p className="text-sm text-muted-text mt-4 max-w-lg mx-auto leading-relaxed">
            When a potential customer calls while you're on a job site, they call your competitor 60 seconds later. See how much our Missed-Call SMS Auto-Responder recovers.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders Control Box */}
          <div className="lg:col-span-7 bg-[#0E0E14] border border-white/10 p-6 sm:p-10 rounded-2xl flex flex-col justify-between shadow-2xl">
            
            {/* Slider 1: Missed Calls per week */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-white-text flex items-center gap-2">
                  <PhoneOff className="w-4 h-4 text-primary-red" />
                  Estimated Missed Calls / Week
                </label>
                <span className="text-xl font-display font-bold text-primary-red bg-primary-red/10 border border-primary-red/30 px-3 py-0.5 rounded-lg">
                  {missedCalls} calls/wk
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={missedCalls}
                onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                className="w-full h-2 bg-[#1A1A24] rounded-lg appearance-none cursor-pointer accent-primary-red"
              />
              <div className="flex justify-between text-[11px] text-muted-text mt-1 font-medium">
                <span>1 call/wk</span>
                <span>12 calls/wk</span>
                <span>25 calls/wk</span>
              </div>
            </div>

            {/* Slider 2: Average Job Ticket Size */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-white-text flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary-red" />
                  Average Ticket / Job Value
                </label>
                <span className="text-xl font-display font-bold text-white-text bg-[#1A1A24] border border-white/10 px-3 py-0.5 rounded-lg">
                  ${ticketSize.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={ticketSize}
                onChange={(e) => setTicketSize(parseInt(e.target.value))}
                className="w-full h-2 bg-[#1A1A24] rounded-lg appearance-none cursor-pointer accent-primary-red"
              />
              <div className="flex justify-between text-[11px] text-muted-text mt-1 font-medium">
                <span>$100 (Quick detail)</span>
                <span>$1,000 (PDR / Dent)</span>
                <span>$2,500+ (Roofing / Large Job)</span>
              </div>
            </div>

            {/* Breakdown Note */}
            <div className="bg-[#14141E] border border-white/5 p-4 rounded-xl flex items-start gap-3 text-xs text-muted-text">
              <ShieldAlert className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
              <span>
                Based on industry benchmarks, <strong>35% of missed callers</strong> will instantly engage and book via automated SMS text-back when contacted within 60 seconds.
              </span>
            </div>

          </div>

          {/* Real-time Calculation Results Display Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#160B0E] to-[#0D0B10] border border-primary-red/40 p-6 sm:p-10 rounded-2xl flex flex-col justify-between shadow-[0_0_40px_rgba(255,37,56,0.15)] relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32 text-primary-red" />
            </div>

            <div>
              <span className="text-[10px] font-black text-primary-red tracking-widest uppercase bg-primary-red/10 border border-primary-red/30 px-2.5 py-1 rounded-full">
                ESTIMATED RECOVERABLE REVENUE
              </span>

              <div className="mt-6">
                <span className="text-xs text-muted-text uppercase font-bold tracking-wider">
                  Monthly Revenue Currently Lost:
                </span>
                <div className="text-2xl font-display font-bold text-muted-text line-through decoration-primary-red/80">
                  ${monthlyLostRevenue.toLocaleString()}/mo
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-xs text-primary-red uppercase font-black tracking-widest">
                  Recovered Revenue With Book Moar:
                </span>
                <div className="text-4xl sm:text-5xl font-display font-black text-white-text tracking-tight mt-1 text-shadow-red">
                  +${monthlyRecoveredRevenue.toLocaleString()}
                  <span className="text-base text-muted-text font-normal font-sans">/mo</span>
                </div>
                <div className="text-xs text-primary-red font-bold mt-1">
                  ≈ +${annualRecoveredRevenue.toLocaleString()}/year in extra bookings
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="#book-call"
                className="w-full group px-6 py-3.5 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(255,37,56,0.4)] transform hover:-translate-y-0.5"
              >
                Stop Losing ${monthlyLostRevenue.toLocaleString()}/mo
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
