import type { MetadataRoute } from "next";
import { companiesWithStories } from "@/content/companies";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/partner`, changeFrequency: "monthly", priority: 0.8 },
    ...companiesWithStories().map((company) => ({
      url: `${site.url}/portfolio/${company.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
