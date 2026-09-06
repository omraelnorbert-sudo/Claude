/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Netlify liefert die Seite zusätzlich unter *.netlify.app aus
        // (Produktions-Subdomain und Deploy-Previews). Diese Adressen sollen
        // nicht in den Google-Index — kanonisch ist cosmovisionmaya.org.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.netlify\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

module.exports = nextConfig;
