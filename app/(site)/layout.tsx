import Link from "next/link";

/** Hülle der öffentlichen Website: Kopfzeile mit Navigation, zentrierter Inhalt. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site-header">
        <strong>Cosmovision Maya</strong>
        <nav>
          <Link href="/">Start</Link>
          <Link href="/rituale">Rituale</Link>
          <Link href="/workouts">Workouts</Link>
          <Link href="/horoskop">Horoskop</Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </>
  );
}
