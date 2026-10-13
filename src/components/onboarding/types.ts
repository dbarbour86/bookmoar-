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
  // Step 1: Business Identity, Verification & Alerts
  business_name: string;
  owner_name: string;
  alert_phone: string;
  verification_phone: string; // Required for carrier verification
  alert_email: string;
  service_area: string; // cities or ZIP codes served
  ideal_job: string; // "What does your ideal booked job look like?"

  // Step 2: Core Services & Pricing (Unlimited rows + 10 presets)
  selected_trade: string;
  services: ServiceItem[];
  operating_hours: string; // Business hours (required)
  buffer_time: string; // "0 mins" | "15 mins" | "30 mins" | "45 mins"

  // Step 3: Setup Access & Brand Assets
  domain_choice: DomainChoice;
  domain_name: string;
  registrar_access_notes: string;
  gbp_link: string; // Google Business Profile URL
  gbp_admin_invite_sent: boolean; // "I've sent an admin access invite"
  existing_website_url: string; // Optional
  hosting_cms_logins: string; // Optional
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
    alert_phone: string;
    verification_phone: string;
    alert_email: string;
    service_area: string;
    ideal_job: string;
  };
  services_configuration: {
    selected_trade: string;
    total_services: number;
    services: Array<{
      service_name: string;
      duration_mins?: number;
      price_or_deposit: string;
    }>;
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
  alert_phone: "",
  verification_phone: "",
  alert_email: "",
  service_area: "",
  ideal_job: "",
  selected_trade: "detailing",
  services: INITIAL_SERVICES,
  operating_hours: "Mon-Sat 8:00 AM - 6:00 PM",
  buffer_time: "15 mins",
  domain_choice: "bookmoar_subdomain",
  domain_name: "",
  registrar_access_notes: "",
  gbp_link: "",
  gbp_admin_invite_sent: false,
  existing_website_url: "",
  hosting_cms_logins: "",
  assets: [],
};
