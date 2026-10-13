import type { Metadata } from "next";
import OnboardingApp from "@/components/onboarding/OnboardingApp";

export const metadata: Metadata = {
  title: "Client Intake Form | Book Moar",
  description:
    "Fast-track client intake system. Provision your SMS dispatch channels, core service menu, and fast-launch domain.",
};

export default function IntakePage() {
  return <OnboardingApp />;
}
