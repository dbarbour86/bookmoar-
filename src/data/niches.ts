export interface Niche {
  slug: string;
  name: string;
  industry: string;
  headline: string;
  subheadline: string;
  price: string;
  period: string;
  image: string;
  bullets: string[];
  testimonials: {
    quote: string;
    author: string;
    company: string;
  };
}

export const niches: Record<string, Niche> = {
  detailing: {
    slug: "detailing",
    name: "Mobile Detailers",
    industry: "Mobile Detailing",
    headline: "GET MORE CARS IN YOUR BAY. MOAR PREMIUM DETAILS.",
    subheadline: "A fully custom website, automated booking engine, and Google Business Profile ranking designed specifically for mobile detailers and shop owners.",
    price: "$199",
    period: "month",
    image: "/images/detailing_lead.png",
    bullets: [
      "Custom detailing website with package selectors",
      "Instant vehicle-size booking forms",
      "Google Maps local SEO optimization",
      "Missed-call automatic text-back saver",
      "Automated Google review requests",
    ],
    testimonials: {
      quote: "Book Moar added 18 ceramic coating bookings in our first month. The automated review solicitor is a game changer.",
      author: "Alex D.",
      company: "Apex Detail Studio",
    },
  },
  roofing: {
    slug: "roofing",
    name: "Roofing Contractors",
    industry: "Roofing",
    headline: "BOOK MOAR ROOFING LEADS. DOMINATE YOUR MARKET.",
    subheadline: "Turn storm traffic and local searches into high-ticket roofing contracts. Fully automated systems that follow up instantly.",
    price: "$299",
    period: "month",
    image: "/images/roofing_lead.png",
    bullets: [
      "Roofing lead-capture landing pages",
      "Instant storm-response review campaigns",
      "Local service area page SEO packs",
      "24/7 automatic text and email nurture",
      "Online quote estimator widget",
    ],
    testimonials: {
      quote: "We used to lose half our leads by not picking up the phone fast enough. Now the text-back handles them instantly.",
      author: "Travis M.",
      company: "Carolina Roof Group",
    },
  },
  landscaping: {
    slug: "landscaping",
    name: "Landscapers",
    industry: "Landscaping",
    headline: "FILL YOUR LAWN CARE ROUTES. BOOK MOAR JOBS.",
    subheadline: "Stop quoting in your head. Put your route estimation, monthly maintenance plans, and quote booking on autopilot.",
    price: "$199",
    period: "month",
    image: "/images/landscaping_lead.png",
    bullets: [
      "Maintenance plan signup and billing forms",
      "Instant quote booking by yard size",
      "Local route area SEO optimization",
      "Automated monthly invoice follow-up",
      "Google reviews automation pack",
    ],
    testimonials: {
      quote: "Our route density doubled. Clients sign up directly online for weekly maintenance, and billing is automatic.",
      author: "David H.",
      company: "Greenworks Landscaping",
    },
  },
  moving: {
    slug: "moving",
    name: "Moving Companies",
    industry: "Moving & Storage",
    headline: "BOOK MOAR TRUCK DAYS. LESS PHONE TAG.",
    subheadline: "Engineered for local and long-distance moving companies. Capture inventory lists, calculate estimates, and lock in bookings 24/7.",
    price: "$249",
    period: "month",
    image: "/images/moving_lead.png",
    bullets: [
      "Online inventory detail estimate forms",
      "Deposit collection system integration",
      "Google Maps local citations setup",
      "Automated follow-up for unsigned quotes",
      "Instant text-back for missed calls",
    ],
    testimonials: {
      quote: "Clients love being able to get a price and put down a deposit without playing phone tag for days.",
      author: "Marcus S.",
      company: "Smooth Moves Co.",
    },
  },
  pdr: {
    slug: "pdr",
    name: "Paintless Dent Repair",
    industry: "Paintless Dent Repair",
    headline: "GET CHOSEN FOR HAIL & DENT REPAIR.",
    subheadline: "The ultimate marketing and booking blueprint for PDR techs. Capture photos of damage, send instant quotes, and rank on Google maps.",
    price: "$199",
    period: "month",
    image: "/images/pdr_lead.png",
    bullets: [
      "Photo upload damage quote portals",
      "Google Business Profile PDR ranking",
      "Automated review collection after repairs",
      "Missed-call auto text-back lead saver",
      "Hail storm alert lead outreach campaigns",
    ],
    testimonials: {
      quote: "Having clients upload dent photos directly to our site saves us hours of manual quoting every week.",
      author: "Bobby C.",
      company: "Precision Dent Techs",
    },
  },
};
