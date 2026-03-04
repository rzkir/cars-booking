import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
  AlertCircle,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Download,
  Mail,
  MessageCircle,
  Printer,
  ShieldCheck,
  User,
} from "lucide-react";

import data from "@/helper/data/data.json";

export const metadata: Metadata = {
  title: "Invoice & Status Booking - DriveEase Indonesia",
  description:
    "Lihat detail invoice dan status terbaru pemesanan sewa mobil Anda di DriveEase.",
};

type PageProps = {
  params: {
    status: string;
  };
};

export default function Page({ params }: PageProps) {
  const meta = data.tracking_statuses.find(
    (item) => item.status === params.status,
  );

  const isPending = params.status === "pending";
  const isConfirmed = params.status === "confirmed";
  const isOngoing = params.status === "ongoing";
  const isCancelled = params.status === "cancelled";

  const headerBg = isPending
    ? "bg-yellow-50 border-yellow-100"
    : isConfirmed
      ? "bg-blue-50 border-blue-100"
      : isOngoing
        ? "bg-sky-50 border-sky-100"
        : isCancelled
          ? "bg-red-50 border-red-100"
          : "bg-green-50 border-green-100";

  const pillBg = isPending
    ? "bg-yellow-500"
    : isConfirmed
      ? "bg-blue-500"
      : isOngoing
        ? "bg-sky-500"
        : isCancelled
          ? "bg-red-500"
          : "bg-green-500";

  const pillText = isPending
    ? "text-yellow-700"
    : isConfirmed
      ? "text-blue-700"
      : isOngoing
        ? "text-sky-700"
        : isCancelled
          ? "text-red-700"
          : "text-green-700";

  const StatusIcon =
    isPending || isOngoing ? Clock : isCancelled ? AlertCircle : CheckCircle2;

  const resolvedMeta =
    meta ??
    ({
      status: params.status,
      title: isPending
        ? "Menunggu Pembayaran"
        : isConfirmed
          ? "Booking Terkonfirmasi"
          : isOngoing
            ? "Perjalanan Berlangsung"
            : isCancelled
              ? "Booking Dibatalkan"
              : "Sewa Selesai",
      message: isPending
        ? "Pesanan Anda sudah kami terima, silakan selesaikan pembayaran sebelum batas waktu yang ditentukan."
        : isConfirmed
          ? "Pembayaran Anda telah kami terima dan booking sedang dijadwalkan oleh tim kami."
          : isOngoing
            ? "Unit sedang digunakan sesuai jadwal sewa. Nikmati perjalanan Anda bersama DriveEase."
            : isCancelled
              ? "Pesanan ini telah dibatalkan. Hubungi admin jika Anda merasa ini sebuah kesalahan."
              : "Terima kasih! Pesanan Anda telah selesai dan pembayaran sudah lunas.",
      badgeLabel: "",
    } as (typeof data.tracking_statuses)[number]);

  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 bg-[#fcfcfc] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/" id="breadcrumb-home" className="hover:text-[#1a1a1a]">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/tracking-pemesanan"
            id="breadcrumb-status"
            className="hover:text-[#1a1a1a]"
          >
            Status
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF9500]">Invoice</span>
        </nav>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Detail Booking &amp; Invoice
            </h1>
            <p className="text-gray-400 font-medium">{resolvedMeta.message}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              id="btn-print"
              className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-bold text-sm hover:border-[#1a1a1a] transition-all"
            >
              <Printer className="w-4 h-4" />
              Cetak
            </button>
            <button
              type="button"
              id="btn-download"
              className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-bold text-sm hover:border-[#1a1a1a] transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <a
              href="https://wa.me/"
              id="btn-share-wa"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Bagikan ke WA
            </a>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Status Header */}
          <div
            className={`${headerBg} border-b p-6 flex items-center justify-center gap-3`}
          >
            <div
              className={`w-8 h-8 rounded-full ${pillBg} text-white flex items-center justify-center shadow-lg shadow-black/5`}
            >
              <StatusIcon className="text-xl" />
            </div>
            <span
              className={`${pillText} font-black tracking-tight uppercase`}
            >
              {resolvedMeta.title}
            </span>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black tracking-tight">
                    DriveEase
                  </span>
                </div>
                <div className="space-y-1 text-gray-400 text-sm font-medium leading-relaxed">
                  <p>PT DriveEase Indonesia Makmur</p>
                  <p>Jl. Jenderal Sudirman No. 123, Jakarta Selatan</p>
                  <p>Jakarta, 12190</p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                  No. Invoice
                </p>
                <p className="text-2xl font-black mb-4">#INV-DE-8829410</p>
                <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold">
                  <span className="text-gray-400">Booking ID:</span>
                  <span>DE-8829410</span>
                  <button
                    type="button"
                    className="text-gray-300 hover:text-[#1a1a1a]"
                    aria-label="Salin Booking ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                  Tanggal Terbit
                </p>
                <p className="text-sm font-bold">15 Jan 2024, 14:20 WIB</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
              {/* Customer Info */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="text-[#FF9500] w-4 h-4" />
                  Informasi Penyewa
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-black">Rizky Pratama</p>
                    <p className="text-sm text-gray-400 font-medium">
                      Penyewa Utama
                    </p>
                  </div>
                  <div className="text-sm font-bold space-y-1">
                    <p className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      0812-9876-5432
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      rizky.pratama@email.com
                    </p>
                    <p className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      KTP: 3174**********01
                    </p>
                  </div>
                </div>
              </div>

              {/* Car Details */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Car className="text-[#FF9500] w-4 h-4" />
                  Detail Armada
                </h4>
                <div className="flex gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80"
                      alt="Toyota Avanza"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black">Toyota Avanza 2023</p>
                    <p className="text-sm text-gray-400 font-medium">
                      Manual • 7 Kursi
                    </p>
                    <p className="text-xs font-black text-[#FF9500] bg-orange-50 inline-block px-2 py-1 rounded mt-2">
                      B 1234 ABC
                    </p>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <CalendarCheck className="text-[#FF9500] w-4 h-4" />
                  Detail Sewa
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Pengambilan
                      </p>
                      <p className="text-sm font-bold">15 Jul, 09:00</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Pengembalian
                      </p>
                      <p className="text-sm font-bold">18 Jul, 09:00</p>
                    </div>
                  </div>
                  <div className="pt-4 border-top border-gray-50">
                    <p className="text-sm font-bold flex justify-between">
                      <span className="text-gray-400">Durasi:</span>
                      <span>3 Hari</span>
                    </p>
                    <p className="text-sm font-bold flex justify-between">
                      <span className="text-gray-400">Tipe:</span>
                      <span>Lepas Kunci</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
              {/* Payment Info */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="text-[#FF9500] w-4 h-4" />
                  Informasi Pembayaran
                </h4>
                <div className="bg-gray-50 rounded-[1.5rem] p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                      Metode
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center text-xs font-black px-2 py-1 rounded bg-violet-100 text-violet-700">
                        OVO E-Wallet
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                      ID Transaksi
                    </span>
                    <span className="text-sm font-black">TXN-99210082</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                      Waktu Bayar
                    </span>
                    <span className="text-sm font-black">
                      15 Jan 2024, 14:15 WIB
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Rincian Biaya
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-400">
                      Sewa Toyota Avanza (3 Hari)
                    </span>
                    <span className="font-bold">Rp 1.350.000</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-400">Biaya Asuransi Dasar</span>
                    <span className="font-bold">Rp 150.000</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-400">Biaya Admin &amp; Layanan</span>
                    <span className="font-bold">Rp 50.000</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#FF9500]">
                    <span className="italic">Kode Promo: DRIVEEASENEW</span>
                    <span>- Rp 100.000</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-lg font-black">Total Terbayar</span>
                    <span className="text-3xl font-black text-[#FF9500]">
                      Rp 1.450.000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Invoice Note */}
            <div className="pt-12 border-t border-gray-100 text-center space-y-4">
              <p className="text-xs text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
                Invoice ini sah dan diterbitkan secara elektronik. Syarat dan
                Ketentuan berlaku sesuai dengan perjanjian sewa yang telah
                disetujui.
              </p>
              <div className="flex justify-center gap-6">
                <Link
                  href="#"
                  className="text-[10px] font-black text-gray-300 hover:text-[#1a1a1a] uppercase tracking-widest"
                >
                  Syarat &amp; Ketentuan
                </Link>
                <Link
                  href="#"
                  className="text-[10px] font-black text-gray-300 hover:text-[#1a1a1a] uppercase tracking-widest"
                >
                  Bantuan 24/7
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps / Help */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <h3 className="text-xl font-black mb-6">Langkah Selanjutnya</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white flex-shrink-0 flex items-center justify-center font-black">
                  1
                </div>
                <p>Admin kami akan menyiapkan unit sesuai jadwal.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white flex-shrink-0 flex items-center justify-center font-black">
                  2
                </div>
                <p>Siapkan KTP &amp; SIM asli saat pengambilan unit.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white flex-shrink-0 flex items-center justify-center font-black">
                  3
                </div>
                <p>Unit dapat diambil di lokasi yang ditentukan.</p>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-black">Butuh Bantuan?</h3>
              <p className="text-gray-400 text-sm font-medium">
                Hubungi tim support kami jika ada pertanyaan atau perubahan
                jadwal.
              </p>
            </div>
            <div className="pt-6">
              <a
                href="https://wa.me/"
                id="cta-support-wa"
                className="inline-flex items-center gap-3 text-[#1a1a1a] font-black hover:text-[#FF9500] transition-colors"
              >
                <div className="w-10 h-10 bg-green-50 text-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                Chat CS DriveEase (24/7)
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
