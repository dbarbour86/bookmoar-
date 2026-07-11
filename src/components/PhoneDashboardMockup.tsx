"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Star, TrendingUp, PhoneCall, DollarSign } from "lucide-react";

export default function PhoneDashboardMockup() {
  // SVG Chart animation properties
  const chartPath = "M 10 70 Q 50 60 90 20 T 170 30 T 250 10 T 330 5";

  return (
    <div className="relative w-full max-w-[340px] mx-auto sm:max-w-[380px] lg:max-w-none">
      {/* Background Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary-red/10 blur-[100px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />

      {/* Floating Decorative Badge 1 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-1/4 z-20 hidden md:flex items-center gap-2 bg-[#101014]/90 border border-white/10 hover:border-primary-red/50 backdrop-blur-md rounded-xl p-3 shadow-2xl transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
          <DollarSign className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-muted-text font-medium leading-none">REVENUE BOOKED</p>
          <p className="text-sm font-display font-bold text-white-text mt-0.5">+$4,250 this week</p>
        </div>
      </motion.div>

      {/* Floating Decorative Badge 2 */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-8 bottom-1/4 z-20 hidden md:flex items-center gap-2 bg-[#101014]/90 border border-white/10 hover:border-primary-red/50 backdrop-blur-md rounded-xl p-3 shadow-2xl transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-lg bg-primary-red/10 flex items-center justify-center text-primary-red">
          <PhoneCall className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-muted-text font-medium leading-none">MISSED CALL RECOVERED</p>
          <p className="text-sm font-display font-bold text-white-text mt-0.5">Lead Saved on Autopilot</p>
        </div>
      </motion.div>

      {/* Phone Chassis */}
      <motion.div
        whileHover={{ y: -5, rotateY: -3, rotateX: 3 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative mx-auto w-[290px] h-[580px] sm:w-[320px] sm:h-[640px] rounded-[48px] border-4 border-[#252528] bg-brand-bg p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,37,56,0.15)] flex flex-col overflow-hidden"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#252528] rounded-b-2xl z-30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-black/60 mr-8" />
          <div className="w-12 h-1 bg-black/40 rounded-full" />
        </div>

        {/* Inner Screen Background */}
        <div className="flex-1 rounded-[38px] bg-[#070709] border border-white/5 overflow-hidden flex flex-col pt-10 px-4 pb-4 select-none">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[8px] font-bold text-muted-text/60 mb-3 px-1.5 -mt-3 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[1px] h-2">
                <div className="w-[1.5px] h-[3px] bg-muted-text/80 rounded-2xs" />
                <div className="w-[1.5px] h-[4.5px] bg-muted-text/80 rounded-2xs" />
                <div className="w-[1.5px] h-[6px] bg-muted-text/80 rounded-2xs" />
                <div className="w-[1.5px] h-[7.5px] bg-muted-text/30 rounded-2xs" />
              </div>
              <span className="text-[7px]">5G</span>
              <div className="w-3.5 h-1.5 border border-muted-text/40 rounded-2xs p-[1px] flex items-center">
                <div className="h-full w-2 bg-muted-text/80 rounded-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Mock App Header */}
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <div>
              <p className="text-[9px] text-muted-text uppercase tracking-widest font-semibold">Dashboard</p>
              <h4 className="font-display text-sm font-bold text-white-text tracking-wide uppercase">BOOK MOAR ENGINE</h4>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-ping" />
              <span className="text-[8px] font-bold text-primary-red uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Stat Overview widget */}
          <div className="bg-card-bg border border-white/5 rounded-2xl p-3 mb-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-red/5 rounded-full blur-xl -z-10" />
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="text-[8px] text-muted-text font-semibold uppercase tracking-wider">Total Leads This Month</p>
                <h3 className="text-xl font-display font-bold text-white-text mt-0.5">142</h3>
              </div>
              <div className="flex items-center gap-0.5 text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[8px] font-bold">
                <TrendingUp className="w-2.5 h-2.5" />
                +24%
              </div>
            </div>

            {/* Sparkline chart */}
            <div className="w-full h-11 mt-1 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 330 80" preserveAspectRatio="none">
                {/* Gridlines */}
                <line x1="0" y1="40" x2="330" y2="40" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF2538" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF2538" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${chartPath} L 330 80 L 10 80 Z`}
                  fill="url(#chartGlow)"
                />
                {/* Line Path */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={chartPath}
                  fill="none"
                  stroke="#FF2538"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Chart X Labels */}
            <div className="flex justify-between text-[7px] text-muted-text/80 font-bold uppercase tracking-wider px-1 mt-1.5">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Notification feed */}
          <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-0.5 max-h-[300px] scrollbar-thin">
            {/* Notification 1: New Booking */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#101014] border border-primary-red/20 hover:border-primary-red/40 rounded-xl p-2.5 flex items-start gap-2.5 transition-all duration-200"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-primary-red/10 border border-primary-red/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary-red" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-primary-red font-bold uppercase tracking-wider">New Booking</p>
                  <span className="text-[8px] text-muted-text">Just now</span>
                </div>
                <p className="text-xs font-bold text-white-text truncate mt-0.5">Detailing Package - $350</p>
                <p className="text-[10px] text-muted-text truncate">John D. • Ford F-150</p>
              </div>
            </motion.div>

            {/* Notification 2: New Review */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0B0B0D] border border-white/5 hover:border-primary-red/30 rounded-xl p-2.5 flex items-start gap-2.5 transition-all duration-200"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">5★ Google Review</p>
                  <span className="text-[8px] text-muted-text">3m ago</span>
                </div>
                <p className="text-xs font-bold text-white-text truncate mt-0.5">\"Best service in Charlotte!\"</p>
                <p className="text-[10px] text-muted-text truncate">Marcus R. • Landscaping</p>
              </div>
            </motion.div>

            {/* Notification 3: Missed Call Recovered */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#0B0B0D] border border-white/5 hover:border-primary-red/30 rounded-xl p-2.5 flex items-start gap-2.5 transition-all duration-200"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Missed Call Saved</p>
                  <span className="text-[8px] text-muted-text">14m ago</span>
                </div>
                <p className="text-xs font-bold text-white-text truncate mt-0.5">Auto text-back answered</p>
                <p className="text-[10px] text-muted-text truncate">Customer replied: \"I need a quote\"</p>
              </div>
            </motion.div>

            {/* Notification 4: Follow-up Sent */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#0B0B0D] border border-white/5 hover:border-primary-red/30 rounded-xl p-2.5 flex items-start gap-2.5 transition-all duration-200"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Nurture Sent</p>
                  <span className="text-[8px] text-muted-text">45m ago</span>
                </div>
                <p className="text-xs font-bold text-white-text truncate mt-0.5">Booking link sent to lead</p>
                <p className="text-[10px] text-muted-text truncate">Estimate follow-up (3/3)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
