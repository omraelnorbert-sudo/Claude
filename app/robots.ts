import type { MetadataRoute } from "next";

const siteUrl = "https://cosmovisionmaya.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
