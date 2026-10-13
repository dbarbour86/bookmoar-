"use client";

import { useState } from "react";
import { IntakeFormData, ServiceItem } from "./types";
import { Plus, Trash2, Clock, DollarSign, Calendar, Layers, ArrowLeft, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

interface Step2Props {
  data: IntakeFormData;
  onChange: (fields: Partial<IntakeFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DURATION_OPTIONS = [
  { value: 30, label: "30 mins (Quick service)" },
  { value: 60, label: "60 mins (1 Hour)" },
  { value: 90, label: "90 mins (1.5 Hours)" },
  { value: 120, label: "120 mins (2 Hours)" },
  { value: 180, label: "180 mins (3 Hours)" },
  { value: 240, label: "240 mins (4 Hours / Half-Day)" },
];

const BUFFER_OPTIONS = ["0 mins", "15 mins", "30 mins", "45 mins"];

const TRADE_PRESETS: Record<string, ServiceItem[]> = {
  detailing: [
    { id: "p1", service_name: "Exterior Foam Wash & Gloss Sealant", duration_mins: 60, price_or_deposit: "$99" },
    { id: "p2", service_name: "Full Interior Steam Extraction Detail", duration_mins: 120, price_or_deposit: "$189" },
    { id: "p3", service_name: "Complete In & Out Reset + Ceramic Guard", duration_mins: 180, price_or_deposit: "$279" },
  ],
  pressureWashing: [
    { id: "p1", service_name: "Driveway & Sidewalk Surface Wash", duration_mins: 90, price_or_deposit: "$199" },
    { id: "p2", service_name: "Whole-Home Soft Wash Exterior", duration_mins: 180, price_or_deposit: "$349" },
    { id: "p3", service_name: "Deck / Fence Deep Cleaning & Prep", duration_mins: 120, price_or_deposit: "$249" },
  ],
  serviceTrade: [
    { id: "p1", service_name: "Diagnostic Inspection & Quote", duration_mins: 60, price_or_deposit: "$89 diagnostic fee" },
    { id: "p2", service_name: "Standard Maintenance & Tune-Up", duration_mins: 90, price_or_deposit: "$179" },
    { id: "p3", service_name: "Emergency Dispatch & Priority Service", duration_mins: 120, price_or_deposit: "$100 deposit" },
  ],
};

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
    if (data.services.length >= 5) return;
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      service_name: "",
      duration_mins: 60,
      price_or_deposit: "$150",
    };
    onChange({ services: [...data.services, newService] });
  };

  const handleRemoveService = (index: number) => {
    if (data.services.length <= 1) return;
    const updated = data.services.filter((_, i) => i !== index);
    onChange({ services: updated });
  };

  const applyPreset = (presetKey: string) => {
    const selected = TRADE_PRESETS[presetKey];
    if (selected) {
      onChange({ services: selected });
    }
  };

  const validateServices = () => {
    return data.services.every(
      (s) => s.service_name.trim().length > 0 && s.price_or_deposit.trim().length > 0
    );
  };

  const errors = {
    services: !validateServices() ? "All service rows must have a valid title and pricing." : null,
    operating_hours: !data.operating_hours.trim() ? "Operating hours are required." : null,
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
              [{data.services.length} / 5]
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-text mt-2 leading-relaxed">
          Define up to 5 bookable service items. These auto-generate your calendar booking grid with duration blocks.
        </p>

        {/* Quick Trade Presets */}
        <div className="mt-4 p-4 bg-[#08080A] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white-text font-bold">
            <Sparkles className="w-4 h-4 text-primary-red" />
            <span>1-TAP TRADE PRESETS:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset("detailing")}
              className="px-3 py-1.5 bg-[#101014] border border-white/10 hover:border-primary-red hover:text-white-text text-muted-text text-xs uppercase font-semibold rounded-lg transition-all cursor-pointer"
            >
              Auto Detailing
            </button>
            <button
              type="button"
              onClick={() => applyPreset("pressureWashing")}
              className="px-3 py-1.5 bg-[#101014] border border-white/10 hover:border-primary-red hover:text-white-text text-muted-text text-xs uppercase font-semibold rounded-lg transition-all cursor-pointer"
            >
              Pressure Wash
            </button>
            <button
              type="button"
              onClick={() => applyPreset("serviceTrade")}
              className="px-3 py-1.5 bg-[#101014] border border-white/10 hover:border-primary-red hover:text-white-text text-muted-text text-xs uppercase font-semibold rounded-lg transition-all cursor-pointer"
            >
              Service Trade
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Services Repeater List */}
      <div className="space-y-4">
        {data.services.map((srv, index) => (
          <div
            key={srv.id || index}
            className="p-5 bg-[#08080A] border border-white/10 rounded-xl space-y-4 relative group transition-all hover:border-white/20"
          >
            {/* Row Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
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

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
                  placeholder="e.g. Full Interior Deep Clean"
                  className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
                />
              </div>

              {/* Duration Select */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-text font-bold">
                  <Clock className="w-3 h-3 text-primary-red" />
                  DURATION <span className="text-primary-red">*</span>
                </label>
                <select
                  value={srv.duration_mins}
                  onChange={(e) => handleServiceChange(index, "duration_mins", Number(e.target.value))}
                  className="w-full min-h-[48px] px-3.5 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none cursor-pointer"
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0B0B0D] text-white-text">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price / Deposit */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-text font-bold">
                  <DollarSign className="w-3 h-3 text-primary-red" />
                  PRICE / DEPOSIT <span className="text-primary-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={srv.price_or_deposit}
                  onChange={(e) => handleServiceChange(index, "price_or_deposit", e.target.value)}
                  placeholder="e.g. $189 or $50 deposit"
                  className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-mono placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Service Button */}
        {data.services.length < 5 && (
          <button
            type="button"
            onClick={handleAddService}
            className="w-full min-h-[48px] py-3.5 border-2 border-dashed border-white/15 hover:border-primary-red/60 bg-[#050505] hover:bg-primary-red/5 text-muted-text hover:text-primary-red rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ ADD SERVICE ROW ({data.services.length}/5)</span>
          </button>
        )}

        {touched.services && errors.services && (
          <p className="flex items-center gap-1.5 text-xs text-primary-red font-medium pt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.services}
          </p>
        )}
      </div>

      {/* Operating Hours & Buffer Configuration */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Calendar className="w-4 h-4 text-primary-red" />
          <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
            SCHEDULE &amp; BUFFER RULES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Operating Hours */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
              OPERATING HOURS <span className="text-primary-red">*</span>
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
          </div>

          {/* Buffer Time Segmented Buttons */}
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
          <span>CONTINUE TO DOMAIN &amp; ASSETS</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </form>
  );
}
