import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.bookmoar.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/",
        "/static/",
        "/api/",
        "/stats-preview/",
        "/hero-preview/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
