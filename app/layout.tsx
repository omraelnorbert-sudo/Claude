import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmovision Maya",
  description: "Rituale und Workouts aus der Maya-Kosmovision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <header>
          <strong>Cosmovision Maya</strong>
          <nav>
            <Link href="/">Start</Link>
            <Link href="/rituale">Rituale</Link>
            <Link href="/workouts">Workouts</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
