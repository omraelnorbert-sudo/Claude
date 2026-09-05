"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Item = { href: string; label: string; icon: React.ReactNode };
type Group = { label: string; items: Item[] };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <g {...stroke}>{children}</g>
    </svg>
  );
}

const GROUPS: Group[] = [
  {
    label: "Überblick",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: (
          <Icon>
            <rect x="2" y="2" width="5" height="5" />
            <rect x="9" y="2" width="5" height="5" />
            <rect x="2" y="9" width="5" height="5" />
            <rect x="9" y="9" width="5" height="5" />
          </Icon>
        ),
      },
    ],
  },
  {
    label: "Inhalte",
    items: [
      {
        href: "/admin/texte",
        label: "Texte",
        icon: (
          <Icon>
            <path d="M3 2h10v12H3z" />
            <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
          </Icon>
        ),
      },
      {
        href: "/admin/videos",
        label: "Videos",
        icon: (
          <Icon>
            <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
            <path d="M6.5 6.5l3.5 2-3.5 2z" />
          </Icon>
        ),
      },
      {
        href: "/admin/links",
        label: "Links",
        icon: (
          <Icon>
            <path d="M6.5 9.5l3-3" />
            <path d="M7 5.5l.8-.8a2.5 2.5 0 0 1 3.5 3.5l-.8.8" />
            <path d="M9 10.5l-.8.8a2.5 2.5 0 0 1-3.5-3.5l.8-.8" />
          </Icon>
        ),
      },
    ],
  },
  {
    label: "Menschen",
    items: [
      {
        href: "/admin/nutzer",
        label: "Nutzer",
        icon: (
          <Icon>
            <circle cx="8" cy="5.5" r="2.5" />
            <path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" />
          </Icon>
        ),
      },
    ],
  },
  {
    label: "Versand",
    items: [
      {
        href: "/admin/versand",
        label: "Einstellungen",
        icon: (
          <Icon>
            <path d="M2 4h12v8H2z" />
            <path d="M2 4.5l6 4.5 6-4.5" />
          </Icon>
        ),
      },
      {
        href: "/admin/protokoll",
        label: "Protokoll",
        icon: (
          <Icon>
            <circle cx="8" cy="8" r="5.5" />
            <path d="M8 4.5V8l2.5 1.5" />
          </Icon>
        ),
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        href: "/admin/logik",
        label: "Logik & Status",
        icon: (
          <Icon>
            <circle cx="8" cy="8" r="1.8" />
            <path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6l1.4 1.4M11 11l1.4 1.4M12.4 3.6L11 5M5 11l-1.4 1.4" />
          </Icon>
        ),
      },
    ],
  },
];

export default function Sidebar({
  email,
  viaDevBypass = false,
}: {
  email: string | null;
  viaDevBypass?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="admin-sidebar" data-open={open ? "true" : "false"}>
      <div className="admin-mobile-bar">
        <span className="admin-brand-name">Paz Mundo · Admin</span>
        <button
          type="button"
          className="admin-menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Schliessen" : "Menü"}
        </button>
      </div>

      <Link href="/admin" className="admin-brand">
        <span className="admin-brand-name">Paz Mundo</span>
        <span className="admin-brand-sub">Dashboard</span>
      </Link>

      <nav className="admin-nav">
        {GROUPS.map((group) => (
          <div className="admin-nav-group" key={group.label}>
            <span className="admin-nav-label">{group.label}</span>
            {group.items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-user">
        {email && <span className="admin-user-mail">{email}</span>}
        {viaDevBypass ? (
          <>
            <span className="admin-user-hint">
              Nicht angemeldet — lokale Abkürzung
            </span>
            <Link href="/login?next=/admin" className="admin-signout">
              Richtig anmelden
            </Link>
          </>
        ) : (
          <form action="/auth/signout" method="post">
            <button type="submit" className="admin-signout">
              Abmelden
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
