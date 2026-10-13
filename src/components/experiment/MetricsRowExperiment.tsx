"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Flame, Zap } from "lucide-react";

export default function MetricsRowExperiment() {
  const liveActivities = [
    {
      business: "Apex Mobile Detail",
      location: "Raleigh, NC",
      action: "Booked $450 Ceramic Coating package",
      time: "2 mins ago",
      tag: "AUTO-BOOKED",
    },
    {
      business: "Triad Dent Repair",
      location: "Greensboro, NC",
      action: "Sent 8 Google Review requests",
      time: "7 mins ago",
      tag: "REVIEWS SENT",
    },
    {
      business: "Carolina Pro Roofers",
      location: "Charlotte, NC",
      action: "Recovered missed call via SMS bot",
      time: "14 mins ago",
      tag: "MISSED CALL SAVED",
    },
    {
      business: "Oak City Landscaping",
      location: "Cary, NC",
      action: "Strategy call requested",
      time: "22 mins ago",
      tag: "NEW LEAD",
    },
  ];

  const summaryStats = [
    { value: "98.4%", label: "Lead Response Rate", icon: Zap },
    { value: "< 60s", label: "Missed Call Reply", icon: CheckCircle2 },
    { value: "4.9★", label: "Avg Google Rating", icon: ShieldCheck },
  ];

  return (
    <section className="relative bg-[#070709] border-y border-white/10 py-12 overflow-hidden">
      {/* Background Subtle Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Activity Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-red"></span>
            </span>
            <span className="text-xs font-black tracking-widest text-white-text uppercase">
              LIVE SYSTEM ACTIVITY
            </span>
            <span className="text-xs text-muted-text hidden sm:inline">• Real-time bookings & review automation across NC</span>
          </div>

          {/* Quick Summary Pills */}
          <div className="flex flex-wrap items-center gap-4">
            {summaryStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-2 bg-[#0E0E12] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
                  <Icon className="w-3.5 h-3.5 text-primary-red" />
                  <span className="font-bold text-white-text">{stat.value}</span>
                  <span className="text-muted-text font-medium">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Feed Ticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveActivities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-[#0D0D11] border border-white/10 hover:border-primary-red/40 p-4 rounded-xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,37,56,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black text-primary-red bg-primary-red/10 border border-primary-red/30 px-2 py-0.5 rounded tracking-wider uppercase">
                    {item.tag}
                  </span>
                  <span className="text-[11px] text-muted-text">{item.time}</span>
                </div>

                <h4 className="text-sm font-bold text-white-text group-hover:text-primary-red transition-colors duration-200">
                  {item.business}
                </h4>
                <p className="text-xs text-muted-text">{item.location}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white-text font-medium">
                <span>{item.action}</span>
                <Flame className="w-3.5 h-3.5 text-primary-red shrink-0 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
