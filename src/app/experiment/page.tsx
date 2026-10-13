import Header from "@/components/Header";
import HeroRedesign from "@/components/experiment/HeroRedesign";
import ServicesExperiment from "@/components/experiment/ServicesExperiment";
import System from "@/components/System";
import Process from "@/components/Process";
import FAQExperiment from "@/components/experiment/FAQExperiment";
import FinalCTAExperiment from "@/components/experiment/FinalCTAExperiment";
import FoundingOfferBottom from "@/components/FoundingOfferBottom";
import Footer from "@/components/Footer";

export default function ExperimentPage() {
  return (
    <>
      {/* Structured Search Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Book Moar (Experiment Version)",
            "url": "https://www.bookmoar.com/experiment",
            "logo": "https://www.bookmoar.com/icon",
            "description": "Premium website systems, Google Review request automation, local SEO, and missed-call text back setups built to help local service businesses generate more bookings on autopilot.",
            "telephone": "+1-919-351-9505",
            "email": "hello@bookmoar.com"
          })
        }}
      />

      {/* Sticky Navigation Header */}
      <Header />

      {/* Main content elements */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Redesigned Hero with active micro-states & texture depth */}
        <HeroRedesign />

        {/* Section 2: Services grids and Feature Browser mockup */}
        <ServicesExperiment />

        {/* Section 3: The Connected System details */}
        <System />

        {/* Section 4: Vertical step-based process flow */}
        <Process />

        {/* Section 4.5: Categorized FAQ with Filter Tabs */}
        <FAQExperiment />

        {/* Section 5: High-Converting Final CTA */}
        <FinalCTAExperiment />
      </main>

      {/* Section 5.5: Founding Client Offer Large Bottom Callout */}
      <FoundingOfferBottom />

      {/* Section 6: Full 4-column footer info */}
      <Footer />
    </>
  );
}
