import type { MetadataRoute } from "next";
import { NAHUALES, slugForIndex } from "@/lib/nahual";

const siteUrl = "https://cosmovisionmaya.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1, frequency: "weekly" as const },
    { path: "/horoskop", priority: 0.9, frequency: "monthly" as const },
    { path: "/nahuales", priority: 0.8, frequency: "monthly" as const },
    { path: "/nahuales/videos", priority: 0.6, frequency: "monthly" as const },
    { path: "/nahuales/bruecken-zur-moderne", priority: 0.5, frequency: "monthly" as const },
    { path: "/paz-mundo", priority: 0.6, frequency: "monthly" as const },
  ].map(({ path, priority, frequency }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: frequency,
    priority,
  }));

  const nahualRoutes = NAHUALES.map((_, position) => ({
    url: `${siteUrl}/nahuales/${slugForIndex(position + 1)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...nahualRoutes];
}
