"use client";

import { Car } from "lucide-react";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import Profile from "@/helper/header/Profile";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white">
            <Car className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight">DriveEase</span>
        </div>

        <div className="hidden md:flex items-center gap-10 font-medium text-gray-600">
          <Link
            href="/"
            id="nav-home"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/daftar-mobil"
            id="nav-cars"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Daftar Mobil
          </Link>
          <Link
            href="/tentang"
            id="nav-about"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Tentang
          </Link>
          <Link
            href="/kontak"
            id="nav-contact"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Kontak
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/tracking-pemesanan"
            id="header-tracking"
            className="rounded-full font-bold text-sm text-gray-600 underline"
          >
            Tracking Pemesanan
          </Link>

          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
          ) : user ? (
            <Profile />
          ) : (
            <Link
              href="/signin"
              id="header-cta-booking"
              className="bg-[#ff9500] text-white px-6 py-3 rounded-full font-bold text-sm transition-transform"
            >
              Booking Sekarang
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
