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

const siteUrl = "https://cosmovisionmaya.org";
const title = "Cosmovision Maya";
const description =
  "Berechne dein Maya-Horoskop kostenlos: Geburtsnahual, Schwingungszahl und das Maya-Kreuz nach dem heiligen Tzolk'in-Kalender. Entdecke die Kosmovision der Maya und alle 20 Nahuales.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${title}` },
  description,
  keywords: [
    "Maya Horoskop",
    "Nahual berechnen",
    "Tzolkin",
    "Maya Kalender",
    "Geburtsnahual",
    "Maya Kosmovision",
    "Maya Kreuz",
    "Paz Mundo",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: title,
    title,
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
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
