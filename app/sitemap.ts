import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hakiapi-docs.hakiapi.workers.dev";

  // The core static pages of your site
  return [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${baseUrl}/architecture`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/roadmap`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/examples`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
