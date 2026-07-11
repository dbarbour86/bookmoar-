import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsRow from "@/components/MetricsRow";
import Services from "@/components/Services";
import System from "@/components/System";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main content elements */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero area and Phone dashboard */}
        <Hero />

        {/* Hero metrics numbers */}
        <MetricsRow />

        {/* Section 2: Services grids and Feature Browser mockup */}
        <Services />

        {/* Section 3: The Connected System details */}
        <System />

        {/* Section 4: Vertical step-based process flow */}
        <Process />

        {/* Section 5: Radial red glow CTA */}
        <FinalCTA />
      </main>

      {/* Section 6: Full 4-column footer info */}
      <Footer />
    </>
  );
}
