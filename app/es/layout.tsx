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

          <span className="lang-switch-current">ES</span>
          <Link href="/" className="lang-switch" title="Auf Deutsch">
            DE
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
