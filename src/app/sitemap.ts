import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bookmoar.com";
  const lastModified = new Date();

  // Static routes
  const routes = [
    "",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.5,
  }));

  // Dynamic niche routes
  const niches = ["detailing", "roofing", "landscaping", "moving", "pdr"];
  const nicheRoutes = niches.map((niche) => ({
    url: `${baseUrl}/${niche}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...nicheRoutes];
}
