import type { Metadata } from "next";
import HeroPreviewClient from "./HeroPreviewClient";

export const metadata: Metadata = {
  title: "Hero Animation Comparison Preview | Book Moar",
  description:
    "Preview and compare the original Book Moar hero mockup against the new 3-scene inquiry-to-lead storyboard animation.",
};

export default function HeroPreviewPage() {
  return <HeroPreviewClient />;
}
