import type { Metadata } from "next";
import OnboardingApp from "@/components/onboarding/OnboardingApp";

export const metadata: Metadata = {
  title: "Client Onboarding Intake | Book Moar",
  description:
    "Fast-track client onboarding intake system. Provision your SMS dispatch channels, core service menu, and fast-launch domain.",
};

export default function OnboardingPage() {
  return <OnboardingApp />;
}
