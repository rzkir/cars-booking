import React from "react";
import Link from "next/link";
import {
  Facebook,
  Hammer,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Twitter,
  Wrench,
} from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-[70vh] bg-[#1a1a1a] text-white relative overflow-hidden rounded-3xl border border-white/5 px-6 py-10 md:px-10 md:py-14">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,149,0,0.08)_0%,transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,149,0,0.18)_0%,transparent_55%)] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center space-y-10">
        {/* Icon cluster */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-500/10 shadow-[0_0_40px_rgba(255,149,0,0.25)]">
              <Wrench className="h-14 w-14 text-[#FF9500] animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#FF9500] bg-[#1a1a1a]">
              <Hammer className="h-5 w-5 text-[#FF9500]" />
            </div>
          </div>
        </div>

        {/* Heading & description */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9500]">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            Sistem Sedang Diperbarui
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Sedang Dalam <span className="text-[#FF9500]">Pemeliharaan</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg font-medium leading-relaxed text-gray-300">
            Kami sedang melakukan upgrade sistem berkala untuk memberikan
            pengalaman terbaik menggunakan DriveEase. Terima kasih sudah
            bersabar sejenak.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-md space-y-3">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
            <p>Progress Pembaruan</p>
            <p>70%</p>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
            <div className="h-full w-[70%] rounded-full bg-[#FF9500] shadow-[0_0_18px_rgba(255,149,0,0.6)] transition-all" />
          </div>
          <p className="text-xs font-bold text-gray-300">
            Estimasi selesai: 24 Januari 2024, 14:30 WIB
          </p>
        </div>

        {/* Static countdown display */}
        <div className="py-4">
          <div className="inline-grid grid-cols-3 gap-8 text-white">
            {[
              { label: "Jam", value: "05" },
              { label: "Menit", value: "30" },
              { label: "Detik", value: "45" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                  {item.value}
                </div>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF9500]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact options */}
        <div className="grid w-full gap-4 md:grid-cols-3 md:gap-6">
          <a
            href="mailto:support@driveease.id"
            className="group flex flex-col items-center gap-3 rounded-[1.8rem] border border-white/5 bg-white/5 p-6 text-center transition-all hover:-translate-y-1 hover:border-[#FF9500]/40 hover:bg-white/10"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 transition-colors group-hover:bg-[#FF9500]">
              <Mail className="h-5 w-5 text-[#FF9500] group-hover:text-white" />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                Email Support
              </p>
              <p className="text-sm font-black">support@driveease.id</p>
            </div>
          </a>

          <div className="group flex cursor-pointer flex-col items-center gap-3 rounded-[1.8rem] border border-white/5 bg-white/5 p-6 text-center transition-all hover:-translate-y-1 hover:border-[#FF9500]/40 hover:bg-white/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 transition-colors group-hover:bg-[#FF9500]">
              <MessageCircle className="h-5 w-5 text-[#FF9500] group-hover:text-white" />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                Live Chat
              </p>
              <p className="text-sm font-black">Mulai Percakapan</p>
            </div>
          </div>

          <div className="group flex flex-col items-center gap-3 rounded-[1.8rem] border border-white/5 bg-white/5 p-6 text-center transition-all hover:-translate-y-1 hover:border-[#FF9500]/40 hover:bg-white/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 transition-colors group-hover:bg-[#FF9500]">
              <Phone className="h-5 w-5 text-[#FF9500] group-hover:text-white" />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                Hotline 24/7
              </p>
              <p className="text-sm font-black">+62 21 1234 5678</p>
            </div>
          </div>
        </div>

        {/* Notify form (static) */}
        <div className="mx-auto max-w-md pt-4 space-y-3">
          <form className="relative">
            <input
              type="email"
              placeholder="Email Anda untuk notifikasi..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 pr-32 py-4 text-sm font-bold outline-none transition-all placeholder:text-gray-500 focus:border-[#FF9500]"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[#FF9500] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#E68600]"
            >
              Kabari Saya
            </button>
          </form>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            Kami akan mengirimkan email setelah sistem kembali online.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/">
            <span className="inline-block rounded-2xl bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-xl shadow-black/40 transition-transform hover:scale-105">
              Kembali ke Utama
            </span>
          </Link>
          <button
            type="button"
            className="rounded-2xl border border-white/20 bg-transparent px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/5"
          >
            Refresh Halaman
          </button>
        </div>

        {/* Social & meta */}
        <div className="space-y-4 pt-6">
          <div className="flex justify-center gap-5 text-gray-500">
            <a href="#" className="transition-all hover:scale-110 hover:text-[#FF9500]">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="transition-all hover:scale-110 hover:text-[#FF9500]">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="transition-all hover:scale-110 hover:text-[#FF9500]">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="transition-all hover:scale-110 hover:text-[#FF9500]">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
            Terakhir diperbarui: 23 Jan, 10:45 AM • Versi 2.4.1
          </div>
        </div>
      </div>
    </div>
  );
}
