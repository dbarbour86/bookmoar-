"use client";

import { useState } from "react";
import { IntakeFormData, ServiceItem } from "./types";
import {
  Plus,
  Trash2,
  Calendar,
  Layers,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Sparkles,
  DollarSign,
  Clock,
  Ban,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

interface Step2Props {
  data: IntakeFormData;
  onChange: (fields: Partial<IntakeFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BUFFER_OPTIONS = ["0 mins", "15 mins", "30 mins", "45 mins"];

const BOOKING_PREFERENCES = [
  {
    id: "arrival_window",
    label: "Arrival Window (Recommended)",
    desc: "e.g. 2-hour arrival block (8-10 AM, 1-3 PM)",
  },
  {
    id: "exact_time",
    label: "Exact Time Booking",
    desc: "Customer selects specific start time (e.g. 10:00 AM sharp)",
  },
  {
    id: "in_person_quote",
    label: "In-Person Estimate First",
    desc: "Book a free on-site walkthrough / estimate inspection",
  },
  {
    id: "phone_quote",
    label: "Phone Consultation First",
    desc: "Quick 15-minute diagnostic or phone scoping call",
  },
];

interface TradePresetDef {
  key: string;
  name: string;
  services: ServiceItem[];
}

const TRADE_PRESETS: TradePresetDef[] = [
  {
    key: "detailing",
    name: "Auto Detailing",
    services: [
      { id: "p1", service_name: "Signature Exterior Wash & Gloss Sealant", price_or_deposit: "$99", duration_mins: 60 },
      { id: "p2", service_name: "Full Interior Deep Steam Extraction Detail", price_or_deposit: "$189", duration_mins: 120 },
      { id: "p3", service_name: "Complete In & Out Reset + Ceramic Guard", price_or_deposit: "$279", duration_mins: 180 },
    ],
  },
  {
    key: "pressureWashing",
    name: "Pressure Washing",
    services: [
      { id: "p1", service_name: "Driveway & Sidewalk Surface Wash", price_or_deposit: "$199", duration_mins: 90 },
      { id: "p2", service_name: "Whole-Home Soft Wash Exterior", price_or_deposit: "$349", duration_mins: 150 },
      { id: "p3", service_name: "Deck / Fence Deep Cleaning & Prep", price_or_deposit: "$249", duration_mins: 120 },
    ],
  },
  {
    key: "roofing",
    name: "Roofing",
    services: [
      { id: "p1", service_name: "Roof Inspection & Storm Damage Assessment", price_or_deposit: "Free Estimate ($0)", duration_mins: 45 },
      { id: "p2", service_name: "Emergency Roof Leak Repair & Flashing", price_or_deposit: "$350 - $750", duration_mins: 120 },
      { id: "p3", service_name: "Full Shingle / Metal Roof Replacement", price_or_deposit: "Insurance / Retail Quote", duration_mins: 60 },
    ],
  },
  {
    key: "pestControl",
    name: "Pest Control",
    services: [
      { id: "p1", service_name: "Quarterly Perimeter Defense Treatment", price_or_deposit: "$125 / visit", duration_mins: 45 },
      { id: "p2", service_name: "Termite Inspection & Barrier Treatment", price_or_deposit: "$199", duration_mins: 90 },
      { id: "p3", service_name: "Rodent Exclusion & Attic Inspection", price_or_deposit: "$250", duration_mins: 60 },
    ],
  },
  {
    key: "hvac",
    name: "HVAC",
    services: [
      { id: "p1", service_name: "Heating & AC Diagnostic Inspection", price_or_deposit: "$89 diagnostic fee", duration_mins: 60 },
      { id: "p2", service_name: "21-Point Seasonal Tune-Up & Coil Clean", price_or_deposit: "$129", duration_mins: 75 },
      { id: "p3", service_name: "Complete HVAC System Replacement", price_or_deposit: "Free In-Home Quote", duration_mins: 60 },
    ],
  },
  {
    key: "plumbing",
    name: "Plumbing",
    services: [
      { id: "p1", service_name: "Drain Clearing & Video Camera Inspection", price_or_deposit: "$149", duration_mins: 60 },
      { id: "p2", service_name: "Water Heater Flush & Diagnostic Service", price_or_deposit: "$129", duration_mins: 60 },
      { id: "p3", service_name: "Emergency Pipe Leak Repair / Fixture Replacement", price_or_deposit: "$189+", duration_mins: 90 },
    ],
  },
  {
    key: "electrical",
    name: "Electrical",
    services: [
      { id: "p1", service_name: "Electrical Troubleshooting & Safety Inspection", price_or_deposit: "$99", duration_mins: 60 },
      { id: "p2", service_name: "Panel Upgrade & EV Home Charger Install", price_or_deposit: "$650 - $1,200", duration_mins: 180 },
      { id: "p3", service_name: "Recessed Lighting & Fixture Installation", price_or_deposit: "$150 / fixture", duration_mins: 120 },
    ],
  },
  {
    key: "lawnCare",
    name: "Lawn Care & Landscaping",
    services: [
      { id: "p1", service_name: "Routine Weekly Mow, Edge & Blow", price_or_deposit: "$45 - $65 / visit", duration_mins: 45 },
      { id: "p2", service_name: "Seasonal Property Clean-Up & Fresh Mulch", price_or_deposit: "$295 - $550", duration_mins: 180 },
      { id: "p3", service_name: "Core Aeration, Overseeding & Fertilizer", price_or_deposit: "$199", duration_mins: 90 },
    ],
  },
  {
    key: "generalContracting",
    name: "General Contracting",
    services: [
      { id: "p1", service_name: "On-Site Remodel Consultation & Scope Review", price_or_deposit: "Free Consultation ($0)", duration_mins: 60 },
      { id: "p2", service_name: "Kitchen & Bathroom Renovation Consultation", price_or_deposit: "Free Estimate ($0)", duration_mins: 60 },
      { id: "p3", service_name: "Deck, Patio & Structural Carpentry", price_or_deposit: "Custom Quote", duration_mins: 60 },
    ],
  },
  {
    key: "salonBarbershop",
    name: "Salon/Barbershop",
    services: [
      { id: "p1", service_name: "Signature Haircut, Wash & Beard Sculpt", price_or_deposit: "$45", duration_mins: 45 },
      { id: "p2", service_name: "Full Color, Balayage & Blowout", price_or_deposit: "$150+", duration_mins: 120 },
      { id: "p3", service_name: "Deep Conditioning Scalp Treatment", price_or_deposit: "$65", duration_mins: 45 },
    ],
  },
  {
    key: "custom",
    name: "Custom (Blank)",
    services: [
      { id: "p1", service_name: "", price_or_deposit: "", duration_mins: 60 },
    ],
  },
];

export default function Step2Services({ data, onChange, onNext, onBack }: Step2Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleServiceChange = (index: number, field: keyof ServiceItem, value: any) => {
    const updated = [...data.services];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({ services: updated });
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      service_name: "",
      price_or_deposit: "",
      duration_mins: 60,
    };
    onChange({ services: [...data.services, newService] });
  };

  const handleRemoveService = (index: number) => {
    if (data.services.length <= 1) return;
    const updated = data.services.filter((_, i) => i !== index);
    onChange({ services: updated });
  };

  const applyPreset = (presetKey: string) => {
    const found = TRADE_PRESETS.find((p) => p.key === presetKey);
    if (found) {
      onChange({
        selected_trade: presetKey,
        services: found.services.map((s, idx) => ({
          ...s,
          id: `srv-${Date.now()}-${idx}`,
        })),
      });
    }
  };

  const validateServices = () => {
    return data.services.every(
      (s) => s.service_name.trim().length > 0 && s.price_or_deposit.trim().length > 0
    );
  };

  const errors = {
    services: !validateServices() ? "All service rows must have a valid title and price or description." : null,
    booking_preference: !data.booking_preference ? "Please choose an appointment or estimate preference." : null,
  };

  const isValid = !errors.services && !errors.booking_preference;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ services: true, booking_preference: true });
    if (isValid) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Step Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
          SECTION 02 // YOUR SERVICES
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-display text-3xl sm:text-4xl text-white-text tracking-tight uppercase leading-none">
            YOUR <span className="font-brush text-primary-red text-3xl sm:text-4xl normal-case tracking-wider inline-block">Services</span> &amp; PRICING
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-text bg-[#101014] px-3.5 py-1.5 rounded-full border border-white/5 w-fit">
            <Layers className="w-3.5 h-3.5 text-primary-red" />
            <span>ACTIVE SERVICES:</span>
            <span className="text-white-text font-bold font-mono">
              [{data.services.length} ROWS]
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-text mt-2 leading-relaxed">
          Select your trade preset below to pre-fill typical offerings, or edit and add unlimited custom service rows.
        </p>

        {/* 10-Trade Presets Selector */}
        <div className="mt-4 p-4 sm:p-5 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white-text font-bold">
              <Sparkles className="w-4 h-4 text-primary-red" />
              <span>1-TAP TRADE PRESETS (CLICK TO PREFILL SERVICES):</span>
            </div>
            <span className="text-[10px] text-muted-text font-mono">[10 TRADES + CUSTOM]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {TRADE_PRESETS.map((preset) => {
              const isSelected = data.selected_trade === preset.key;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset.key)}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer truncate border ${
                    isSelected
                      ? "bg-primary-red text-white-text border-primary-red shadow-[0_0_15px_rgba(255,37,56,0.35)]"
                      : "bg-[#101014] border-white/10 text-muted-text hover:border-primary-red hover:text-white-text"
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Services Repeater List (Unlimited Rows) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-muted-text tracking-wider">
            MAIN SERVICES OFFERED ({data.services.length})
          </span>
          <span className="text-[11px] text-muted-text">
            Add as many services as you offer. No limit.
          </span>
        </div>

        {data.services.map((srv, index) => (
          <div
            key={srv.id || index}
            className="p-4 sm:p-5 bg-[#08080A] border border-white/10 rounded-xl space-y-3 relative group transition-all hover:border-white/20"
          >
            {/* Row Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary-red bg-primary-red/10 px-2.5 py-0.5 rounded-full border border-primary-red/30">
                  SERVICE #{index + 1}
                </span>
                <span className="text-xs text-muted-text uppercase tracking-wider font-semibold">
                  BOOKING SLOT
                </span>
              </div>

              {data.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveService(index)}
                  className="px-2.5 py-1 text-muted-text hover:text-primary-red hover:bg-primary-red/10 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove this service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline uppercase">REMOVE</span>
                </button>
              )}
            </div>

            {/* Inputs Grid: Service Name + Price + Duration */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Service Name */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
                  SERVICE NAME <span className="text-primary-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={srv.service_name}
                  onChange={(e) => handleServiceChange(index, "service_name", e.target.value)}
                  placeholder="e.g. Signature Exterior Wash & Gloss Sealant"
                  className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
                />
              </div>

              {/* Price / Description */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-text font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-primary-red" />
                  STARTING PRICE OR DESCRIPTION <span className="text-primary-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={srv.price_or_deposit}
                  onChange={(e) => handleServiceChange(index, "price_or_deposit", e.target.value)}
                  placeholder="e.g. $149 or $89 diagnostic + parts or Free Estimate"
                  className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
                />
              </div>

              {/* Typical Duration */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-text font-bold">
                  <Clock className="w-3.5 h-3.5 text-primary-red" />
                  DURATION
                </label>
                <input
                  type="text"
                  value={srv.duration_mins ? `${srv.duration_mins}m` : ""}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                    handleServiceChange(index, "duration_mins", parsed);
                  }}
                  placeholder="e.g. 60m"
                  className="w-full min-h-[48px] px-3 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Another Service Button (Unlimited) */}
        <button
          type="button"
          onClick={handleAddService}
          className="w-full min-h-[50px] py-3.5 border-2 border-dashed border-white/15 hover:border-primary-red/60 bg-[#050505] hover:bg-primary-red/5 text-white-text hover:text-primary-red rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3] text-primary-red" />
          <span>+ ADD ANOTHER SERVICE</span>
        </button>

        {touched.services && errors.services && (
          <p className="flex items-center gap-1.5 text-xs text-primary-red font-medium pt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.services}
          </p>
        )}
      </div>

      {/* Appointment or Estimate Preferences */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              APPOINTMENT OR ESTIMATE PREFERENCE <span className="text-primary-red">*</span>
            </h3>
          </div>
          <span className="text-xs text-muted-text uppercase font-semibold">BOOKING STYLE</span>
        </div>

        <p className="text-xs text-muted-text">
          How do you want customers to book with you on the site?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOOKING_PREFERENCES.map((pref) => {
            const isSelected = data.booking_preference === pref.label;
            return (
              <button
                key={pref.id}
                type="button"
                onClick={() => onChange({ booking_preference: pref.label })}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[#101014] border-primary-red shadow-[0_0_20px_rgba(255,37,56,0.25)]"
                    : "bg-[#050505] border-white/10 hover:border-white/20 text-muted-text"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-white-text" : "text-white-text/80"}`}>
                    {pref.label}
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-primary-red bg-primary-red" : "border-white/20"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </div>
                <p className="text-xs text-muted-text mt-2 leading-relaxed">
                  {pref.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services They Do NOT Offer */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              SERVICES YOU DO NOT OFFER <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </h3>
          </div>
          <span className="text-[10px] text-muted-text font-mono">[LEAD FILTERING]</span>
        </div>
        <p className="text-xs text-muted-text">
          List any services customers frequently ask for that you do NOT take on. We use this to screen out inquiries and protect your time.
        </p>
        <textarea
          rows={2}
          value={data.excluded_services || ""}
          onChange={(e) => onChange({ excluded_services: e.target.value })}
          placeholder="e.g. No paint correction, no commercial flat roofs, no gas appliance lines, no jobs over 30 miles away..."
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none resize-none"
        />
      </div>

      {/* Special Instructions for Handling Inquiries */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              SPECIAL INSTRUCTIONS FOR HANDLING INQUIRIES <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </h3>
          </div>
          <span className="text-[10px] text-muted-text font-mono">[INQUIRY RULES]</span>
        </div>
        <p className="text-xs text-muted-text">
          Any special questions we should ask or details you need from customers before booking?
        </p>
        <textarea
          rows={2}
          value={data.inquiry_instructions || ""}
          onChange={(e) => onChange({ inquiry_instructions: e.target.value })}
          placeholder="e.g. Always ask for photos of the area, verify water & power hookup on site, gate code needed, dog must be put away..."
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none resize-none"
        />
      </div>

      {/* Buffer Time Configuration */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Clock className="w-4 h-4 text-primary-red" />
          <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
            DRIVE TIME / BUFFER BETWEEN JOBS
          </h3>
        </div>
        <p className="text-xs text-muted-text">
          Automatic buffer added before and after appointments for travel and equipment reload.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {BUFFER_OPTIONS.map((buffer) => {
            const isSelected = data.buffer_time === buffer;
            return (
              <button
                key={buffer}
                type="button"
                onClick={() => onChange({ buffer_time: buffer })}
                className={`min-h-[44px] px-2 py-2 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary-red text-white-text border-primary-red shadow-[0_0_15px_rgba(255,37,56,0.35)]"
                    : "bg-[#050505] border-white/10 text-muted-text hover:text-white-text hover:border-white/20"
                }`}
              >
                {buffer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[50px] px-6 py-3.5 border border-white/10 hover:border-primary-red/50 hover:text-primary-red text-muted-text rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>BACK TO BUSINESS INFORMATION</span>
        </button>

        <button
          type="submit"
          className="min-h-[50px] px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.3)] hover:shadow-[0_0_25px_rgba(255,37,56,0.55)] cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <span>CONTINUE TO WEBSITE &amp; ASSETS</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </form>
  );
}
