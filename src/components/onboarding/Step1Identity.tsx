"use client";

import { useState } from "react";
import { IntakeFormData } from "./types";
import {
  MessageSquare,
  Mail,
  Building2,
  User,
  MapPin,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Phone,
  Clock,
} from "lucide-react";

interface Step1Props {
  data: IntakeFormData;
  onChange: (fields: Partial<IntakeFormData>) => void;
  onNext: () => void;
}

export default function Step1Identity({ data, onChange, onNext }: Step1Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (
    field: "alert_phone" | "verification_phone" | "public_phone",
    val: string
  ) => {
    const formatted = formatPhone(val);
    onChange({ [field]: formatted });
  };

  const copyAlertToVerification = () => {
    if (data.alert_phone) {
      onChange({ verification_phone: data.alert_phone });
    }
  };

  const copyPublicToAlert = () => {
    if (data.public_phone) {
      onChange({ alert_phone: data.public_phone });
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isPhoneValid = (phone: string) => {
    const digits = (phone || "").replace(/\D/g, "");
    return digits.length >= 10;
  };

  const errors = {
    business_name: !data.business_name.trim() ? "Business name is required." : null,
    owner_name: !data.owner_name.trim() ? "Owner contact name is required." : null,
    business_address: !data.business_address?.trim() ? "Business address is required." : null,
    public_phone: !isPhoneValid(data.public_phone) ? "Valid 10-digit public phone number required." : null,
    alert_phone: !isPhoneValid(data.alert_phone) ? "Valid 10-digit mobile number required for text alerts." : null,
    verification_phone: !isPhoneValid(data.verification_phone)
      ? "Valid 10-digit phone number required for business verification."
      : null,
    alert_email: !isEmailValid(data.alert_email) ? "Valid email address required." : null,
    service_area: !data.service_area.trim() ? "Cities or ZIP codes served is required." : null,
    business_hours: !data.business_hours?.trim() ? "Business hours are required." : null,
  };

  const isValid = !Object.values(errors).some(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      business_name: true,
      owner_name: true,
      business_address: true,
      public_phone: true,
      alert_phone: true,
      verification_phone: true,
      alert_email: true,
      service_area: true,
      business_hours: true,
    });
    if (isValid) {
      onNext();
    }
  };

  const handlePresetArea = (preset: string) => {
    const current = data.service_area.trim();
    if (!current) {
      onChange({ service_area: preset });
    } else if (!current.includes(preset)) {
      onChange({ service_area: `${current} (${preset})` });
    }
  };

  const handlePresetHours = (preset: string) => {
    onChange({ business_hours: preset, operating_hours: preset });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Step Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
          SECTION 01 // BUSINESS INFORMATION
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white-text tracking-tight uppercase leading-none">
          BUSINESS <span className="font-brush text-primary-red text-3xl sm:text-4xl normal-case tracking-wider inline-block">Information</span>
        </h2>
        <p className="text-sm text-muted-text mt-2 leading-relaxed">
          Tell us about your business so we can set up your booking calendar, automated lead alerts, and customer contact routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Business Name */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <Building2 className="w-3.5 h-3.5 text-primary-red" />
              BUSINESS NAME <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={data.business_name}
            onChange={(e) => onChange({ business_name: e.target.value })}
            onBlur={() => markTouched("business_name")}
            placeholder="e.g. Apex Mobile Detailing & Coatings"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.business_name && errors.business_name
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          {touched.business_name && errors.business_name && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.business_name}
            </p>
          )}
        </div>

        {/* Owner / Contact Name */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <User className="w-3.5 h-3.5 text-primary-red" />
              PRIMARY OWNER / MANAGER <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={data.owner_name}
            onChange={(e) => onChange({ owner_name: e.target.value })}
            onBlur={() => markTouched("owner_name")}
            placeholder="e.g. Marcus Vance"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.owner_name && errors.owner_name
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          {touched.owner_name && errors.owner_name && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.owner_name}
            </p>
          )}
        </div>

        {/* Business Address */}
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <MapPin className="w-3.5 h-3.5 text-primary-red" />
              BUSINESS ADDRESS <span className="text-primary-red">*</span>
            </span>
            <span className="text-[10px] text-muted-text font-mono">[STREET, CITY, STATE, ZIP]</span>
          </label>
          <input
            type="text"
            required
            value={data.business_address || ""}
            onChange={(e) => onChange({ business_address: e.target.value })}
            onBlur={() => markTouched("business_address")}
            placeholder="e.g. 104 Main Street, Suite B, Raleigh, NC 27601 (or main dispatch base)"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.business_address && errors.business_address
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <p className="text-xs text-muted-text">
            Used for Google Profile verification, footer contact info, and travel origin.
          </p>
          {touched.business_address && errors.business_address && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.business_address}
            </p>
          )}
        </div>

        {/* Public Business Phone Number */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <Phone className="w-3.5 h-3.5 text-primary-red" />
              PUBLIC BUSINESS PHONE NUMBER <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="tel"
            required
            value={data.public_phone || ""}
            onChange={(e) => handlePhoneChange("public_phone", e.target.value)}
            onBlur={() => markTouched("public_phone")}
            placeholder="(919) 555-0100"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm font-mono placeholder:text-white/20 outline-none transition-all ${
              touched.public_phone && errors.public_phone
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <p className="text-xs text-muted-text">
            The customer-facing number displayed on your site and Google Profile.
          </p>
          {touched.public_phone && errors.public_phone && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.public_phone}
            </p>
          )}
        </div>

        {/* Where should we text new lead alerts? */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white-text">
              <MessageSquare className="w-3.5 h-3.5 text-primary-red" />
              WHERE SHOULD WE TEXT NEW LEAD ALERTS? <span className="text-primary-red">*</span>
            </label>
            {data.public_phone && (
              <button
                type="button"
                onClick={copyPublicToAlert}
                className="text-[10px] text-primary-red hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Same as public phone
              </button>
            )}
          </div>
          <input
            type="tel"
            required
            value={data.alert_phone}
            onChange={(e) => handlePhoneChange("alert_phone", e.target.value)}
            onBlur={() => markTouched("alert_phone")}
            placeholder="(919) 555-0199"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm font-mono placeholder:text-white/20 outline-none transition-all ${
              touched.alert_phone && errors.alert_phone
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <p className="text-xs text-muted-text">
            Your private mobile number where booking alerts and lead texts arrive instantly.
          </p>
          {touched.alert_phone && errors.alert_phone && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.alert_phone}
            </p>
          )}
        </div>

        {/* Phone number used for business verification */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white-text">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-red" />
              PHONE NUMBER USED FOR BUSINESS VERIFICATION <span className="text-primary-red">*</span>
            </label>
            {data.alert_phone && (
              <button
                type="button"
                onClick={copyAlertToVerification}
                className="text-[10px] text-primary-red hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Same as lead alert phone
              </button>
            )}
          </div>
          <input
            type="tel"
            required
            value={data.verification_phone}
            onChange={(e) => handlePhoneChange("verification_phone", e.target.value)}
            onBlur={() => markTouched("verification_phone")}
            placeholder="(919) 555-0199"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm font-mono placeholder:text-white/20 outline-none transition-all ${
              touched.verification_phone && errors.verification_phone
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <p className="text-xs text-muted-text font-medium text-white/70">
            We start carrier verification on day one — double-check this number.
          </p>
          {touched.verification_phone && errors.verification_phone && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.verification_phone}
            </p>
          )}
        </div>

        {/* Alert Email */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <Mail className="w-3.5 h-3.5 text-primary-red" />
              NOTIFICATION EMAIL ADDRESS <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="email"
            required
            value={data.alert_email}
            onChange={(e) => onChange({ alert_email: e.target.value })}
            onBlur={() => markTouched("alert_email")}
            placeholder="marcus@apexmobiledetail.com"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.alert_email && errors.alert_email
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <p className="text-xs text-muted-text">
            Full customer intake records and booking confirmations mirror here.
          </p>
          {touched.alert_email && errors.alert_email && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.alert_email}
            </p>
          )}
        </div>

        {/* Business Hours (Required) */}
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <Clock className="w-3.5 h-3.5 text-primary-red" />
              BUSINESS HOURS <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={data.business_hours || ""}
            onChange={(e) => {
              onChange({ business_hours: e.target.value, operating_hours: e.target.value });
            }}
            onBlur={() => markTouched("business_hours")}
            placeholder="e.g. Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 3:00 PM (Closed Sun)"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.business_hours && errors.business_hours
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-muted-text text-xs uppercase font-semibold">PRESETS:</span>
            {[
              "Mon-Fri 8:00 AM - 5:00 PM",
              "Mon-Sat 8:00 AM - 6:00 PM",
              "Mon-Sat 7:00 AM - 7:00 PM",
              "7 Days 8:00 AM - 6:00 PM",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetHours(preset)}
                className="px-3 py-1.5 bg-[#101014] border border-white/10 hover:border-primary-red hover:text-white-text text-muted-text text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
          {touched.business_hours && errors.business_hours && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.business_hours}
            </p>
          )}
        </div>

        {/* Service Area: cities or ZIP codes served (required) */}
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <MapPin className="w-3.5 h-3.5 text-primary-red" />
              SERVICE AREA (CITIES OR ZIP CODES SERVED) <span className="text-primary-red">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={data.service_area}
            onChange={(e) => onChange({ service_area: e.target.value })}
            onBlur={() => markTouched("service_area")}
            placeholder="e.g. Raleigh, Cary, Apex, Wake Forest (27597, 27601, 27502) or 25-mile radius"
            className={`w-full min-h-[48px] px-4 py-3 bg-[#050505] border rounded-xl text-white-text text-sm placeholder:text-white/20 outline-none transition-all ${
              touched.service_area && errors.service_area
                ? "border-primary-red focus:ring-1 focus:ring-primary-red"
                : "border-white/10 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40"
            }`}
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-muted-text text-xs uppercase font-semibold">PRESETS:</span>
            {[
              "+ 15-mile radius",
              "+ 25-mile radius",
              "+ 50-mile radius",
              "Shop Location Only",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetArea(preset)}
                className="px-3 py-1.5 bg-[#101014] border border-white/10 hover:border-primary-red hover:text-white-text text-muted-text text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                + {preset}
              </button>
            ))}
          </div>
          {touched.service_area && errors.service_area && (
            <p className="flex items-center gap-1 text-xs text-primary-red font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.service_area}
            </p>
          )}
        </div>

        {/* What type of jobs do you want more of? (Optional) */}
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-text">
            <span className="flex items-center gap-1.5 text-white-text">
              <Sparkles className="w-3.5 h-3.5 text-primary-red" />
              WHAT TYPE OF JOBS DO YOU WANT MORE OF? <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </span>
          </label>
          <input
            type="text"
            value={data.ideal_job}
            onChange={(e) => onChange({ ideal_job: e.target.value })}
            placeholder="e.g. Full interior extraction + 3-year ceramic coating on full-size trucks ($450+)"
            className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none transition-all"
          />
          <p className="text-xs text-muted-text">
            Helps our ad copy and booking recommendations highlight your highest-profit work.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-text">
          <span className="w-2 h-2 rounded-full bg-primary-red" />
          <span>Step 01 auto-saves to your browser</span>
        </div>

        <button
          type="submit"
          className="min-h-[50px] px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,37,56,0.3)] hover:shadow-[0_0_25px_rgba(255,37,56,0.55)] cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <span>CONTINUE TO YOUR SERVICES</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </form>
  );
}
