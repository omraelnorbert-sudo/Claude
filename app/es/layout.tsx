import Link from "next/link";

/** Envoltura del sitio público en español: cabecera con navegación, contenido centrado. */
export default function SiteLayoutEs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site-header">
        <strong>Cosmovision Maya</strong>
        <nav>
          <Link href="/es">Inicio</Link>

          <details className="nav-dropdown">
            <summary>Nahuales</summary>
            <div className="nav-dropdown-panel">
              <Link href="/es/nahuales">Vista general</Link>
              <Link href="/es/nahuales/bruecken-zur-moderne">Puentes hacia la modernidad</Link>
              <Link href="/es/nahuales/videos">Videos YouTube</Link>
            </div>
          </details>

          <details className="nav-dropdown">
            <summary>Paz Mundo</summary>
            <div className="nav-dropdown-panel">
              <Link href="/es/paz-mundo">Vista general</Link>
              <Link href="/es#si">Coaching del Alma MAYA SI</Link>
            </div>
          </details>

          <Link href="/es/horoskop" className="nav-cta">
            Horóscopo de nacimiento
          </Link>

          <Link href="/" className="lang-switch" title="Auf Deutsch">
            <span aria-hidden="true">🇦🇹</span> DE
          </Link>
          <span className="lang-switch-current">
            <span aria-hidden="true">🇬🇹</span> ES
          </span>
          <Link href="/en" className="lang-switch" title="In English">
            <span aria-hidden="true">🇬🇧</span> EN
          </Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>
          La interpretación y la denominación pueden variar entre las tradiciones MAYA.
          Una lectura digital no sustituye la interpretación personal de un sabio del
          horóscopo.
        </p>
        <p>
          <strong>Paz Mundo</strong> tiene, desde hace 30 años, la tarea de conectar la
          tradición MAYA y la modernidad en el cambio de era.
        </p>
      </footer>
    </>
  );
}
