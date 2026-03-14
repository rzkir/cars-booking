"use client";

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
  Mail,
  MessageCircle,
  ShieldCheck,
  User,
} from "lucide-react";

import data from "@/helper/data/data.json";

import { useBookingQuery } from "@/services/bookings.service";

const KNOWN_STATUSES = ["pending", "confirmed", "ongoing", "done", "cancelled"];

const DEMO_STATUSES = new Set(KNOWN_STATUSES);

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Props = { idOrStatus: string };

export default function LacakPemesananDetail({ idOrStatus }: Props) {
  const isDemoStatus = DEMO_STATUSES.has(idOrStatus);
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingQuery(isDemoStatus ? null : idOrStatus, {
    enabled: !isDemoStatus,
  });

  const status = (booking?.status ?? idOrStatus) as string;
  const isPending = status === "pending";
  const isConfirmed = status === "confirmed";
  const isOngoing = status === "ongoing";
  const isCancelled = status === "cancelled";

  const meta = data.tracking_statuses.find((item) => item.status === status);

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

  const baseMeta =
    meta ??
    ({
      status,
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
            ? "Unit sedang digunakan sesuai jadwal sewa. Nikmati perjalanan Anda."
            : isCancelled
              ? "Pesanan ini telah dibatalkan. Hubungi admin jika Anda merasa ini sebuah kesalahan."
              : "Terima kasih! Pesanan Anda telah selesai dan pembayaran sudah lunas.",
      badgeLabel: "",
    } as (typeof data.tracking_statuses)[number]);

  const resolvedMeta = {
    ...baseMeta,
    title: isPending
      ? "Menunggu Konfirmasi"
      : isConfirmed
        ? "Menunggu Pembayaran"
        : baseMeta.title,
  };

  if (!isDemoStatus && isLoading) {
    return (
      <main className="pt-24 md:pt-32 pb-20 px-6 bg-[#fcfcfc] min-h-screen">
        <div className="max-w-5xl mx-auto text-center py-20">
          <Clock className="w-16 h-16 text-[#FF9500] mx-auto animate-pulse" />
          <p className="mt-4 font-bold text-gray-500">Memuat data booking...</p>
        </div>
      </main>
    );
  }

  if (!isDemoStatus && (isError || !booking)) {
    return (
      <main className="pt-24 md:pt-32 pb-20 px-6 bg-[#fcfcfc] min-h-screen">
        <div className="max-w-5xl mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="mt-4 text-xl font-black">Booking tidak ditemukan</h2>
          <p className="mt-2 text-gray-500">
            Pastikan ID booking benar atau hubungi admin.
          </p>
          <Link
            href="/lacak-pemesanan"
            className="mt-6 inline-block px-6 py-3 bg-[#FF9500] text-white font-black rounded-xl"
          >
            Coba Lagi
          </Link>
        </div>
      </main>
    );
  }

  const b = booking;
  const customerName = b?.customer_profiles?.full_name ?? "Penyewa";
  const customerPhone = b?.customer_profiles?.phone ?? "-";
  const customerEmail = b?.customer_profiles?.email ?? "-";
  const carName = booking?.cars?.name ?? "Toyota Avanza 2023";
  const carImage =
    booking?.cars?.car_images?.find((i) => i.is_primary)?.image_url ??
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80";
  const rentalTypeLabel =
    booking?.rental_type === "with_driver" ? "Dengan Supir" : "Lepas Kunci";
  const invoiceNo = `#INV-${(booking?.id ?? "DE-8829410").slice(0, 8).toUpperCase()}`;
  const bookingId = booking?.id ?? "DE-8829410";

  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 bg-[#fcfcfc] min-h-screen">
      <div className="container mx-auto">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#1a1a1a]">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/lacak-pemesanan" className="hover:text-[#1a1a1a]">
            Lacak
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF9500]">Invoice</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Detail Booking &amp; Invoice
            </h1>
            <p className="text-gray-400 font-medium">{resolvedMeta.message}</p>
          </div>
          <div className="flex flex-wrap gap-3" />
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          <div
            className={`${headerBg} border-b p-6 flex items-center justify-center gap-3`}
          >
            <div
              className={`w-8 h-8 rounded-full ${pillBg} text-white flex items-center justify-center shadow-lg shadow-black/5`}
            >
              <StatusIcon className="text-xl" />
            </div>
            <span className={`${pillText} font-black tracking-tight uppercase`}>
              {resolvedMeta.title}
            </span>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black tracking-tight">
                    Space Digitalia Rent Car
                  </span>
                </div>
                <div className="space-y-1 text-gray-400 text-sm font-medium leading-relaxed">
                  <p>Space Digitalia</p>
                  <p>Layanan sewa mobil terpercaya</p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                  No. Invoice
                </p>
                <p className="text-2xl font-black mb-4">{invoiceNo}</p>
                <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold">
                  <span className="text-gray-400">Booking ID:</span>
                  <span>{bookingId}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(bookingId)}
                    className="text-gray-300 hover:text-[#1a1a1a]"
                    aria-label="Salin Booking ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                  Tanggal Terbit
                </p>
                <p className="text-sm font-bold">
                  {formatDate(booking?.created_at ?? new Date().toISOString())}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="text-[#FF9500] w-4 h-4" />
                  Informasi Penyewa
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-black">{customerName}</p>
                    <p className="text-sm text-gray-400 font-medium">
                      Penyewa Utama
                    </p>
                  </div>
                  <div className="text-sm font-bold space-y-1">
                    <p className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      {customerPhone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {customerEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Car className="text-[#FF9500] w-4 h-4" />
                  Detail Armada
                </h4>
                <div className="flex gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={carImage}
                      alt={carName}
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black">{carName}</p>
                    <p className="text-sm text-gray-400 font-medium">
                      {rentalTypeLabel}
                    </p>
                    {booking?.colors?.name && (
                      <p className="text-xs font-black text-[#FF9500] bg-orange-50 inline-block px-2 py-1 rounded mt-2">
                        {booking.colors.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
                      <p className="text-sm font-bold">
                        {formatDate(booking?.start_date ?? "")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Pengembalian
                      </p>
                      <p className="text-sm font-bold">
                        {formatDate(booking?.end_date ?? "")}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-sm font-bold flex justify-between">
                      <span className="text-gray-400">Durasi:</span>
                      <span>{booking?.total_days ?? 0} Hari</span>
                    </p>
                    <p className="text-sm font-bold flex justify-between">
                      <span className="text-gray-400">Tipe:</span>
                      <span>{rentalTypeLabel}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="text-[#FF9500] w-4 h-4" />
                  Informasi Pembayaran
                </h4>
                <div className="bg-gray-50 rounded-[1.5rem] p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                      Status
                    </span>
                    <span className="inline-flex items-center justify-center text-xs font-black px-2 py-1 rounded bg-violet-100 text-violet-700">
                      {resolvedMeta.title}
                    </span>
                  </div>
                  {booking?.notes && (
                    <p className="text-sm text-gray-600">{booking.notes}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Rincian Biaya
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-400">
                      Sewa {carName} ({booking?.total_days ?? 0} Hari)
                    </span>
                    <span className="font-bold">
                      {formatRupiah(booking?.total_price ?? 0)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-lg font-black">Total Estimasi</span>
                    <span className="text-3xl font-black text-[#FF9500]">
                      {formatRupiah(booking?.total_price ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100 text-center space-y-4">
              <p className="text-xs text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
                Invoice ini sah dan diterbitkan secara elektronik. Hubungi admin
                untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-6">Langkah Selanjutnya</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white shrink-0 flex items-center justify-center font-black">
                  1
                </div>
                <p>Admin kami akan menyiapkan unit sesuai jadwal.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white shrink-0 flex items-center justify-center font-black">
                  2
                </div>
                <p>Siapkan KTP &amp; SIM asli saat pengambilan unit.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF9500] text-white shrink-0 flex items-center justify-center font-black">
                  3
                </div>
                <p>Unit dapat diambil di lokasi yang ditentukan.</p>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <div className="space-y-2">
              <h3 className="text-xl font-black">Butuh Bantuan?</h3>
              <p className="text-gray-400 text-sm font-medium">
                Hubungi tim support kami jika ada pertanyaan atau perubahan
                jadwal.
              </p>
            </div>
            <div className="pt-6">
              <a
                href={`https://wa.me/6285811668557?text=Halo, saya ingin bertanya tentang booking ${bookingId}`}
                className="inline-flex items-center gap-3 text-[#1a1a1a] font-black hover:text-[#FF9500] transition-colors"
              >
                <div className="w-10 h-10 bg-green-50 text-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                Chat CS (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
