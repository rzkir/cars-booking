"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarRange,
  CreditCard,
  ExternalLink,
  RefreshCw,
  Search,
  Settings2,
  Star,
} from "lucide-react";

import { formatDate, formatRupiah } from "@/hooks/format-idr";

import { useBookingsQuery } from "@/services/bookings.service";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

type StatusFilter = "all" | BookingStatus;
type SortKey = "Terbaru" | "Terakhir" | "Harga Tertinggi" | "Harga Terendah";

const STATUS_META: Record<BookingStatus, { label: string; pillClass: string }> =
  {
    pending: {
      label: "Menunggu",
      pillClass: "bg-orange-50 text-orange-700",
    },
    confirmed: {
      label: "Dikonfirmasi",
      pillClass: "bg-blue-50 text-blue-700",
    },
    ongoing: {
      label: "Berlangsung",
      pillClass: "bg-sky-50 text-sky-700",
    },
    done: {
      label: "Selesai",
      pillClass: "bg-emerald-50 text-emerald-700",
    },
    cancelled: {
      label: "Dibatalkan",
      pillClass: "bg-red-50 text-red-700",
    },
  };

function getPrimaryCarImage(booking: BookingWithRelations) {
  const images = booking.cars?.car_images ?? [];
  return (
    images.find((img) => img.is_primary)?.image_url ??
    images[0]?.image_url ??
    ""
  );
}

