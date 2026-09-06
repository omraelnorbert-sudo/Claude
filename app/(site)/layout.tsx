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
          <a
            href="https://www.pazmundo.com/meine-arbeitsweise"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maya
          </a>
          <Link href="/horoskop">Horoskop</Link>

          <details className="nav-dropdown">
            <summary>Nahuales</summary>
            <div className="nav-dropdown-panel">
              <Link href="/nahuales">Übersicht</Link>
              <Link href="/nahuales/bruecken-zur-moderne">Brücken zur Moderne</Link>
              <Link href="/nahuales/videos">Videos YouTube</Link>
            </div>
          </details>

          <a
            href="https://irp.cdn-website.com/3f276016/files/uploaded/Seelencoaching_final.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maya Seelen-Intelligenz SI
          </a>
          <a
            href="https://irp.cdn-website.com/3f276016/files/uploaded/Seelencoaching_final.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maya Seelencoaching
          </a>
          <a
            href="https://www.pazmundo.com/zentrum-paz-mundo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zentrum Paz Mundo
          </a>
          <a
            href="https://www.pazmundo.com/veranstaltungen"
            target="_blank"
            rel="noopener noreferrer"
          >
            Veranstaltungen
          </a>
          <a
            href="https://www.pazmundo.com/b%C3%BCcher"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mayabücher
          </a>
          <a
            href="https://www.pazmundo.com/interviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            Podcastserien
          </a>
          <a
            href="https://www.pazmundo.com/kopie-mayakalender-2017"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mayakalender Paz Mundo 2027 und 28
          </a>
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </>
  );
}
