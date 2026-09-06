import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isDevBypassActive } from "@/lib/dev-bypass";

/**
 * Hält die Supabase-Session frisch (Tokens laufen sonst ab) und schickt
 * nicht eingeloggte Besucher von /admin zur Anmeldung.
 *
 * Die eigentliche Admin-Prüfung passiert im Layout und über die
 * RLS-Policies in der Datenbank — hier geht es nur darum, gar nicht erst
 * ohne Session ins Dashboard zu laufen.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Ohne Konfiguration übernimmt die Seite selbst den Hinweis an den Admin.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Lokale Abkürzung: ohne Anmeldung direkt ins Dashboard. Greift nur im
  // Entwicklungsmodus und nur mit ausdrücklich gesetzter Variable — siehe
  // lib/dev-bypass.ts.
  if (
    !user &&
    !isDevBypassActive() &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Nur die Bereiche, die überhaupt eine Session brauchen. Vorher lief die
  // Middleware auf allen Seiten — damit hing vor jedem öffentlichen Aufruf
  // ein Supabase-Roundtrip, obwohl keine öffentliche Seite eine Anmeldung
  // kennt.
  matcher: ["/admin/:path*", "/login", "/auth/:path*"],
};
