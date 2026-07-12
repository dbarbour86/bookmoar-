"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Configurable Cal.com Link - pointing to your user profile
  // Add ?theme=dark to keep styling cohesive
  const CAL_LINK = "https://cal.com/dbarbour86/30min?theme=dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md"
          />

          {/* Modal Content Chassis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-4xl h-[90vh] sm:h-[80vh] rounded-2xl bg-card-bg border border-border-color shadow-2xl p-4 sm:p-6 z-10 overflow-hidden flex flex-col"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border-color shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white-text" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-normal text-white-text uppercase tracking-wide">
                    Schedule a Strategy Call
                  </h3>
                  <p className="text-[10px] text-muted-text">Select a date and time slot that fits your schedule</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-text hover:text-white-text transition-colors p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cal.com Embedded Iframe */}
            <div className="flex-1 w-full rounded-xl overflow-hidden bg-brand-bg relative border border-border-color">
              <iframe
                src={CAL_LINK}
                title="Book a Call"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
