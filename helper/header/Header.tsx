"use client";

import { Car, ClipboardList, Home, Info, MessageCircle } from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import Profile from "@/helper/header/Profile";

export default function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path !== "/" ? path.replace(/\/+$/, "") : path;
  const isActive = (href: string) => {
    const current = normalizePath(pathname || "/");
    const target = normalizePath(href);

    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="container mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="DriveEase"
        >
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white">
            <Car className="w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight">
            DriveEase
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-medium text-gray-600">
          <Link
            href="/"
            id="nav-home"
            aria-current={isActive("/") ? "page" : undefined}
            className={[
              "hover:text-[#1a1a1a] transition-colors",
              isActive("/") ? "text-[#ff9500] font-bold" : "",
            ].join(" ")}
          >
            Beranda
          </Link>
          <Link
            href="/daftar-mobil"
            id="nav-cars"
            aria-current={isActive("/daftar-mobil") ? "page" : undefined}
            className={[
              "hover:text-[#1a1a1a] transition-colors",
              isActive("/daftar-mobil") ? "text-[#ff9500] font-bold" : "",
            ].join(" ")}
          >
            Daftar Mobil
          </Link>
          <Link
            href="/tentang-kami"
            id="nav-about"
            aria-current={isActive("/tentang-kami") ? "page" : undefined}
            className={[
              "hover:text-[#1a1a1a] transition-colors",
              isActive("/tentang-kami") ? "text-[#ff9500] font-bold" : "",
            ].join(" ")}
          >
            Tentang Kami
          </Link>
          <Link
            href="/kontak"
            id="nav-contact"
            aria-current={isActive("/kontak") ? "page" : undefined}
            className={[
              "hover:text-[#1a1a1a] transition-colors",
              isActive("/kontak") ? "text-[#ff9500] font-bold" : "",
            ].join(" ")}
          >
            Kontak
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/lacak-pemesanan"
            id="header-lacak-pemesanan"
            aria-current={isActive("/lacak-pemesanan") ? "page" : undefined}
            className={[
              "hidden md:inline-flex rounded-full font-bold text-sm underline",
              isActive("/lacak-pemesanan") ? "text-[#ff9500]" : "text-gray-600",
            ].join(" ")}
          >
            Lacak Pemesanan
          </Link>

          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
          ) : user ? (
            <Profile />
          ) : (
            <Link
              href="/signin"
              id="header-cta-pesan"
              className="bg-[#ff9500] text-white px-4 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-sm transition-transform"
            >
              <span className="hidden sm:inline">Pesan Sekarang</span>
              <span className="sm:hidden">Masuk</span>
            </Link>
          )}
        </div>
      </nav>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/70"
        aria-label="Navigasi utama"
      >
        <div className="mx-auto max-w-screen-sm px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2">
          <div className="grid grid-cols-5 gap-1">
            <Link
              href="/"
              id="nav-mobile-home"
              aria-current={isActive("/") ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold hover:bg-black/5 hover:text-[#1a1a1a]",
                isActive("/")
                  ? "bg-[#ff9500]/10 text-[#ff9500]"
                  : "text-gray-600",
              ].join(" ")}
            >
              <Home className="h-5 w-5" />
              <span className="mt-1">Beranda</span>
            </Link>
            <Link
              href="/tentang-kami"
              id="nav-mobile-about"
              aria-current={isActive("/tentang-kami") ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold hover:bg-black/5 hover:text-[#1a1a1a]",
                isActive("/tentang-kami")
                  ? "bg-[#ff9500]/10 text-[#ff9500]"
                  : "text-gray-600",
              ].join(" ")}
            >
              <Info className="h-5 w-5" />
              <span className="mt-1">Tentang</span>
            </Link>
            <Link
              href="/daftar-mobil"
              id="nav-mobile-cars"
              aria-current={isActive("/daftar-mobil") ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold hover:bg-black/5 hover:text-[#1a1a1a]",
                isActive("/daftar-mobil")
                  ? "bg-[#ff9500]/10 text-[#ff9500]"
                  : "text-gray-600",
              ].join(" ")}
            >
              <Car className="h-5 w-5" />
              <span className="mt-1">Mobil</span>
            </Link>
            <Link
              href="/lacak-pemesanan"
              id="nav-mobile-track"
              aria-current={isActive("/lacak-pemesanan") ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold hover:bg-black/5 hover:text-[#1a1a1a]",
                isActive("/lacak-pemesanan")
                  ? "bg-[#ff9500]/10 text-[#ff9500]"
                  : "text-gray-600",
              ].join(" ")}
            >
              <ClipboardList className="h-5 w-5" />
              <span className="mt-1">Lacak</span>
            </Link>
            <Link
              href="/kontak"
              id="nav-mobile-contact"
              aria-current={isActive("/kontak") ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold hover:bg-black/5 hover:text-[#1a1a1a]",
                isActive("/kontak")
                  ? "bg-[#ff9500]/10 text-[#ff9500]"
                  : "text-gray-600",
              ].join(" ")}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="mt-1">Kontak</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
