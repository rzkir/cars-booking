import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { API_CONFIG } from "@/hooks/config";

const publicPaths = [
  "/signin",
  "/signup",
  "/daftar-mobil",
  "/daftar-mobil/:slug",
  "/tentang-kami",
  "/kontak",
  "/lacak-pemesanan",
  "/antar-jemput-bandara",
  "/perjalanan-dinas",
  "/sewa-dengan-supir",
  "/sewa-lepas-kunci",
  "/syarat-dan-ketentuan",
  "/kebijakan-privasi",
];

const adminPaths = ["/dashboard"];

/** Nama cookie session dari backend (be: session_token, httpOnly) */
const SESSION_COOKIE_NAME = "session_token";

// Ambil status login & role dengan memanggil backend /api/auth/session
async function getAuthFromSessionCookie(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  userRole: string | null;
}> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return { isAuthenticated: false, userRole: null };
  }

  try {
    const apiUrl = API_CONFIG.ENDPOINTS.session;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        // Teruskan semua cookie dari request user ke backend
        cookie: request.headers.get("cookie") ?? "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { isAuthenticated: false, userRole: null };
    }

    const data = (await res.json()) as {
      account?: { role?: string | null } | null;
      user?: { role?: string | null } | null;
    };

    const rawRole = data.account?.role ?? data.user?.role ?? null;
    if (!rawRole) {
      return { isAuthenticated: true, userRole: null };
    }

    const userRole =
      typeof rawRole === "string" && rawRole.toLowerCase() === "admin"
        ? "admin"
        : "customer";

    return { isAuthenticated: true, userRole };
  } catch {
    // Kalau parsing / fetch gagal, anggap sudah login tapi role tidak diketahui
    return { isAuthenticated: true, userRole: null };
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Allow public access to sitemap.xml and robots.txt
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  if (method !== "GET") {
    return NextResponse.next();
  }

  const isPublicPath =
    pathname === "/" || publicPaths.some((path) => pathname.startsWith(path));

  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  const { isAuthenticated, userRole } = await getAuthFromSessionCookie(request);

  // Also check for query parameter from client-side redirect
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  if (
    redirectParam &&
    (redirectParam === "/dashboard" || redirectParam === "/")
  ) {
    return NextResponse.redirect(new URL(redirectParam, request.url));
  }

  // Authenticated on home: semua role (admin & customer) boleh tetap di /
  if (isAuthenticated && pathname === "/") {
    return NextResponse.next();
  }

  if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
    const fromLogout = request.nextUrl.searchParams.get("logout");
    if (fromLogout) {
      return NextResponse.next();
    }
    // Admin → /dashboard, customer → /
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/daftar-mobil/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/lacak-pemesanan/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/") || pathname.match(/^\/[a-f0-9]{24}$/)) {
    return NextResponse.next();
  }

  const isExplicitlyPublicContent =
    pathname.startsWith("/daftar-mobil/") ||
    pathname.startsWith("/admin/") ||
    pathname.match(/^\/[a-f0-9]{24}$/);

  if (!isPublicPath && !isAuthenticated && !isExplicitlyPublicContent) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAdminPath) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // Customer akses /dashboard → redirect ke /
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico).*)"],
};
