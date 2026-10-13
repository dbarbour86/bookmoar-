export interface ServiceItem {
  id: string;
  service_name: string;
  duration_mins: number;
  price_or_deposit: string;
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
  // Step 1: Business Identity & Alerts
  business_name: string;
  owner_name: string;
  alert_phone: string;
  alert_email: string;
  service_area: string;

  // Step 2: Core Services & Pricing
  services: ServiceItem[];
  operating_hours: string;
  buffer_time: string; // "0 mins" | "15 mins" | "30 mins" | "45 mins"

  // Step 3: Setup Access & Brand Assets
  domain_choice: DomainChoice;
  domain_name: string;
  registrar_access_notes: string;
  gbp_link: string;
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
    alert_email: string;
    service_area: string;
  };
  services_configuration: {
    total_services: number;
    services: Array<{
      service_name: string;
      duration_mins: number;
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
  alert_email: "",
  service_area: "",
  services: INITIAL_SERVICES,
  operating_hours: "Mon-Sat 8:00 AM - 6:00 PM",
  buffer_time: "15 mins",
  domain_choice: "bookmoar_subdomain",
  domain_name: "",
  registrar_access_notes: "",
  gbp_link: "",
  assets: [],
};
