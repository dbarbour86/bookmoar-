"use client";

import { useState, useRef } from "react";
import { IntakeFormData, UploadedAsset } from "./types";
import {
  Globe,
  UploadCloud,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Send,
  Sparkles,
  CheckSquare,
  Square,
  KeyRound,
  Share2,
  CalendarCheck,
  FileText,
} from "lucide-react";

interface Step3Props {
  data: IntakeFormData;
  onChange: (fields: Partial<IntakeFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function Step3SetupAssets({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
}: Step3Props) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate suggested subdomain slug from business name
  const suggestedSlug = (data.business_name || "yourbiz")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    Array.from(files).forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        alert(`File "${file.name}" is not an accepted image type (PNG, JPG, SVG, WebP).`);
        return;
      }
      if (file.size > maxSizeBytes) {
        alert(`File "${file.name}" exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const newAsset: UploadedAsset = {
          id: `ast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl: dataUrl,
          dataUrl: dataUrl,
        };
        onChange({ assets: [...data.assets, newAsset] });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveAsset = (id: string) => {
    onChange({ assets: data.assets.filter((a) => a.id !== id) });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.domain_choice === "own_domain" && !data.domain_name.trim()) {
      alert("Please provide your domain name, or choose the fast-launch subdomain option.");
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Step Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary-red/30 bg-primary-red/10 text-primary-red text-xs font-bold tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red animate-pulse" />
          SECTION 03 // WEBSITE, LOGO &amp; PHOTOS
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white-text tracking-tight uppercase leading-none">
          WEBSITE, <span className="font-brush text-primary-red text-3xl sm:text-4xl normal-case tracking-wider inline-block">Logo</span> &amp; PHOTOS
        </h2>
        <p className="text-sm text-muted-text mt-2 leading-relaxed">
          Connect your Google Business Profile, upload your logo and photos, and let us know your online setup.
        </p>
      </div>

      {/* Online Profiles: Website, GBP & Social Links */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              CURRENT ONLINE PROFILES (WEBSITE &amp; SOCIAL)
            </h3>
          </div>
          <span className="text-[10px] text-muted-text font-mono">[DIGITAL PRESENCE]</span>
        </div>

        <div className="space-y-4">
          {/* Current Website URL */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
              CURRENT WEBSITE URL <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </label>
            <input
              type="text"
              value={data.existing_website_url || ""}
              onChange={(e) => onChange({ existing_website_url: e.target.value })}
              placeholder="e.g. https://www.apexmobiledetailing.com (leave blank if starting fresh)"
              className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
            />
          </div>

          {/* Google Business Profile URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-text block">
              GOOGLE BUSINESS PROFILE (GBP) LINK <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </label>
            <input
              type="url"
              value={data.gbp_link}
              onChange={(e) => onChange({ gbp_link: e.target.value })}
              placeholder="https://g.page/r/your-google-profile/review or Google Maps URL"
              className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
            />
            <p className="text-xs text-muted-text">
              We connect your review automations directly to this link so happy customers leave 5-star reviews on Google.
            </p>

            {/* Checkbox: "I've sent an admin access invite" */}
            <div
              onClick={() => onChange({ gbp_admin_invite_sent: !data.gbp_admin_invite_sent })}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none mt-2 ${
                data.gbp_admin_invite_sent
                  ? "bg-[#101014] border-primary-red/60 text-white-text"
                  : "bg-[#050505] border-white/10 text-muted-text hover:border-white/20"
              }`}
            >
              <div className="mt-0.5 text-primary-red">
                {data.gbp_admin_invite_sent ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4 text-white/40" />
                )}
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-white-text block">
                  I&apos;ve sent an admin access invite
                </span>
                <span className="text-[11px] text-muted-text block">
                  Optional: Invite <strong className="text-white-text">hello@bookmoar.com</strong> as Manager on your Google Business Profile so we can wire automated review requests.
                </span>
              </div>
            </div>
          </div>

          {/* Facebook / Social Media Links */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-text font-bold">
              <Share2 className="w-3.5 h-3.5 text-primary-red" />
              FACEBOOK / SOCIAL MEDIA LINKS <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </label>
            <input
              type="text"
              value={data.social_links || ""}
              onChange={(e) => onChange({ social_links: e.target.value })}
              placeholder="e.g. facebook.com/apexdetailing, instagram.com/apexdetailing"
              className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
            />
            <p className="text-xs text-muted-text">
              We link your social profiles in the site header and footer for extra local credibility.
            </p>
          </div>
        </div>
      </div>

      {/* Existing Booking Software (If Any) */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              EXISTING BOOKING SOFTWARE <span className="text-muted-text font-normal">(IF ANY)</span>
            </h3>
          </div>
          <span className="text-[10px] text-muted-text font-mono">[CALENDAR SYNC]</span>
        </div>
        <p className="text-xs text-muted-text">
          Do you currently use software like Housecall Pro, Jobber, Square, Calendly, or Google Calendar?
        </p>
        <input
          type="text"
          value={data.existing_booking_software || ""}
          onChange={(e) => onChange({ existing_booking_software: e.target.value })}
          placeholder="e.g. Housecall Pro, Jobber, Square, Google Calendar, or None"
          className="w-full min-h-[48px] px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
        />
      </div>

      {/* Domain Launch Module */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              WEBSITE DOMAIN PREFERENCE <span className="text-primary-red">*</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Fast launch subdomain */}
          <button
            type="button"
            onClick={() => onChange({ domain_choice: "bookmoar_subdomain" })}
            className={`text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative ${
              data.domain_choice === "bookmoar_subdomain"
                ? "bg-[#101014] border-primary-red shadow-[0_0_20px_rgba(255,37,56,0.25)]"
                : "bg-[#050505] border-white/10 text-muted-text hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white-text uppercase tracking-wider">
                OPTION A: FAST-LAUNCH BOOK MOAR LINK
              </span>
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  data.domain_choice === "bookmoar_subdomain"
                    ? "border-primary-red bg-primary-red"
                    : "border-white/20"
                }`}
              >
                {data.domain_choice === "bookmoar_subdomain" && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
            </div>
            <p className="text-xs text-muted-text mt-2.5 leading-relaxed">
              Launch immediately with zero domain setup required on your end. We host it directly on high-speed servers.
            </p>
            <div className="mt-3.5 p-2.5 bg-[#050505] border border-white/5 rounded-lg text-xs font-mono text-primary-red flex items-center gap-1.5">
              <span className="text-muted-text text-[10px] uppercase">PREVIEW:</span>
              <span className="font-bold underline">{suggestedSlug || "yourbiz"}.bookmoar.com</span>
            </div>
          </button>

          {/* Option B: Own Domain */}
          <button
            type="button"
            onClick={() => onChange({ domain_choice: "own_domain" })}
            className={`text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative ${
              data.domain_choice === "own_domain"
                ? "bg-[#101014] border-primary-red shadow-[0_0_20px_rgba(255,37,56,0.25)]"
                : "bg-[#050505] border-white/10 text-muted-text hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white-text uppercase tracking-wider">
                OPTION B: YOUR CUSTOM DOMAIN
              </span>
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  data.domain_choice === "own_domain"
                    ? "border-primary-red bg-primary-red"
                    : "border-white/20"
                }`}
              >
                {data.domain_choice === "own_domain" && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
            </div>
            <p className="text-xs text-muted-text mt-2.5 leading-relaxed">
              Use your existing or purchased domain (e.g. yourbusiness.com). We will provide simple DNS instructions or assist directly.
            </p>
            <div className="mt-3.5 p-2.5 bg-[#050505] border border-white/5 rounded-lg text-xs text-muted-text flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-primary-red shrink-0" />
              <span>We handle DNS pointing assistance</span>
            </div>
          </button>
        </div>

        {data.domain_choice === "own_domain" && (
          <div className="p-4 bg-[#050505] border border-white/10 rounded-xl space-y-3 mt-3">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
                CUSTOM DOMAIN NAME <span className="text-primary-red">*</span>
              </label>
              <input
                type="text"
                required
                value={data.domain_name}
                onChange={(e) => onChange({ domain_name: e.target.value })}
                placeholder="e.g. apexmobiledetailing.com"
                className="w-full min-h-[48px] px-4 py-3 bg-[#0B0B0D] border border-white/10 rounded-xl text-white-text text-sm font-mono focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-muted-text font-bold block">
                DOMAIN REGISTRAR / HOSTING ACCESS (OPTIONAL)
              </label>
              <input
                type="text"
                value={data.hosting_cms_logins || data.registrar_access_notes || ""}
                onChange={(e) => onChange({ hosting_cms_logins: e.target.value, registrar_access_notes: e.target.value })}
                placeholder="e.g. Registered on GoDaddy; will delegate access or send DNS records"
                className="w-full min-h-[48px] px-4 py-3 bg-[#0B0B0D] border border-white/10 rounded-xl text-white-text text-sm focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Asset Upload & Fallback Notice */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              LOGO &amp; BUSINESS PHOTOS <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </h3>
          </div>
          <span className="text-xs text-muted-text">
            [{data.assets.length} UPLOADED]
          </span>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`p-6 sm:p-8 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
            dragActive
              ? "border-primary-red bg-primary-red/10"
              : "border-white/15 hover:border-primary-red/60 bg-[#050505]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="w-12 h-12 rounded-full bg-[#101014] border border-white/10 flex items-center justify-center text-primary-red">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white-text uppercase tracking-wider">
              DRAG &amp; DROP LOGO OR WORK PHOTOS HERE
            </div>
            <p className="text-xs text-muted-text">
              or <span className="text-primary-red underline">browse files on your device</span> (PNG, JPG, SVG up to 10MB)
            </p>
          </div>
        </div>

        {/* Fallback Notice Banner */}
        <div className="p-4 bg-[#101014] border border-white/5 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
          <div className="text-xs text-muted-text leading-relaxed">
            <span className="font-bold text-white-text uppercase">NO PHOTOS READY? ZERO PROBLEM: </span>
            If you do not have photos ready, leave blank and our clean trade industry templates will deploy immediately. You can upload or replace assets anytime after launch.
          </div>
        </div>

        {/* Uploaded Assets List */}
        {data.assets.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs text-muted-text uppercase tracking-wider block font-bold">
              STAGED ASSETS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.assets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3 bg-[#050505] border border-white/10 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {asset.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.previewUrl}
                        alt={asset.name}
                        className="w-9 h-9 object-cover rounded-lg border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-[#101014] rounded-lg flex items-center justify-center text-muted-text border border-white/10">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-white-text truncate font-semibold">{asset.name}</p>
                      <p className="text-[10px] text-muted-text">{formatFileSize(asset.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAsset(asset.id)}
                    className="p-1.5 text-muted-text hover:text-primary-red hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    title="Remove asset"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Notes or Special Requests */}
      <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary-red" />
            <h3 className="text-xs uppercase tracking-wider text-white-text font-bold">
              ADDITIONAL NOTES OR SPECIAL REQUESTS <span className="text-muted-text font-normal">(OPTIONAL)</span>
            </h3>
          </div>
        </div>
        <p className="text-xs text-muted-text">
          Anything else we should know when setting up your site, scheduling rules, or message automations?
        </p>
        <textarea
          rows={3}
          value={data.notes_and_requests || ""}
          onChange={(e) => onChange({ notes_and_requests: e.target.value })}
          placeholder="e.g. Please emphasize that we offer weekend emergency calls, or make sure our 10% senior discount is mentioned..."
          className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white-text text-sm font-sans placeholder:text-white/20 focus:border-primary-red focus:ring-1 focus:ring-primary-red/40 outline-none resize-none"
        />
      </div>

      {/* Action Footer */}
      <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="min-h-[50px] px-6 py-3.5 border border-white/10 hover:border-primary-red/50 hover:text-primary-red text-muted-text rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>BACK TO YOUR SERVICES</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[54px] px-8 py-4 rounded-xl bg-primary-red hover:bg-[#e01c2e] text-white-text font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,37,56,0.4)] hover:shadow-[0_0_35px_rgba(255,37,56,0.6)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
          <span>SUBMIT CLIENT ONBOARDING &gt;&gt;&gt;</span>
        </button>
      </div>
    </form>
  );
}
