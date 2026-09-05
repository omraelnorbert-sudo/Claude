import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Cosmovision Maya",
  description: "Horoskop und die 20 Nahuales der Maya-Kosmovision",
};

/**
 * Nur Grundgerüst. Die sichtbare Hülle kommt aus den jeweiligen Layouts:
 * `(site)` für die öffentliche Website, `admin` für das Dashboard.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${cormorant.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
