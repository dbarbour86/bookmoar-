import type { Metadata } from "next";
import ThankYouView from "@/components/onboarding/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You | Book Moar Client Onboarding",
  description:
    "Thank you for trusting Book Moar. Your client onboarding intake is confirmed and provisioning is underway.",
};

export default function ThankYouPage() {
  return <ThankYouView />;
}
