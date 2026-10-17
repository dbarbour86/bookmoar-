"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCircle2,
  Phone,
  Send,
  Play,
  Pause,
  User,
  Car,
} from "lucide-react";

interface StepConfig {
  id: number;
  label: string;
  supporting: string;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    label: "Inquiry received",
    supporting: "Customer submits a quick quote request on your website.",
  },
  {
    id: 2,
    label: "Fast reply",
    supporting: "An automated text replies immediately to clarify the request.",
  },
  {
    id: 3,
    label: "Your turn",
    supporting: "Organized details arrive on your phone so you can follow up and quote.",
  },
];

// Scene durations in milliseconds (~16s loop with a pause at the end)
const SCENE_DURATIONS: Record<number, number> = {
  1: 4800,
  2: 5600,
  3: 5600,
};

export default function StoryPhoneMockup() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isInView, setIsInView] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Pause when scrolled offscreen
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous timer loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || !isInView) return;

    const timer = setTimeout(() => {
      setCurrentScene((prev) => (prev >= 3 ? 1 : prev + 1));
    }, SCENE_DURATIONS[currentScene]);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying, prefersReducedMotion, isInView]);

  const handleStepClick = useCallback((stepId: number) => {
    setCurrentScene(stepId);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const activeStep = STEPS.find((s) => s.id === currentScene) || STEPS[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center select-none"
      aria-label="Example workflow demonstration"
    >
      {/* Background Subtle Red Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-primary-red/6 blur-[90px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* PHONE CHASSIS (~18% reduced dimensions: 265px × 530px desktop) */}
      {/* ========================================================================= */}
      <div className="relative">
        <div className="relative w-[250px] h-[500px] sm:w-[268px] sm:h-[536px] rounded-[44px] border-[4px] border-[#222226] bg-[#050505] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(255,37,56,0.1)] p-2 flex flex-col overflow-visible">
          
          {/* Dynamic Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#141418] rounded-full z-30 flex items-center justify-between px-2 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-black/80" />
            <div className="w-2 h-2 rounded-full bg-[#08080c] border border-white/10" />
          </div>

          {/* Inner Screen Area */}
          <div className="relative flex-1 rounded-[36px] bg-[#070709] border border-white/10 overflow-hidden flex flex-col pt-7 pb-2.5 px-3">
            
            {/* Minimal Status Bar */}
            <div className="w-full flex justify-between items-center px-2 text-[9px] font-bold text-muted-text/75 mb-2 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="text-[8px]">5G</span>
                <div className="w-3.5 h-1.5 rounded-[2px] border border-white/40 p-[1px]">
                  <div className="h-full w-full bg-white/80 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* SCREEN VIEWPORT */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* =============================================================== */}
                {/* SCENE 1: INQUIRY RECEIVED (Miniature Website) */}
                {/* =============================================================== */}
                {currentScene === 1 && (
                  <motion.div
                    key="scene-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Brand Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary-red shadow-[0_0_6px_#FF2538]" />
                          <span className="font-display text-sm tracking-wider uppercase text-white-text font-bold">
                            APEX AUTO DETAIL
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-primary-red uppercase font-semibold">
                          Online
                        </span>
                      </div>

                      {/* Mini Quote Form */}
                      <div className="mt-3 p-3 rounded-xl bg-[#0F0F14] border border-white/10 space-y-2.5 text-left">
                        <span className="text-[9px] font-bold text-white-text uppercase tracking-wider block">
                          Request an Estimate
                        </span>

                        {/* Vehicle Field */}
                        <div className="p-2 rounded-lg bg-[#050505] border border-white/5 flex items-center justify-between">
                          <span className="text-[9px] text-muted-text">Vehicle:</span>
                          <span className="text-[9px] font-semibold text-white-text flex items-center gap-1">
                            <Car className="w-3 h-3 text-primary-red" />
                            SUV
                          </span>
                        </div>

                        {/* Customer Quote Message */}
                        <div className="p-2.5 rounded-lg bg-[#050505] border border-primary-red/35">
                          <span className="text-[8px] text-muted-text block mb-0.5">Message:</span>
                          <p className="text-[11px] text-white-text font-medium leading-snug">
                            “Hi! Can I get a quote for detailing my SUV?”
                          </p>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ scale: 0.98 }}
                          animate={{ scale: [0.98, 1, 0.98] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                          className="w-full py-2.5 rounded-lg bg-primary-red text-white-text font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,37,56,0.35)]"
                        >
                          <Send className="w-3 h-3" />
                          <span>Request Quote</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Subtle Confirmation Pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.35 }}
                      className="p-2 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-2 text-green-400 text-[10px]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold leading-tight">
                        Quote request submitted
                      </span>
                    </motion.div>
                  </motion.div>
                )}

                {/* =============================================================== */}
                {/* SCENE 2: FAST REPLY (Automated Text Conversation) */}
                {/* =============================================================== */}
                {currentScene === 2 && (
                  <motion.div
                    key="scene-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    {/* Minimal Top Header */}
                    <div className="pb-2 border-b border-white/10 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-red/20 border border-primary-red/40 flex items-center justify-center text-primary-red font-bold text-[10px]">
                          A
                        </div>
                        <span className="text-xs font-bold text-white-text leading-none">
                          Apex Auto Detail
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                    </div>

                    {/* Centered Conversation Area with Comfortable Breathing Room */}
                    <div className="flex-1 flex flex-col justify-center space-y-3.5 px-0.5 my-auto">
                      <div className="text-center text-[9px] font-semibold text-muted-text/70 mb-0.5">
                        Today 2:14 PM
                      </div>

                      {/* Customer Initial Inquiry */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="self-end max-w-[88%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-primary-red text-white-text text-[13px] leading-snug font-medium shadow-md"
                      >
                        Hi! Can I get a quote for detailing my SUV?
                      </motion.div>

                      {/* Business Instant Acknowledgment */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.35 }}
                        className="self-start max-w-[92%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-[#16161f] border border-white/10 text-white-text text-[13px] leading-relaxed shadow-sm"
                      >
                        Thanks for reaching out! Are you looking for an interior detail or a full detail?
                      </motion.div>

                      {/* Customer Clarification Reply */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8, duration: 0.35 }}
                        className="self-end max-w-[88%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-primary-red text-white-text text-[13px] leading-snug font-medium shadow-md"
                      >
                        Full detail, please.
                      </motion.div>
                    </div>

                    {/* Bottom padding balance (replaces the removed bottom status bar) */}
                    <div className="h-2 shrink-0" />
                  </motion.div>
                )}

                {/* =============================================================== */}
                {/* SCENE 3: YOUR TURN (Organized Inquiry for Owner) */}
                {/* =============================================================== */}
                {currentScene === 3 && (
                  <motion.div
                    key="scene-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Lockscreen Clock */}
                      <div className="text-center pt-2 pb-2">
                        <span className="font-display text-4xl text-white-text font-normal leading-none block tracking-wide">
                          2:15
                        </span>
                        <span className="text-[10px] text-muted-text font-medium block mt-1 uppercase tracking-wider">
                          Tuesday, October 16
                        </span>
                      </div>

                      {/* Lead Summary Card on Phone Screen */}
                      <div className="p-3.5 rounded-2xl bg-[#0F0F14] border border-white/10 space-y-3 text-left mt-2">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-md bg-primary-red/15 border border-primary-red/30 flex items-center justify-center text-primary-red">
                              <User className="w-3 h-3" />
                            </div>
                            <span className="text-xs font-bold text-white-text">
                              Marcus T.
                            </span>
                          </div>
                          <span className="text-[9px] font-semibold text-primary-red uppercase tracking-wider">
                            Ready for your reply
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-[#050505] border border-white/5">
                            <span className="text-muted-text block text-[8px] uppercase tracking-wider">Service</span>
                            <span className="font-semibold text-white-text">Full Detail</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#050505] border border-white/5">
                            <span className="text-muted-text block text-[8px] uppercase tracking-wider">Vehicle</span>
                            <span className="font-semibold text-white-text">SUV</span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-text bg-[#050505] p-2.5 rounded-lg border border-white/5 leading-snug">
                          <span className="text-white-text font-medium">Customer:</span> “Full detail, please.”
                        </div>

                        {/* Owner 1-Tap Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            className="py-2 px-2.5 rounded-lg bg-primary-red text-white-text text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-default shadow-[0_0_12px_rgba(255,37,56,0.3)]"
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </button>
                          <button
                            type="button"
                            className="py-2 px-2.5 rounded-lg bg-[#16161e] border border-white/10 text-white-text text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-default"
                          >
                            <MessageSquare className="w-3 h-3 text-primary-red" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Home Indicator */}
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-1.5" />
        </div>

        {/* ========================================================================= */}
        {/* TASTEFUL FLOATING NOTIFICATION (Emerges outside phone as visual payoff) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {currentScene === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: -8, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, y: -8, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="absolute -top-3 sm:-top-6 -right-2 sm:-right-8 lg:-right-10 z-30 w-[215px] sm:w-[240px] p-3 rounded-2xl bg-[#121218]/98 backdrop-blur-2xl border-2 border-primary-red/50 shadow-[0_16px_40px_rgba(255,37,56,0.28),0_6px_20px_rgba(0,0,0,0.9)] text-left"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-red shadow-[0_0_6px_#FF2538] animate-pulse" />
                  <span className="text-[9px] font-bold text-white-text uppercase tracking-wider font-mono">
                    BOOK MOAR
                  </span>
                </div>
                <span className="text-[9px] text-primary-red font-semibold">NOW</span>
              </div>

              <h5 className="font-display text-base font-normal uppercase text-white-text tracking-wide leading-tight">
                New detailing inquiry
              </h5>

              <p className="text-xs text-white-text/90 font-semibold mt-1">
                Full detail · SUV
              </p>

              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-muted-text">Marcus T.</span>
                <span className="font-bold text-primary-red uppercase tracking-wider">
                  Ready for your reply
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* COMPACT THREE CLICKABLE NUMBERED STEPS (BELOW / BESIDE) */}
      {/* ========================================================================= */}
      <div className="w-full mt-6 flex flex-col items-center gap-2.5 text-center">
        
        {/* 3 Compact Clickable Step Pills */}
        <div className="inline-flex items-center bg-[#0C0C10] border border-white/10 rounded-full p-1 gap-1 shadow-md">
          {STEPS.map((step) => {
            const isActive = currentScene === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary-red text-white-text shadow-[0_0_12px_rgba(255,37,56,0.35)]"
                    : "text-muted-text hover:text-white-text hover:bg-white/5"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isActive ? "bg-black/30 text-white-text" : "bg-white/10 text-muted-text"
                  }`}
                >
                  {step.id}
                </span>
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Single Short Supporting Sentence for the Active Step */}
        <p className="text-xs text-muted-text max-w-xs sm:max-w-sm h-5 transition-opacity duration-200">
          {activeStep.supporting}
        </p>

        {/* Compact Controls Row: Discreet Workflow Label & Small Accessible Pause */}
        <div className="flex items-center justify-between w-full max-w-[270px] pt-1 text-[10px] text-muted-text/75 border-t border-white/5">
          <span>Example workflow</span>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={togglePlayPause}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-text hover:text-white-text px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-2.5 h-2.5 text-primary-red" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 text-green-400" />
                  <span>Play</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
