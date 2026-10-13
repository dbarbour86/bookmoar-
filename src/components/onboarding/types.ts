export interface ServiceItem {
  id: string;
  service_name: string;
  duration_mins?: number;
  price_or_deposit: string; // Price or description e.g. "$150" or "Diagnostic fee + parts"
}

export interface UploadedAsset {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  dataUrl?: string;
}

export type DomainChoice = "own_domain" | "bookmoar_subdomain";

export interface IntakeFormData {
  // Step 1: Business Information
  business_name: string;
  owner_name: string;
  business_address: string; // Business address (physical or shop base)
  public_phone: string; // Public business phone number (for customer calls)
  alert_phone: string; // "Where should we text new lead alerts?"
  verification_phone: string; // "Phone number used for business verification"
  alert_email: string;
  service_area: string; // cities or ZIP codes served
  business_hours: string; // Business hours
  ideal_job: string; // "What type of jobs do you want more of?" (optional)

  // Step 2: Your Services
  selected_trade: string;
  services: ServiceItem[];
  excluded_services: string; // Services they do NOT offer
  booking_preference: string; // Appointment or estimate preferences
  inquiry_instructions: string; // Special instructions for handling inquiries
  operating_hours: string; // Business hours (synced with business_hours)
  buffer_time: string; // "0 mins" | "15 mins" | "30 mins" | "45 mins"

  // Step 3: Website, Logo & Photos
  existing_website_url: string; // Current website URL
  gbp_link: string; // Google Business Profile link
  gbp_admin_invite_sent: boolean; // "I've sent an admin access invite"
  social_links: string; // Facebook / social media links
  existing_booking_software: string; // Existing booking software (if any)
  notes_and_requests: string; // Additional notes or special requests
  domain_choice: DomainChoice;
  domain_name: string;
  registrar_access_notes: string;
  hosting_cms_logins: string;
  assets: UploadedAsset[];
}

export interface IntakeSubmissionPayload {
  intake_id: string;
  timestamp: string;
  system_version: string;
  source: string;
  business_identity: {
    business_name: string;
    owner_name: string;
    business_address: string;
    public_phone: string;
    alert_phone: string;
    verification_phone: string;
    alert_email: string;
    service_area: string;
    business_hours: string;
    ideal_job?: string;
  };
  services_configuration: {
    selected_trade: string;
    total_services: number;
    services: Array<{
      service_name: string;
      duration_mins?: number;
      price_or_deposit: string;
    }>;
    excluded_services: string;
    booking_preference: string;
    inquiry_instructions: string;
    operating_hours: string;
    buffer_time: string;
  };
  setup_and_assets: {
    domain_choice: DomainChoice;
    domain_name: string;
    registrar_access_notes: string;
    gbp_link: string;
    gbp_admin_invite_sent: boolean;
    existing_website_url: string;
    social_links: string;
    existing_booking_software: string;
    notes_and_requests: string;
    hosting_cms_logins: string;
    asset_count: number;
    assets: Array<{
      name: string;
      size: number;
      type: string;
      dataUrl?: string;
    }>;
    used_template_fallback: boolean;
  };
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    service_name: "Signature Exterior Wash & Clay",
    duration_mins: 90,
    price_or_deposit: "$149",
  },
  {
    id: "srv-2",
    service_name: "Full Interior Deep Steam Detail",
    duration_mins: 120,
    price_or_deposit: "$199",
  },
  {
    id: "srv-3",
    service_name: "Complete Ceramic Maintenance Package",
    duration_mins: 180,
    price_or_deposit: "$299",
  },
];

export const INITIAL_INTAKE_DATA: IntakeFormData = {
  business_name: "",
  owner_name: "",
  business_address: "",
  public_phone: "",
  alert_phone: "",
  verification_phone: "",
  alert_email: "",
  service_area: "",
  business_hours: "Mon-Sat 8:00 AM - 6:00 PM",
  ideal_job: "",
  selected_trade: "detailing",
  services: INITIAL_SERVICES,
  excluded_services: "",
  booking_preference: "Arrival window (e.g. 2-hr window)",
  inquiry_instructions: "",
  operating_hours: "Mon-Sat 8:00 AM - 6:00 PM",
  buffer_time: "15 mins",
  domain_choice: "bookmoar_subdomain",
  domain_name: "",
  registrar_access_notes: "",
  gbp_link: "",
  gbp_admin_invite_sent: false,
  existing_website_url: "",
  social_links: "",
  existing_booking_software: "",
  notes_and_requests: "",
  hosting_cms_logins: "",
  assets: [],
};
