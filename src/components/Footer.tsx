import { Calendar, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070709] border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      {/* Subtle bottom grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          {/* Column 1: Logo & Status */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 mb-5 group focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
                <Calendar className="w-4.5 h-4.5 text-white-text" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider uppercase">
                <span className="text-white-text">BOOK</span>
                <span className="text-primary-red ml-0.5">MOAR</span>
              </span>
            </a>
            
            <p className="text-sm text-muted-text leading-relaxed max-w-sm mb-6">
              Websites, local visibility, reviews, and automation built to help local businesses book moar.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 bg-[#0B0B0D] border border-white/5 px-3 py-1.5 rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-muted-text uppercase tracking-wider">
                Accepting New Clients
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-display text-xs font-bold text-white-text uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Services", href: "/#services" },
                { name: "How It Works", href: "/#how-it-works" },
                { name: "Results", href: "/#results" },
                { name: "About", href: "/#about" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-text hover:text-white-text transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-display text-xs font-bold text-white-text uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Website Design",
                "Local SEO & Maps",
                "Review Automation",
                "Lead Follow-Up Automations",
              ].map((service, idx) => (
                <li key={idx}>
                  <a
                    href="/#services"
                    className="text-sm text-muted-text hover:text-white-text transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold text-white-text uppercase tracking-widest mb-1">
              Get In Touch
            </h4>
            
            <div className="flex flex-col gap-3.5 mt-2">
              <a
                href="mailto:hello@bookmoar.com"
                className="flex items-center gap-3 text-sm text-muted-text hover:text-white-text transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 text-primary-red group-hover:scale-110 transition-transform" />
                hello@bookmoar.com
              </a>
              <a
                href="tel:9193519505"
                className="flex items-center gap-3 text-sm text-muted-text hover:text-white-text transition-colors duration-200 group"
              >
                <Phone className="w-4 h-4 text-primary-red group-hover:scale-110 transition-transform" />
                Call: (919) 351-9505
              </a>
              <a
                href="sms:9193519505"
                className="flex items-center gap-3 text-sm text-muted-text hover:text-white-text transition-colors duration-200 group"
              >
                <MessageSquare className="w-4 h-4 text-primary-red group-hover:scale-110 transition-transform" />
                Text: (919) 351-9505
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-text">
                <MapPin className="w-4 h-4 text-primary-red" />
                North Carolina, USA
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-muted-text text-center sm:text-left">
            <span>© {currentYear} Book Moar. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-white-text transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white-text transition-colors">Terms of Service</a>
              <a href="#login" className="hover:text-white-text transition-colors">Client Login</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                ),
                href: "#twitter"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                href: "#instagram"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
                href: "#linkedin"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
                href: "#facebook"
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-8 h-8 rounded-lg bg-[#0B0B0D] border border-white/5 hover:border-primary-red/40 flex items-center justify-center text-muted-text hover:text-primary-red transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
