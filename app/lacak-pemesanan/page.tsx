import type { Metadata } from "next";
import Link from "next/link";

import LacakSearchForm from "@/components/lacak-pemesanan/LacakSearchForm";

import {
  Award,
  ChevronDown,
  Clock,
  HelpCircle,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lacak Booking - DriveEase Indonesia",
  description:
    "Pantau status penyewaan armada Anda dengan memasukkan ID Booking atau Nomor Invoice.",
};

export default function Page() {
  return (
    <main className="pt-32 pb-20 min-h-screen bg-white">
      {/* Hero & Search */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF9500] rounded-full text-xs font-black uppercase tracking-widest">
            <Search className="w-4 h-4" />
            <span>Status Real-time</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Lacak <span className="text-[#FF9500]">Booking</span> Anda
          </h1>

          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Pantau status penyewaan armada Anda dengan memasukkan ID Booking
            atau Nomor Invoice di bawah ini.
          </p>
        </div>

        <LacakSearchForm />

        <div className="mt-8 flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <ShieldCheck className="text-[#FF9500] w-4 h-4" />
            <span>Pencarian Aman &amp; Terenkripsi</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Zap className="text-[#FF9500] w-4 h-4" />
            <span>Hasil Instan Real-time</span>
          </div>
        </div>
      </section>

      {/* Recent Searches */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tight">
            Pencarian Terakhir
          </h2>
          <button className="text-xs font-black text-[#FF9500] uppercase tracking-widest hover:underline">
            Hapus Riwayat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/lacak-pemesanan/pending"
            id="recent-track-1"
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex items-center justify-between hover:border-[#FF9500] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                <ShieldCheck className="text-xl text-gray-400 group-hover:text-[#FF9500]" />
              </div>
              <div>
                <p className="font-black text-lg leading-none">#DE-8829410</p>
                <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-wider">
                  Toyota Avanza • 15 Jul
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-orange-100 text-[#FF9500] text-[10px] font-black rounded-lg uppercase tracking-wider">
                Menunggu Bayar
              </span>
            </div>
          </Link>

          <Link
            href="/lacak-pemesanan/done"
            id="recent-track-2"
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex items-center justify-between hover:border-green-500 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                <ShieldCheck className="text-xl text-gray-400 group-hover:text-green-500" />
              </div>
              <div>
                <p className="font-black text-lg leading-none">#INV-772109</p>
                <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-wider">
                  Honda CR-V • 12 Jun
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
                Selesai
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-6 opacity-40">
            <p className="text-sm font-bold text-gray-300">
              Slot Riwayat Kosong
            </p>
          </div>
        </div>
      </section>

      {/* Alternative Tracking Methods */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-black tracking-tight text-center mb-16">
          Metode Pelacakan Lainnya
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-[2.5rem] p-10 text-center space-y-6 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100">
            <div className="w-20 h-20 bg-[#25D366] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-green-100">
              <MessageCircle className="text-3xl w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black">Chat WhatsApp</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Ketik &quot;STATUS [ID BOOKING]&quot; dan kirim ke nomor admin
                kami.
              </p>
            </div>
            <a
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_CS || "6285811668557").replace(/\D/g, "")}`}
              id="alt-track-wa"
              className="inline-block text-[#25D366] font-black text-sm uppercase tracking-widest hover:underline"
            >
              Chat Sekarang
            </a>
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] p-10 text-center space-y-6 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100">
            <div className="w-20 h-20 bg-[#1a1a1a] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-black/10">
              <Phone className="text-3xl w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black">Layanan Telepon</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Hubungi customer service kami untuk bantuan pelacakan manual.
              </p>
            </div>
            <a
              href="tel:6281234567890"
              id="alt-track-phone"
              className="inline-block text-[#1a1a1a] font-black text-sm uppercase tracking-widest hover:underline"
            >
              Hubungi Kami
            </a>
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] p-10 text-center space-y-6 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100">
            <div className="w-20 h-20 bg-[#FF9500] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-orange-100">
              <Mail className="text-3xl w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black">Status via Email</h4>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Cek inbox Anda atau kirim pertanyaan ke tim support kami.
              </p>
            </div>
            <a
              href="mailto:halo@driveease.id"
              id="alt-track-email"
              className="inline-block text-[#FF9500] font-black text-sm uppercase tracking-widest hover:underline"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-black tracking-tight mb-12 flex items-center gap-4">
          <HelpCircle className="text-[#FF9500] w-7 h-7" />
          FAQ Pelacakan
        </h2>

        <div className="space-y-4">
          <div className="group bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-[#FF9500] transition-all">
            <div className="flex justify-between items-center">
              <h5 className="font-black text-lg">
                Dimana saya bisa menemukan ID Booking?
              </h5>
              <ChevronDown className="text-gray-400 transition-transform group-hover:rotate-180 w-5 h-5" />
            </div>
            <p className="mt-4 text-gray-500 font-medium leading-relaxed hidden group-hover:block">
              ID Booking dikirimkan secara otomatis melalui email dan WhatsApp
              sesaat setelah Anda mengajukan penyewaan.
            </p>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-[#FF9500] transition-all">
            <div className="flex justify-between items-center">
              <h5 className="font-black text-lg">
                Berapa lama status booking diperbarui?
              </h5>
              <ChevronDown className="text-gray-400 transition-transform group-hover:rotate-180 w-5 h-5" />
            </div>
            <p className="mt-4 text-gray-500 font-medium leading-relaxed hidden group-hover:block">
              Sistem kami memperbarui status secara real-time setiap kali ada
              perubahan dari admin atau sistem pembayaran.
            </p>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-[#FF9500] transition-all">
            <div className="flex justify-between items-center">
              <h5 className="font-black text-lg">
                ID Booking saya tidak ditemukan, apa yang harus dilakukan?
              </h5>
              <ChevronDown className="text-gray-400 transition-transform group-hover:rotate-180 w-5 h-5" />
            </div>
            <p className="mt-4 text-gray-500 font-medium leading-relaxed hidden group-hover:block">
              Pastikan Anda memasukkan kode dengan benar (termasuk tanda
              hubung). Jika masih tidak ditemukan, hubungi WhatsApp admin kami.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-[#1a1a1a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#FF9500]/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-12">
            <h3 className="text-3xl font-black text-white">
              Keamanan &amp; Kepercayaan
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <ShieldCheck className="text-4xl text-[#FF9500] w-10 h-10 mx-auto" />
                <p className="text-white font-bold">SSL Secure</p>
                <p className="text-xs text-gray-500">Data Terenkripsi</p>
              </div>

              <div className="space-y-3">
                <Lock className="text-4xl text-[#FF9500] w-10 h-10 mx-auto" />
                <p className="text-white font-bold">Private Access</p>
                <p className="text-xs text-gray-500">Hanya Anda yang Tahu</p>
              </div>

              <div className="space-y-3">
                <Clock className="text-4xl text-[#FF9500] w-10 h-10 mx-auto" />
                <p className="text-white font-bold">24/7 Monitoring</p>
                <p className="text-xs text-gray-500">Status Terupdate</p>
              </div>

              <div className="space-y-3">
                <Award className="text-4xl text-[#FF9500] w-10 h-10 mx-auto" />
                <p className="text-white font-bold">Official App</p>
                <p className="text-xs text-gray-500">Layanan Terpercaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
