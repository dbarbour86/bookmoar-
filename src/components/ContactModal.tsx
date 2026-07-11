"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, CheckCircle2, Shield } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      alert("Please fill in all contact details.");
      return;
    }
    setLoading(true);

    // Format email body and subject
    const subject = encodeURIComponent(`New Book Moar Strategy Call Request - ${formData.businessName}`);
    const body = encodeURIComponent(
      `Hi Book Moar Team,\n\nI would like to book a strategy call for my business.\n\nHere are my details:\n- Business Name: ${formData.businessName}\n- Contact Name: ${formData.contactName}\n- Phone Number: ${formData.phone}\n- Email: ${formData.email}\n- Message: ${formData.message || "No message provided."}\n\nPlease contact me to schedule a time.\n\nBest regards,\n${formData.contactName}`
    );

    // Simulate sending transition, then trigger mailto
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Open email client
      window.location.href = `mailto:hello@bookmoar.com?subject=${subject}&body=${body}`;
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/85 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg rounded-2xl bg-card-bg border border-border-color shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-left"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-text hover:text-white-text transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-white-text uppercase tracking-tight">
                  Pre-filled Email Opened
                </h3>
                <p className="text-sm text-muted-text mt-3 leading-relaxed max-w-sm mx-auto">
                  I've pre-filled an email with your information and opened your mail client. Just hit **"Send"** in your email app to submit your request!
                </p>
                <div className="bg-elevated-bg border border-border-color rounded-xl p-4 mt-6 text-xs text-white-text text-left max-w-md mx-auto space-y-2">
                  <p className="font-bold text-primary-red uppercase tracking-wider">Details Prefilled:</p>
                  <p>• **Business**: {formData.businessName}</p>
                  <p>• **Phone**: {formData.phone}</p>
                  <p>• **Email**: {formData.email}</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-3 rounded-lg bg-primary-red hover:bg-[#e01c2e] text-white-text text-sm font-bold uppercase tracking-wider transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-red flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white-text" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-normal text-white-text uppercase tracking-wide">
                      Book a Strategy Call
                    </h3>
                    <p className="text-xs text-muted-text">Zero Pressure • 100% Free Plan</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                      Business Name
                    </label>
                    <input
                      required
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Greensboro Roofing Pro"
                      className="w-full bg-brand-bg border border-border-color rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-brand-bg border border-border-color rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(919) 555-0199"
                        className="w-full bg-brand-bg border border-border-color rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@business.com"
                      className="w-full bg-brand-bg border border-border-color rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                      How can we help? (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your services and current leads..."
                      rows={3}
                      className="w-full bg-brand-bg border border-border-color rounded-lg py-2 px-3 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 mt-6 shadow-[0_0_20px_rgba(255,37,56,0.3)] flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,37,56,0.5)] cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white-text rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        PRE-FILL & SEND EMAIL
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[9px] text-muted-text mt-3 font-semibold uppercase tracking-wider">
                    <Shield className="w-3 h-3 text-primary-red" />
                    <span>No marketing spam. Only your strategy plan.</span>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
