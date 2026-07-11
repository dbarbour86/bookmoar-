"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Lock, CheckCircle2, Shield } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  nicheName: string;
  price: string;
  period: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  nicheName,
  price,
  period,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const subject = encodeURIComponent(`New Book Moar Niche Sign Up - ${nicheName} - ${formData.businessName}`);
    const body = encodeURIComponent(
      `Hi Book Moar Team,\n\nI have successfully signed up for the ${nicheName} Growth Package!\n\nHere are my details:\n- Business Name: ${formData.businessName}\n- Contact Name: ${formData.contactName}\n- Phone Number: ${formData.phone}\n- Email: ${formData.email}\n- Price: ${price}/${period}\n\nPlease reach out to me to finalize my dashboard integrations.\n\nBest regards,\n${formData.contactName}`
    );

    // Simulate transaction processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Open email client
      window.location.href = `mailto:hello@bookmoar.com?subject=${subject}&body=${body}`;
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg rounded-2xl bg-[#0B0B0D] border border-white/10 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-left"
          >
            {/* Background grid details */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-text hover:text-white-text transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* SUCCESS STATE */}
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white-text uppercase tracking-tight">
                  PURCHASE SUCCESSFUL!
                </h3>
                <p className="text-sm text-muted-text mt-3 leading-relaxed max-w-sm mx-auto">
                  Welcome to Book Moar. Your payment for the **{nicheName} Conversion System** was processed successfully.
                </p>
                <div className="bg-[#101014] border border-white/5 rounded-xl p-4 mt-6 text-xs text-white-text text-left max-w-md mx-auto space-y-2">
                  <p className="font-bold text-primary-red uppercase tracking-wider">Next Steps:</p>
                  <p>1. We are auto-generating your staging environment database.</p>
                  <p>2. A Book Moar integration specialist will call you at <span className="font-semibold text-white-text">{formData.phone}</span> in less than 10 minutes to setup your calendar and review links.</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-3 rounded-lg bg-primary-red hover:bg-[#e01c2e] text-white-text text-sm font-bold uppercase tracking-wider transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* CHECKOUT FORM STATE */
              <div>
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-red flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white-text" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white-text uppercase tracking-wide">
                      GET {nicheName.toUpperCase()} MOAR
                    </h3>
                    <p className="text-xs text-muted-text">Secure Checkout • Instant Setup</p>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#101014] border border-white/5 rounded-xl p-4 mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-text uppercase font-semibold">Selected Package</p>
                    <p className="text-sm font-bold text-white-text mt-0.5">{nicheName} Growth Pack</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display font-black text-white-text leading-none">{price}</p>
                    <p className="text-[10px] text-muted-text uppercase font-semibold mt-0.5">per {period}</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Business Name */}
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
                      placeholder="e.g. Charlotte Auto Spa"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Name, Email, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                        Contact Name
                      </label>
                      <input
                        required
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
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
                        placeholder="(704) 555-0199"
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
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
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-3.5 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Simulated Card Info */}
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <div className="flex items-center gap-1.5 mb-3 text-muted-text">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        SECURE CARD PAYMENT
                      </span>
                    </div>

                    <div className="space-y-3 bg-[#101014] border border-white/5 rounded-xl p-4">
                      <div>
                        <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 px-3 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM / YY"
                            maxLength={5}
                            className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 px-3 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-muted-text uppercase tracking-wider block mb-1">
                            CVC Code
                          </label>
                          <input
                            type="text"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleChange}
                            placeholder="CVC"
                            maxLength={4}
                            className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 px-3 text-sm text-white-text placeholder:text-white/20 focus:border-primary-red/50 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 mt-6 shadow-[0_0_20px_rgba(255,37,56,0.3)] flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,37,56,0.55)] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white-text rounded-full animate-spin" />
                        PROCESSING SECURE PAYMENT...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 fill-white-text/10" />
                        AUTHORIZE & START SYSTEM
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-muted-text mt-3 font-semibold uppercase tracking-wider">
                    <span>Protected by 256-bit encryption</span>
                    <span>•</span>
                    <span>No contract</span>
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
