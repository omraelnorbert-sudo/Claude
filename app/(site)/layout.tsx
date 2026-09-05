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
          <Link href="/horoskop">Horoskop</Link>
          <Link href="/nahuales">Nahuales</Link>
          <Link href="/links">Links</Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
    </>
  );
}
