import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = parts[1];
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = atob(paddedPayload);
    return JSON.parse(decodedPayload);
  } catch {
    throw new Error("Invalid token");
  }
}

const publicPaths = [
  "/signin",
  "/signup",
  "/verification",
  "/change-password",
  "/forget-password",
  "/reset-password",
  "/daftar-mobil",
  "/daftar-mobil/:slug",
  "/tentang",
  "/kontak",
];

const adminPaths = ["/dashboard"];

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname.startsWith("/api/") || pathname === "/api") {
    return NextResponse.next();
  }

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

  let userRole: string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = decodeJWT(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        throw new Error("Token expired");
      }

      userRole = decoded.role as string;
      isAuthenticated = true;
    } catch {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // Redirect authenticated users away from auth pages
  // Also check for query parameter from client-side redirect
  const redirectParam = request.nextUrl.searchParams.get("redirect");
  if (
    redirectParam &&
    (redirectParam === "/dashboard" || redirectParam === "/")
  ) {
    return NextResponse.redirect(new URL(redirectParam, request.url));
  }

  if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
    const fromLogout = request.nextUrl.searchParams.get("logout");

    // Allow access if explicitly logging out
    if (fromLogout) {
      return NextResponse.next();
    }

    // Redirect based on role
    if (userRole === "admins") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/daftar-mobil/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admins/") || pathname.match(/^\/[a-f0-9]{24}$/)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/license-agreement") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/refund-policy") ||
    pathname.startsWith("/terms-of-service")
  ) {
    return NextResponse.next();
  }

  const isExplicitlyPublicContent =
    pathname.startsWith("/daftar-mobil/") ||
    pathname.startsWith("/admins/") ||
    pathname.match(/^\/[a-f0-9]{24}$/);

  if (!isPublicPath && !isAuthenticated && !isExplicitlyPublicContent) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAdminPath) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (userRole !== "admins") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico).*)"],
};
