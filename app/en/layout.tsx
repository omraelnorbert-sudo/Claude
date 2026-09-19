import Link from "next/link";

/** English public site shell: header with navigation, centered content. */
export default function SiteLayoutEn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site-header" lang="en">
        <strong>Cosmovision Maya</strong>
        <nav>
          <Link href="/en">Home</Link>

          <details className="nav-dropdown">
            <summary>Nahuales</summary>
            <div className="nav-dropdown-panel">
              <Link href="/en/nahuales">Overview</Link>
              <Link href="/en/nahuales/bruecken-zur-moderne">Bridges to modern life</Link>
              <Link href="/en/nahuales/videos">YouTube videos</Link>
            </div>
          </details>

          <details className="nav-dropdown">
            <summary>Paz Mundo</summary>
            <div className="nav-dropdown-panel">
              <Link href="/en/paz-mundo">Overview</Link>
              <Link href="/en#si">MAYA Soul Coaching</Link>
            </div>
          </details>

          <Link href="/en/horoskop" className="nav-cta">
            Birth horoscope
          </Link>

          <Link href="/" className="lang-switch" title="Auf Deutsch">
            <span aria-hidden="true">🇦🇹</span> DE
          </Link>
          <Link href="/es" className="lang-switch" title="En español">
            <span aria-hidden="true">🇬🇹</span> ES
          </Link>
          <span className="lang-switch-current">
            <span aria-hidden="true">🇬🇧</span> EN
          </span>
        </nav>
      </header>
      <main className="site-main" lang="en">{children}</main>
      <footer className="site-footer" lang="en">
        <p>
          Interpretation and naming can vary between MAYA traditions. A digital
          reading does not replace the personal interpretation of a wise
          horoscope reader.
        </p>
        <p>
          <strong>Paz Mundo</strong> has, for 30 years, taken on the task of
          connecting MAYA tradition and modern life in this change of era.
        </p>
      </footer>
    </>
  );
}
