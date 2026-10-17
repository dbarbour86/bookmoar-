import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Check,
  ArrowRight,
  Clock,
  ShieldAlert,
  AlertCircle,
  Phone,
  MessageSquare,
  Mail,
  FileText,
  Sparkles,
  Laptop,
  UserCheck,
  Zap,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Started | Book Moar — Good Work Deserves to Get Booked",
  description:
    "Affordable websites and fast follow-up for local service businesses. Review our Starter and Grow plans, onboarding process, requirements, and timelines.",
};

export default function GetStartedPage() {
  const starterDeliverables = [
    {
      title: "Conversion-Focused Website",
      desc: "Fast, mobile-optimized site built specifically for your trade with clear calls to action so visitors immediately trust your business.",
      practical: "Turns visitors into calls and quote requests instead of bouncing to competitors.",
    },
    {
      title: "Trade-Specific Lead & Quote Forms",
      desc: "Streamlined inquiry forms capturing job location, service needed, and preferred timeframe without confusing questions.",
      practical: "Delivers organized job details straight into your inbox so you can quote quickly.",
    },
    {
      title: "Real-Time Lead Alerts",
      desc: "Immediate SMS and email notifications dispatched to your phone the second an inquiry is submitted.",
      practical: "Ensures you never leave a fresh lead sitting unanswered while working in the field.",
    },
    {
      title: "Domain Setup & Fast Hosting",
      desc: "Connection to your custom domain or clean Book Moar address, complete with SSL encryption and reliable cloud hosting.",
      practical: "Keeps your site secure, professional, and accessible 24/7 with zero technical hassle.",
    },
  ];

  const growDeliverables = [
    {
      title: "Everything in the Starter Plan",
      desc: "Complete high-converting website, custom quote forms, real-time alerts, and secure cloud hosting.",
      practical: "The solid online foundation every local service business needs.",
    },
    {
      title: "Missed-Call Text-Back Automation",
      desc: "Automatically sends a friendly, personalized text within 30 seconds when you miss a customer call.",
      practical: "Rescues lost callers while you are on a roof, under a vehicle, or on a job site.",
    },
    {
      title: "Google Review Request Campaigns",
      desc: "Automated SMS and email review prompts sent to completed customers with a direct link to your Google profile.",
      practical: "Consistently collects 5-star reviews to boost your local reputation and search placement.",
    },
    {
      title: "Google Business Profile & Local SEO",
      desc: "Setup and optimization of your Google Maps listing, trade categories, service areas, and local citations.",
      practical: "Helps homeowners and local customers find your business when searching nearby.",
    },
    {
      title: "Online Appointment & Arrival Window Booking",
      desc: "Interactive scheduling system allowing customers to select arrival windows or diagnostic visits.",
      practical: "Cuts down endless back-and-forth phone tag by letting customers pick a convenient slot.",
    },
    {
      title: "A2P 10DLC Carrier SMS Compliance",
      desc: "Official business carrier registration so your automated SMS notifications are delivered reliably without carrier blocks.",
      practical: "Protects your phone number and guarantees compliant, high-deliverability messaging.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Choose Your Plan & Pay",
      desc: "Select the Starter or Grow plan, complete secure Stripe checkout, and pay the one-time $199 setup fee. There are no contracts, and your rate is locked in.",
      tag: "Immediate Checkout",
    },
    {
      step: "02",
      title: "Complete the 5-Minute Intake Form",
      desc: "Right after payment, submit your onboarding details at /onboarding. Give us your business name, trade, core services, pricing, logo, and photos of your work.",
      tag: "7-Day Deadline",
    },
    {
      step: "03",
      title: "Setup & Build Begins",
      desc: "Once we receive your completed intake form and all required materials, our team gets to work. Your two-week setup timeline officially starts.",
      tag: "2-Week Build",
    },
    {
      step: "04",
      title: "Phone Test, Review & Launch",
      desc: "We send a live test inquiry straight to your phone so you see how leads arrive in real time. After a quick final review together, your system goes live.",
      tag: "Live on Your Phone",
    },
  ];

  const checklistItems = [
    {
      title: "Accurate Business Details",
      desc: "Your legal business name, owner name, public contact phone, address or shop base, and exact cities/ZIP codes served.",
    },
    {
      title: "Core Services & Pricing",
      desc: "A list of the main jobs you want more of, starting prices or diagnostic fees, and any services you explicitly do not provide.",
    },
    {
      title: "Brand Assets & Photos",
      desc: "Your business logo (high-res or vector) and authentic photos of your work, trucks, or crew. If you do not have photos, we provide clean industry-specific imagery.",
    },
    {
      title: "Domain & Account Access",
      desc: "Your domain registrar details (e.g. GoDaddy, Namecheap) or approval to use a Book Moar address, plus Google Business Profile manager access if applicable.",
    },
    {
      title: "Timely Approvals",
      desc: "A prompt response when we send your preview link and live phone test during the final review phase.",
    },
    {
      title: "A Dedicated Inquiry Handler",
      desc: "Someone on your team designated to keep their phone handy, answer customer calls, reply to quotes, and close bookings promptly.",
    },
  ];

  const expectations = [
    {
      icon: Laptop,
      title: "Captures Demand, Doesn't Create It",
      desc: "A website and follow-up system capture and convert inquiries from people already interested in your work. It does not magically generate customers out of thin air.",
    },
    {
      icon: Clock,
      title: "Local SEO Takes Time",
      desc: "Building local search engine visibility and Google Maps authority is a gradual process. It takes consistent reviews and time, with no guaranteed ranking position.",
    },
    {
      icon: UserCheck,
      title: "Bookings Depend on Your Offer & Follow-Up",
      desc: "Final job bookings depend heavily on your pricing, local market demand, reputation, and how promptly and professionally you communicate with leads.",
    },
    {
      icon: XCircle,
      title: "No Exaggerated Guarantees",
      desc: "We never guarantee specific search rankings, lead counts, revenue numbers, or booked jobs. We build high-quality systems that make winning jobs much easier.",
    },
    {
      icon: ShieldAlert,
      title: "No Paid Advertising Management",
      desc: "Our previous Scale tier has been discontinued. We focus entirely on high-converting websites, local SEO, review collection, and instant follow-up automation. We do not run paid ads.",
    },
  ];

  return (
    <>
      <Header />

      <main className="bg-brand-bg text-white-text pt-32 sm:pt-40 pb-28 min-h-screen relative overflow-hidden font-sans selection:bg-primary-red selection:text-white-text">
        {/* Ambient Red Glows */}
        <div className="absolute top-20 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-primary-red/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================================= */}
          {/* HERO / POSITIONING HEADER */}
          {/* ========================================================================= */}
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
              TRANSPARENT ONBOARDING &amp; PLANS
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white-text uppercase tracking-tight leading-[0.9] mb-6">
              GOOD WORK DESERVES TO GET <br />
              <span className="font-brush text-primary-red normal-case tracking-wider inline-block transform -rotate-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl select-none mt-2">
                Booked.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-text font-normal max-w-2xl mx-auto leading-relaxed">
              Affordable websites and fast follow-up for local service businesses.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-text uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary-red" /> No Long-Term Contracts
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary-red" /> 2-Week Setup Timeline
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary-red" /> Built for Solo Operators &amp; Small Teams
              </span>
            </div>

            <div className="mt-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs text-muted-text hover:text-white-text transition-colors group"
              >
                <span>Built on the side for local businesses</span>
                <span className="text-primary-red font-semibold group-hover:underline">→ Meet Derek</span>
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: WHAT YOU GET (STARTER VS GROW) */}
          {/* ========================================================================= */}
          <section id="plans" className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-primary-red uppercase tracking-widest block mb-2">
                SECTION 01 • PLANS &amp; INCLUSIONS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal uppercase tracking-tight">
                CHOOSE THE PLAN THAT FITS YOUR OPERATION
              </h2>
              <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto">
                Book Moar offers two focused plans. Every feature is connected directly to a practical business outcome.
              </p>
            </div>

            {/* Scale Discontinued Notice */}
            <div className="max-w-4xl mx-auto mb-10 p-4 rounded-xl bg-[#0B0B0D] border border-white/10 flex items-start gap-3.5 text-xs text-muted-text">
              <AlertCircle className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white-text uppercase tracking-wider block mb-0.5">
                  CURRENT OFFER UPDATE:
                </span>
                <span>
                  Book Moar now operates with two streamlined tiers: <strong>Starter</strong> and <strong>Grow</strong>. Our previous Scale plan has been discontinued, and we do not offer paid advertising management. Grow is our fullest current plan.
                </span>
              </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
              
              {/* STARTER PLAN */}
              <div className="rounded-2xl bg-card-bg border border-border-color hover:border-white/20 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-xl">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest block mb-1">
                        ESSENTIAL FOUNDATION
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl font-normal text-white-text uppercase tracking-wide">
                        STARTER
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-muted-text uppercase">
                      Core Web System
                    </span>
                  </div>

                  <p className="text-sm text-muted-text leading-relaxed mb-6">
                    Designed for solo contractors and service pros who need a modern, professional web presence to establish credibility and capture inbound job requests.
                  </p>

                  {/* Pricing Box */}
                  <div className="bg-[#101014] border border-white/5 rounded-xl p-5 mb-8">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-bold text-muted-text uppercase tracking-wider">
                        Monthly Subscription
                      </span>
                      <div className="text-right">
                        <span className="font-display text-3xl sm:text-4xl font-bold text-primary-red">
                          $97
                        </span>
                        <span className="text-xs text-muted-text font-semibold uppercase ml-1">
                          /month
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-2 text-xs">
                      <span className="text-muted-text">One-Time Setup Fee (Due Today)</span>
                      <span className="font-bold text-white-text">$199 setup</span>
                    </div>
                    <p className="text-[11px] text-muted-text/80 mt-2 border-t border-white/5 pt-2 italic">
                      Introductory rate for founding clients. Month-to-month, cancel anytime.
                    </p>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-4 mb-8">
                    <p className="text-xs font-bold text-white-text uppercase tracking-widest">
                      What You Get &amp; Why It Matters:
                    </p>
                    <ul className="space-y-4">
                      {starterDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <div>
                            <strong className="text-white-text font-semibold block">
                              {item.title}
                            </strong>
                            <span className="text-xs text-muted-text block leading-relaxed mt-0.5">
                              {item.desc}
                            </span>
                            <span className="text-[11px] text-primary-red/90 font-medium block mt-1">
                              Purpose: {item.practical}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <a
                    href="#lock-pricing"
                    className="w-full py-4 rounded-xl bg-[#101014] hover:bg-[#181820] border border-white/15 hover:border-primary-red text-white-text font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Select Starter Plan
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] text-muted-text uppercase font-semibold text-center block mt-2">
                    Processed securely via Stripe • $199 setup fee due today
                  </span>
                </div>
              </div>

              {/* GROW PLAN (FULLEST PLAN) */}
              <div className="rounded-2xl bg-card-bg border-2 border-primary-red/40 hover:border-primary-red p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-[0_0_35px_rgba(255,37,56,0.15)]">
                {/* Popular Badge */}
                <div className="absolute -top-3.5 right-8 bg-primary-red text-white-text text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg">
                  Fullest Current Plan
                </div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-primary-red uppercase tracking-widest block mb-1">
                        COMPLETE AUTOMATION &amp; SEO
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl font-normal text-white-text uppercase tracking-wide">
                        GROW
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-text leading-relaxed mb-6">
                    Our most comprehensive system for active operators who want automated missed-call recovery, steady Google review generation, and local search visibility.
                  </p>

                  {/* Pricing Box */}
                  <div className="bg-[#101014] border border-primary-red/20 rounded-xl p-5 mb-8">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-bold text-white-text uppercase tracking-wider">
                        Monthly Subscription
                      </span>
                      <div className="text-right">
                        <span className="font-display text-3xl sm:text-4xl font-bold text-white-text">
                          $199
                        </span>
                        <span className="text-xs text-muted-text font-semibold uppercase ml-1">
                          /month
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-2 text-xs">
                      <span className="text-muted-text">One-Time Setup Fee (Due Today)</span>
                      <span className="font-bold text-white-text">$199 setup</span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-4 mb-8">
                    <p className="text-xs font-bold text-white-text uppercase tracking-widest">
                      Everything in Starter, Plus:
                    </p>
                    <ul className="space-y-4">
                      {growDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-primary-red/20 border border-primary-red/40 flex items-center justify-center text-primary-red shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <div>
                            <strong className="text-white-text font-semibold block">
                              {item.title}
                            </strong>
                            <span className="text-xs text-muted-text block leading-relaxed mt-0.5">
                              {item.desc}
                            </span>
                            <span className="text-[11px] text-primary-red font-medium block mt-1">
                              Purpose: {item.practical}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <a
                    href="#lock-pricing"
                    className="w-full py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.35)]"
                  >
                    Select Grow Plan
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] text-muted-text uppercase font-semibold text-center block mt-2">
                    Processed securely via Stripe • $199 setup fee due today
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: HOW SETUP WORKS */}
          {/* ========================================================================= */}
          <section id="how-setup-works" className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-primary-red uppercase tracking-widest block mb-2">
                SECTION 02 • THE ONBOARDING PROCESS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal uppercase tracking-tight">
                HOW SETUP WORKS
              </h2>
              <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto">
                No endless meetings or confusing agency jargon. We follow a simple, four-step path to get your system built and live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {steps.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-card-bg border border-border-color p-6 flex flex-col justify-between hover:border-primary-red/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <span className="font-display text-3xl font-bold text-primary-red">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest border border-white/5 bg-[#101014] px-2.5 py-1 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-normal text-white-text uppercase tracking-wide mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-text leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    {idx === 0 && "Step 1 of 4"}
                    {idx === 1 && "Step 2 of 4 • /onboarding"}
                    {idx === 2 && "Step 3 of 4 • 2-Week Window"}
                    {idx === 3 && "Step 4 of 4 • Live Launch"}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: INTAKE DEADLINE & SETUP TIMELINE */}
          {/* ========================================================================= */}
          <section id="timeline-and-deadline" className="mb-24 sm:mb-32">
            <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#101014] to-[#0B0B0D] border-2 border-primary-red/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-red/15 border border-primary-red/30 text-primary-red flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary-red uppercase tracking-widest block">
                    SECTION 03 • STRICT TIMELINE POLICY
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-white-text uppercase tracking-wide">
                    INTAKE DEADLINE &amp; SETUP TIMELINE
                  </h3>
                </div>
              </div>

              {/* Exact Required Phrasing */}
              <div className="p-6 rounded-xl bg-[#050505] border border-white/10 mb-6">
                <blockquote className="text-base sm:text-lg text-white-text font-medium leading-relaxed italic border-l-4 border-primary-red pl-4">
                  “Complete your five-minute intake form within seven days of payment. If we haven’t received it by then, we’ll cancel onboarding and refund your payment. Your two-week setup timeline begins once we receive your completed intake form and all required materials.”
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-text leading-relaxed">
                <div className="space-y-2 bg-[#0B0B0D] p-4 rounded-xl border border-white/5">
                  <strong className="text-white-text block font-semibold uppercase text-xs tracking-wider">
                    Payment Alone Does Not Start Setup
                  </strong>
                  <p>
                    Paying the initial setup fee secures your spot, but our team cannot write copy, wire up lead routing, or build custom quote forms without your actual business details.
                  </p>
                </div>

                <div className="space-y-2 bg-[#0B0B0D] p-4 rounded-xl border border-white/5">
                  <strong className="text-white-text block font-semibold uppercase text-xs tracking-wider">
                    The 2-Week Clock Starts on Submission
                  </strong>
                  <p>
                    Once your intake form is submitted and we have your logo, service list, and access permissions, our two-week production clock begins immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: WHAT WE NEED FROM YOU */}
          {/* ========================================================================= */}
          <section id="what-we-need" className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-primary-red uppercase tracking-widest block mb-2">
                SECTION 04 • CLIENT REQUIREMENTS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal uppercase tracking-tight">
                WHAT WE NEED FROM YOU
              </h2>
              <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto">
                We handle all the heavy lifting, development, and technical configuration. Here is the concise checklist of items we need from your side:
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-card-bg border border-border-color rounded-2xl p-8 sm:p-10 divide-y divide-white/5 shadow-xl">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 flex items-start gap-4">
                  <div className="w-6 h-6 rounded-lg bg-[#101014] border border-white/10 flex items-center justify-center text-primary-red shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-normal text-white-text uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-text leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 5: SPEED IS A SHARED COMMITMENT */}
          {/* ========================================================================= */}
          <section id="speed-commitment" className="mb-24 sm:mb-32">
            <div className="max-w-4xl mx-auto rounded-2xl bg-[#0B0B0D] border-2 border-primary-red/35 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-red/20 border border-primary-red/40 text-primary-red flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary-red uppercase tracking-widest block">
                    SECTION 05 • MUTUAL ACCOUNTABILITY
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-white-text uppercase tracking-wide">
                    SPEED IS A SHARED COMMITMENT
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-muted-text leading-relaxed">
                <p>
                  <strong className="text-white-text">Book Moar is built for owners who are ready to follow through.</strong> Our technology dispatches lead alerts to your phone instantly and can even text callers back in 30 seconds when you miss a call.
                </p>
                <p>
                  However, an automated text does not close a deal or provide an estimate. When a potential customer responds with questions, needs a diagnostic visit, or asks for pricing, the owner or a designated team member must take over promptly.
                </p>
                <div className="p-4 rounded-xl bg-[#101014] border-l-4 border-primary-red text-white-text text-sm">
                  An automated reply does not replace handling the customer. If responding quickly to new business inquiries is not a priority for your operation right now, this may not be the right fit.
                </div>
                <p className="text-xs text-muted-text">
                  Fast response time is the single highest leverage factor in winning local jobs before your competitor does. We provide the tools, but your follow-through seals the deal.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 6: WHAT TO EXPECT (HONEST EXPECTATIONS) */}
          {/* ========================================================================= */}
          <section id="what-to-expect" className="mb-24 sm:mb-32">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-primary-red uppercase tracking-widest block mb-2">
                SECTION 06 • TRANSPARENT REALITY
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal uppercase tracking-tight">
                WHAT TO EXPECT
              </h2>
              <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto">
                No smoke and mirrors, no fake guarantees. Here is an honest breakdown of what our systems accomplish and what they do not:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {expectations.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-card-bg border border-border-color p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#101014] border border-white/10 flex items-center justify-center text-primary-red mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-display text-xl font-normal text-white-text uppercase tracking-wide mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-text leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 7: GET STARTED & DIRECT CONTACT */}
          {/* ========================================================================= */}
          <section id="get-started" className="mb-12">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#101014] via-[#0B0B0D] to-[#050505] border-2 border-primary-red/40 p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,37,56,0.2)]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-red/10 rounded-full blur-[120px] pointer-events-none" />

              <span className="text-xs font-bold text-primary-red uppercase tracking-widest block mb-3">
                READY TO PARTNER?
              </span>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white-text uppercase tracking-tight leading-none mb-6">
                LOCK IN YOUR SPOT TODAY
              </h2>

              <p className="text-sm sm:text-base text-muted-text max-w-xl mx-auto leading-relaxed mb-10">
                Choose your plan to start. After checkout, you will immediately receive access to our 5-minute intake form at <code className="text-primary-red font-mono">/onboarding</code> to submit your trade details.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href="#lock-pricing"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(255,37,56,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Lock In Pricing &amp; Checkout ($199 Setup)
                </a>

                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#050505] hover:bg-[#101014] border border-white/15 hover:border-white/30 text-white-text font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-primary-red" />
                  Preview Intake Form
                </Link>
              </div>

              {/* Questions / Direct Contact Block */}
              <div className="pt-8 border-t border-white/10 max-w-2xl mx-auto">
                <p className="text-xs font-bold text-muted-text uppercase tracking-widest mb-4">
                  HAVE QUESTIONS BEFORE GETTING STARTED? TALK TO US DIRECTLY:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <a
                    href="tel:9193519505"
                    className="p-3 rounded-xl bg-[#050505] border border-white/5 hover:border-primary-red/50 text-white-text flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary-red" />
                    <span>Call (919) 351-9505</span>
                  </a>

                  <a
                    href="sms:9193519505"
                    className="p-3 rounded-xl bg-[#050505] border border-white/5 hover:border-primary-red/50 text-white-text flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-primary-red" />
                    <span>Text (919) 351-9505</span>
                  </a>

                  <a
                    href="mailto:hello@bookmoar.com"
                    className="p-3 rounded-xl bg-[#050505] border border-white/5 hover:border-primary-red/50 text-white-text flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary-red" />
                    <span>hello@bookmoar.com</span>
                  </a>
                </div>

                <p className="text-[11px] text-muted-text mt-4 flex items-center justify-center gap-2 flex-wrap">
                  <span>Based in North Carolina • Built on the side by Derek.</span>
                  <Link href="/about" className="text-primary-red hover:underline font-semibold inline-flex items-center gap-1">
                    Meet Derek <ArrowRight className="w-3 h-3" />
                  </Link>
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
