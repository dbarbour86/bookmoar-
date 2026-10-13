"use client";

import { useState } from "react";
import { IntakeFormData, ServiceItem } from "./types";
import { Plus, Trash2, Calendar, Layers, ArrowLeft, ArrowRight, AlertCircle, Sparkles, Clock, DollarSign } from "lucide-react";

interface Step2Props {
  data: IntakeFormData;
  onChange: (fields: Partial<IntakeFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BUFFER_OPTIONS = ["0 mins", "15 mins", "30 mins", "45 mins"];

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
      { id: "p1", service_name: "Signature Exterior Wash & Gloss Sealant", price_or_deposit: "$99" },
      { id: "p2", service_name: "Full Interior Deep Steam Extraction Detail", price_or_deposit: "$189" },
      { id: "p3", service_name: "Complete In & Out Reset + Ceramic Guard", price_or_deposit: "$279" },
    ],
  },
  {
    key: "pressureWashing",
    name: "Pressure Washing",
    services: [
      { id: "p1", service_name: "Driveway & Sidewalk Surface Wash", price_or_deposit: "$199" },
      { id: "p2", service_name: "Whole-Home Soft Wash Exterior", price_or_deposit: "$349" },
      { id: "p3", service_name: "Deck / Fence Deep Cleaning & Prep", price_or_deposit: "$249" },
    ],
  },
  {
    key: "roofing",
    name: "Roofing",
    services: [
      { id: "p1", service_name: "Roof Inspection & Storm Damage Assessment", price_or_deposit: "Free Estimate ($0)" },
      { id: "p2", service_name: "Emergency Roof Leak Repair & Flashing", price_or_deposit: "$350 - $750" },
      { id: "p3", service_name: "Full Shingle / Metal Roof Replacement", price_or_deposit: "Insurance / Retail Quote" },
    ],
  },
  {
    key: "pestControl",
    name: "Pest Control",
    services: [
      { id: "p1", service_name: "Quarterly Perimeter Defense Treatment", price_or_deposit: "$125 / visit" },
      { id: "p2", service_name: "Termite Inspection & Barrier Treatment", price_or_deposit: "$199" },
      { id: "p3", service_name: "Rodent Exclusion & Attic Inspection", price_or_deposit: "$250" },
    ],
  },
  {
    key: "hvac",
    name: "HVAC",
    services: [
      { id: "p1", service_name: "Heating & AC Diagnostic Inspection", price_or_deposit: "$89 diagnostic fee" },
      { id: "p2", service_name: "21-Point Seasonal Tune-Up & Coil Clean", price_or_deposit: "$129" },
      { id: "p3", service_name: "Complete HVAC System Replacement", price_or_deposit: "Free In-Home Quote" },
    ],
  },
  {
    key: "plumbing",
    name: "Plumbing",
    services: [
      { id: "p1", service_name: "Drain Clearing & Video Camera Inspection", price_or_deposit: "$149" },
      { id: "p2", service_name: "Water Heater Flush & Diagnostic Service", price_or_deposit: "$129" },
      { id: "p3", service_name: "Emergency Pipe Leak Repair / Fixture Replacement", price_or_deposit: "$189+" },
    ],
  },
  {
    key: "electrical",
    name: "Electrical",
    services: [
      { id: "p1", service_name: "Electrical Troubleshooting & Safety Inspection", price_or_deposit: "$99" },
      { id: "p2", service_name: "Panel Upgrade & EV Home Charger Install", price_or_deposit: "$650 - $1,200" },
      { id: "p3", service_name: "Recessed Lighting & Fixture Installation", price_or_deposit: "$150 / fixture" },
    ],
  },
  {
    key: "lawnCare",
    name: "Lawn Care & Landscaping",
    services: [
      { id: "p1", service_name: "Routine Weekly Mow, Edge & Blow", price_or_deposit: "$45 - $65 / visit" },
      { id: "p2", service_name: "Seasonal Property Clean-Up & Fresh Mulch", price_or_deposit: "$295 - $550" },
      { id: "p3", service_name: "Core Aeration, Overseeding & Fertilizer", price_or_deposit: "$199" },
    ],
  },
  {
    key: "generalContracting",
    name: "General Contracting",
    services: [
      { id: "p1", service_name: "On-Site Remodel Consultation & Scope Review", price_or_deposit: "Free Consultation ($0)" },
      { id: "p2", service_name: "Kitchen & Bathroom Renovation Consultation", price_or_deposit: "Free Estimate ($0)" },
      { id: "p3", service_name: "Deck, Patio & Structural Carpentry", price_or_deposit: "Custom Quote" },
    ],
  },
  {
    key: "salonBarbershop",
    name: "Salon/Barbershop",
    services: [
      { id: "p1", service_name: "Signature Haircut, Wash & Beard Sculpt", price_or_deposit: "$45" },
      { id: "p2", service_name: "Full Color, Balayage & Blowout", price_or_deposit: "$150+" },
      { id: "p3", service_name: "Deep Conditioning Scalp Treatment", price_or_deposit: "$65" },
    ],
  },
  {
    key: "custom",
    name: "Custom (Blank)",
    services: [
      { id: "p1", service_name: "", price_or_deposit: "" },
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
    operating_hours: !data.operating_hours.trim() ? "Business hours are required." : null,
  };

  const isValid = !errors.services && !errors.operating_hours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ services: true, operating_hours: true });
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
          SECTION 02 // SERVICES &amp; PRICING
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-display text-3xl sm:text-4xl text-white-text tracking-tight uppercase leading-none">
            CORE SERVICES &amp; <span className="font-brush text-primary-red text-3xl sm:text-4xl normal-case tracking-wider inline-block">Pricing</span> MENU
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

        {/* 10-Trade Presets Expanded Selector */}
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
            CONFIGURED SERVICES ({data.services.length})
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

            {/* Inputs Grid: Service Name + Price / Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Service Name */}
              <div className="md:col-span-7 space-y-1.5">
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
              <div className="md:col-span-5 space-y-1.5">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-text font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-primary-red" />
                  PRICE OR DESCRIPTION <span className="text-primary-red">*</span>
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

      {/* Business Hours (Required) & Buffer Configuration */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Calendar className="w-4 h-4 text-primary-red" />
          <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
            BUSINESS HOURS &amp; SCHEDULE RULES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Business Hours (Required) */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
              BUSINESS HOURS <span className="text-primary-red">*</span>
            </label>
            <input
              type="text"
              required
              value={data.operating_hours}
              onChange={(e) => onChange({ operating_hours: e.target.value })}
              placeholder="e.g. Mon-Sat 8:00 AM - 6:00 PM"
              className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
            />
            {/* Quick Hours Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Mon-Fri 8am - 5pm", "Mon-Sat 8am - 6pm", "7 Days 7am - 7pm"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange({ operating_hours: preset })}
                  className="px-2.5 py-1 bg-[#101014] border border-white/5 hover:border-primary-red hover:text-white-text text-muted-text text-[11px] uppercase font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
            {touched.operating_hours && errors.operating_hours && (
              <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.operating_hours}
              </p>
            )}
          </div>

          {/* Buffer Time Between Appointments */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
              BUFFER TIME BETWEEN APPOINTMENTS
            </label>
            <p className="text-xs text-muted-text">
              Drive time / vehicle reload time before the next client slot.
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
          <span>BACK TO IDENTITY</span>
        </button>

        <button
          type="submit"
          className="min-h-[50px] px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.3)] hover:shadow-[0_0_25px_rgba(255,37,56,0.55)] cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <span>CONTINUE TO DOMAIN &amp; ACCESS</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </form>
  );
}
