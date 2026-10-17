import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import System from "@/components/System";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FoundingOfferBottom from "@/components/FoundingOfferBottom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Structured Search Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Book Moar",
            "url": "https://www.bookmoar.com",
            "logo": "https://www.bookmoar.com/icon",
            "image": "https://www.bookmoar.com/icon",
            "description": "Premium website systems, Google Review request automation, local SEO, and missed-call text back setups built to help local service businesses generate more bookings on autopilot.",
            "telephone": "+1-919-351-9505",
            "email": "hello@bookmoar.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Raleigh",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "35.7796",
              "longitude": "-78.6382"
            },
            "areaServed": [
              {
                "@type": "State",
                "name": "North Carolina"
              },
              {
                "@type": "Country",
                "name": "United States"
              }
            ],
            "priceRange": "$$"
          })
        }}
      />

      {/* Sticky Navigation Header */}
      <Header />

      {/* Main content elements */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero area and Phone dashboard */}
        <Hero />

        {/* 
          =============================================================================
          HOMEPAGE STATISTICS STRIP (Temporarily removed until verified stats are ready)
          -----------------------------------------------------------------------------
          Preserved for future display when verified client statistics are confirmed.
          To restore this section:
            1. Import MetricsRow from "@/components/MetricsRow";
            2. Pass verified metrics into:
                 <MetricsRow
                   metrics={[
                     { number: "XX+", label: "VERIFIED STAT 1" },
                     { number: "YY+", label: "VERIFIED STAT 2" },
                     { number: "ZZ/7", label: "VERIFIED STAT 3" },
                     { number: "5★", label: "CLIENT EXPERIENCE" },
                   ]}
                 />
               right here between <Hero /> and <Services />.
            3. Preview the design anytime locally at /stats-preview.
          =============================================================================
        */}

        {/* Section 2: Services grids and Feature Browser mockup */}
        <Services />

        {/* Section 3: The Connected System details */}
        <System />

        {/* Section 4: Vertical step-based process flow */}
        <Process />

        {/* Section 4.5: Frequently Asked Questions */}
        <FAQ />

        {/* Section 5: Radial red glow CTA */}
        <FinalCTA />
      </main>

      {/* Section 5.5: Founding Client Offer Large Bottom Callout */}
      <FoundingOfferBottom />

      {/* Section 6: Full 4-column footer info */}
      <Footer />
    </>
  );
}
