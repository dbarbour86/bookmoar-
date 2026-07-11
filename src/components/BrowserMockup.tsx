"use client";

import { Check, ShieldCheck, Flame, Zap } from "lucide-react";

export default function BrowserMockup() {
  return (
    <div className="w-full rounded-2xl bg-[#0B0B0D] border border-white/10 shadow-2xl overflow-hidden group hover:border-primary-red/20 transition-all duration-300">
      {/* Browser Chrome Header */}
      <div className="bg-[#101014] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        {/* Left window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        {/* URL Bar */}
        <div className="w-3/5 max-w-md bg-[#050505] border border-white/5 rounded-md py-1 px-3 text-[10px] text-muted-text font-mono text-center truncate">
          charlottedetailpro.com
        </div>
        {/* Right utility spacing */}
        <div className="w-12" />
      </div>

      {/* Browser Screen Content */}
      <div className="bg-[#050505] p-5 sm:p-8 text-left select-none relative overflow-hidden min-h-[300px]">
        {/* Soft decorative background glows inside browser */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary-red/10 rounded-full blur-2xl pointer-events-none" />

        {/* Mock Local Service Site Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-primary-red flex items-center justify-center text-[10px] font-black text-white-text">
              CD
            </div>
            <span className="font-display text-xs font-bold tracking-wider text-white-text uppercase">Charlotte Detail Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold text-muted-text uppercase tracking-wider hidden sm:inline-block">Services</span>
            <span className="text-[9px] font-bold text-muted-text uppercase tracking-wider hidden sm:inline-block">Gallery</span>
            <a href="#quote" className="px-3 py-1.5 rounded bg-primary-red hover:bg-[#e01c2e] text-[9px] font-bold uppercase tracking-wider text-white-text transition-all">
              Book Now
            </a>
          </div>
        </div>

        {/* Mock Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <span className="inline-block text-[8px] font-bold text-primary-red tracking-widest uppercase mb-2">
              #1 Rated Detailer in Charlotte
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white-text uppercase leading-none tracking-tight">
              PREMIUM CERAMIC COATING & MOBILE DETAILING
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-text mt-3 leading-relaxed max-w-sm">
              We bring showroom quality detail directly to your driveway. Licensed, insured, and 5-star rated on Google.
            </p>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-[9px] text-white-text font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-red" />
                100% Satisfaction
              </div>
              <div className="flex items-center gap-1 text-[9px] text-white-text font-semibold">
                <Zap className="w-3.5 h-3.5 text-primary-red" />
                Mobile Service
              </div>
            </div>
          </div>

          {/* Quick Quote Widget on Right */}
          <div className="md:col-span-5 bg-[#0B0B0D] border border-white/10 rounded-xl p-4 shadow-xl">
            <h4 className="font-display text-xs font-bold text-white-text uppercase tracking-wider mb-2">Get Instant Quote</h4>
            <div className="flex flex-col gap-2">
              <div className="bg-[#050505] border border-white/5 rounded px-2.5 py-1.5 text-[9px] text-muted-text font-medium flex justify-between">
                <span>Select Vehicle:</span>
                <span className="text-white-text font-semibold">SUV / Truck ▼</span>
              </div>
              <div className="bg-[#050505] border border-white/5 rounded px-2.5 py-1.5 text-[9px] text-muted-text font-medium flex justify-between">
                <span>Select Package:</span>
                <span className="text-white-text font-semibold">Full Detail + Wax ▼</span>
              </div>
              <button className="w-full py-2 rounded bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold text-[10px] uppercase tracking-wider transition-all mt-1">
                Calculate Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
