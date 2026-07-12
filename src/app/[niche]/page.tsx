import { notFound } from "next/navigation";
import { niches } from "@/data/niches";
import NichePageClient from "@/components/NichePageClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const nicheData = niches[niche];
  if (!nicheData) return {};

  return {
    title: `Book Moar ${nicheData.name} | More Bookings. Less Guesswork.`,
    description: nicheData.subheadline,
    openGraph: {
      title: `Book Moar ${nicheData.name} | More Bookings. Less Guesswork.`,
      description: nicheData.subheadline,
      images: [
        {
          url: nicheData.image,
          width: 800,
          height: 450,
          alt: nicheData.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { niche } = await params;
  const nicheData = niches[niche];

  if (!nicheData) {
    notFound();
  }

  return (
    <>
      {/* Product Onboarding Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Book Moar ${nicheData.name} Lead Booking System`,
            "image": `https://www.bookmoar.com${nicheData.image}`,
            "description": nicheData.subheadline,
            "offers": {
              "@type": "Offer",
              "price": nicheData.price.replace(/[^0-9]/g, ""), // extract digits e.g. 299
              "priceCurrency": "USD",
              "url": `https://www.bookmoar.com/${niche}`,
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock"
            },
            "brand": {
              "@type": "Brand",
              "name": "Book Moar"
            }
          })
        }}
      />
      <NichePageClient nicheData={nicheData} />
    </>
  );
}

// Prerender niches during build time for maximum page loading speed
export async function generateStaticParams() {
  return [
    { niche: "detailing" },
    { niche: "roofing" },
    { niche: "landscaping" },
    { niche: "moving" },
    { niche: "pdr" },
  ];
}
