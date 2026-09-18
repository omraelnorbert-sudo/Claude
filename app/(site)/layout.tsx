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

          <details className="nav-dropdown">
            <summary>Paz Mundo</summary>
            <div className="nav-dropdown-panel">
              <Link href="/paz-mundo">Übersicht</Link>
              <Link href="/#si">Maya Seelencoaching SI</Link>
            </div>
          </details>

          <Link href="/horoskop" className="nav-cta">
            Geburtshoroskop
          </Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>
          Auslegung und Benennung können zwischen den Maya-Traditionen variieren.
          Eine digitale Einsicht ersetzt keine persönliche Auslegung eines
          Horoskopweisen.
        </p>
        <p>
          <strong>Paz Mundo</strong> hat seit 30 Jahren die Aufgabe, Tradition Maya
          und Moderne miteinander im Zeitenwandel zu vernetzen.
        </p>
      </footer>
    </>
  );
}
