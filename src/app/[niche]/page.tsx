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

  return <NichePageClient nicheData={nicheData} />;
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