export default function RiwayatBooking() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("Terbaru");

  const listQuery = useBookingsQuery({
    role: "customer",
    status: statusFilter === "all" ? undefined : statusFilter,
    page: 1,
    pageSize: 50,
  });

  const allBookings = useMemo(
    () => listQuery.data?.data ?? [],
    [listQuery.data?.data],
  );

  const filteredSortedBookings = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = term
      ? allBookings.filter((b) => {
          const carName = b.cars?.name ?? "";
          const combined = `${b.id} ${carName}`.toLowerCase();
          return combined.includes(term);
        })
      : allBookings;

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "Harga Tertinggi")
        return (b.total_price ?? 0) - (a.total_price ?? 0);
      if (sort === "Harga Terendah")
        return (a.total_price ?? 0) - (b.total_price ?? 0);
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sort === "Terbaru" ? db - da : da - db;
    });

    return sorted;
  }, [allBookings, search, sort]);

  const isLoading = listQuery.isLoading && allBookings.length === 0;

  return (
    <>
      <div className="space-y-10">
        {/* Filters & Search */}
        <section
          aria-label="Filter dan pencarian riwayat booking"
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button
              id="filter-all"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "all"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("all")}
            >
              Semua
            </button>
            <button
              id="filter-done"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "done"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("done")}
            >
              Selesai
            </button>
            <button
              id="filter-ongoing"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "ongoing"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("ongoing")}
            >
              Berlangsung
            </button>
            <button
              id="filter-confirmed"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "confirmed"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("confirmed")}
            >
              Dikonfirmasi
            </button>
            <button
              id="filter-pending"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "pending"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("pending")}
            >
              Menunggu
            </button>
            <button
              id="filter-cancelled"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                statusFilter === "cancelled"
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500]",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("cancelled")}
            >
              Dibatalkan
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari ID Booking..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-[#FF9500] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              id="sort-booking"
              className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest outline-none appearance-none"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option>Terbaru</option>
              <option>Terakhir</option>
              <option>Harga Tertinggi</option>
              <option>Harga Terendah</option>
            </select>
          </div>
        </section>

        {/* Booking History List */}
        <section aria-label="Daftar riwayat booking" className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-10 text-center">
              <p className="text-sm font-bold text-gray-400">
                Memuat riwayat booking...
              </p>
            </div>
          ) : listQuery.isError ? (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-10 text-center">
              <p className="text-sm font-bold text-gray-500">
                Gagal memuat riwayat booking.
              </p>
              <button
                type="button"
                onClick={() => listQuery.refetch()}
                className="mt-4 px-6 py-3 bg-[#1a1a1a] text-white rounded-xl text-xs font-black uppercase tracking-widest"
              >
                Coba lagi
              </button>
            </div>
          ) : filteredSortedBookings.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-10 text-center">
              <p className="text-sm font-bold text-gray-400">
                Belum ada booking untuk ditampilkan.
              </p>
            </div>
          ) : (
            filteredSortedBookings.map((booking) => {
              const statusMeta = STATUS_META[booking.status];
              const carName = booking.cars?.name ?? "Mobil";
              const carImage = getPrimaryCarImage(booking);
              const rentalTypeLabel =
                booking.rental_type === "with_driver"
                  ? "Dengan Sopir"
                  : "Lepas Kunci";

              const canPay =
                booking.status === "pending" || booking.status === "confirmed";
              const isCancelled = booking.status === "cancelled";

              return (
                <article
                  key={booking.id}
                  aria-label={`Booking ${statusMeta.label} ${carName}`}
                  className={[
                    `bg-white rounded-[2rem] ${cardShadow} overflow-hidden group`,
                    isCancelled
                      ? "opacity-70 hover:opacity-100 transition-opacity"
                      : "",
                  ].join(" ")}
                >
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                    <div
                      className={[
                        "w-full lg:w-72 h-48 rounded-[1.5rem] overflow-hidden bg-gray-50 shrink-0 relative",
                        isCancelled ? "grayscale" : "",
                      ].join(" ")}
                    >
                      {carImage ? (
                        <Image
                          src={carImage}
                          alt={carName}
                          width={600}
                          height={320}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-bold">
                          Tidak ada gambar
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span
                          className={[
                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg",
                            statusMeta.pillClass,
                          ].join(" ")}
                        >
                          {statusMeta.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black text-gray-300 tracking-widest">
                              #{booking.id.slice(0, 8).toUpperCase()}
                            </span>
                          </div>
                          <h2 className="text-2xl font-black tracking-tight mb-1">
                            {carName}
                          </h2>
                          <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-[#FF9500]" />
                            {rentalTypeLabel} • {booking.total_days} Hari
                            {booking.colors?.name
                              ? ` • ${booking.colors.name}`
                              : ""}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Total Harga
                          </p>
                          <p className="text-2xl font-black text-[#FF9500]">
                            {formatRupiah(booking.total_price)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                            Periode Sewa
                          </p>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                              <CalendarRange className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-black">
                                {formatDate(booking.start_date)} -{" "}
                                {formatDate(booking.end_date)}
                              </p>
                              <p className="text-xs text-gray-400 font-medium italic">
                                {booking.customer_profiles?.full_name ??
                                  "Customer"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {booking.notes ? (
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                              Catatan
                            </p>
                            <p className="text-sm text-gray-400 font-medium leading-relaxed">
                              {booking.notes}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex lg:flex-col justify-end gap-3 shrink-0 pt-4 lg:pt-0">
                      <Link
                        href={`/lacak-pemesanan/${booking.id}`}
                        className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
                        aria-label="Lihat detail booking"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>

                      {booking.status === "done" ? (
                        <button
                          type="button"
                          className="flex-1 lg:flex-none px-6 py-3 bg-[#FF9500] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#E68600] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                        >
                          <Star className="w-4 h-4" />
                          Beri Review
                        </button>
                      ) : canPay ? (
                        <Link
                          href={`/booking/${booking.id}`}
                          className="flex-1 lg:flex-none px-10 py-3 bg-[#1a1a1a] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                        >
                          <CreditCard className="w-4 h-4" />
                          Bayar Sekarang
                        </Link>
                      ) : null}

                      <Link
                        href={
                          booking.cars?.slug
                            ? `/cars/${booking.cars.slug}`
                            : "/"
                        }
                        className="w-12 h-12 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-xl shadow-black/10"
                        aria-label={
                          isCancelled ? "Cek ketersediaan" : "Sewa lagi"
                        }
                      >
                        <RefreshCw className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </>
  );
}
