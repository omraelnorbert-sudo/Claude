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
          <Link href="/">Home</Link>

          <details className="nav-dropdown">
            <summary>Nahuales</summary>
            <div className="nav-dropdown-panel">
              <Link href="/nahuales">Übersicht</Link>
              <Link href="/nahuales/bruecken-zur-moderne">Brücken zur Moderne</Link>
              <Link href="/nahuales/videos">Videos YouTube</Link>
            </div>
          </details>

          <Link href="/paz-mundo">Paz Mundo</Link>

          <Link href="/horoskop" className="nav-cta">
            Geburtshoroskop
          </Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </>
  );
}
