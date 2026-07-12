"use client";

import { useState, useEffect } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Results", href: "/#results" },
    { name: "About", href: "/#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-bg/85 backdrop-blur-md border-b border-border-color py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-9 h-9 rounded-full bg-primary-red flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
              <Calendar className="w-5 h-5 text-white-text" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider flex items-center">
              <span className="text-white-text">BOOK</span>
              <span className="text-primary-red ml-1">MOAR</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-text hover:text-white-text transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#login"
              className="text-sm font-medium text-muted-text hover:text-white-text transition-colors duration-200 focus:outline-none focus:text-white-text"
            >
              Sign In
            </a>
            <a
              href="#book-call"
              className="px-5 py-2.5 rounded-lg bg-primary-red hover:bg-[#e01c2e] text-white-text font-semibold text-sm transition-all duration-200 transform hover:scale-102 hover:shadow-[0_0_15px_rgba(255,37,56,0.3)] focus:outline-none focus-ring-red"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white-text hover:text-primary-red transition-colors focus:outline-none focus-ring-red p-1 rounded-sm"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-bg/98 backdrop-blur-lg flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-6 border-b border-border-color">
              <a href="#" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
                  <Calendar className="w-4.5 h-4.5 text-white-text" />
                </div>
                <span className="font-display text-xl font-bold tracking-wider">
                  <span className="text-white-text">BOOK</span>
                  <span className="text-primary-red ml-0.5">MOAR</span>
                </span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white-text hover:text-primary-red transition-colors focus:outline-none p-1"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-8 py-12 px-6">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display uppercase tracking-widest text-muted-text hover:text-white-text transition-colors duration-200"
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="w-full max-w-xs flex flex-col gap-4 mt-8 pt-8 border-t border-border-color text-center"
              >
                <a
                  href="#login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-text hover:text-white-text transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="#book-call"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-lg bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold tracking-wider text-center shadow-[0_0_20px_rgba(255,37,56,0.3)] transition-all"
                >
                  BOOK A CALL
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
