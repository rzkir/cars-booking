"use client";

import Link from "next/link";

import { CalendarRange, CreditCard, Search, Info, Tag } from "lucide-react";

import { formatDate, formatRupiah } from "@/hooks/format-idr";

import {
  PAYMENT_STATUS_META,
  useRiwayatTransactionState,
} from "@/services/payments.service";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

export default function RiwayatTransaction() {
  const {
    listQuery,
    filteredSortedPayments,
    isLoading,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sort,
    setSort,
    totalAmount,
    totalCount,
    statusLabel,
  } = useRiwayatTransactionState();

  return (
    <div className="space-y-10">
      {/* Filters & Search */}
      <section
        aria-label="Filter dan pencarian riwayat pembayaran"
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <ScrollArea className="w-full md:w-[40%] rounded-md border whitespace-nowrap">
          <div className="flex gap-3 p-4">
            <Button
              variant="ghost"
              id="filter-all-payments"
              className={[
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all h-auto",
                statusFilter === "all"
                  ? "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a] hover:text-white"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500] hover:bg-transparent",
              ].join(" ")}
              type="button"
              onClick={() => setStatusFilter("all")}
            >
              Semua
            </Button>

            {(["paid", "unpaid", "failed"] as const).map((key) => {
              const meta = PAYMENT_STATUS_META[key];
              const active = statusFilter === key;
              return (
                <Button
                  key={key}
                  variant="ghost"
                  id={`filter-${key}`}
                  className={[
                    "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all h-auto",
                    active
                      ? "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a] hover:text-white"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500] hover:bg-transparent",
                  ].join(" ")}
                  type="button"
                  onClick={() => setStatusFilter(key)}
                >
                  {meta.label}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64 order-2 sm:order-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari ID / Booking..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-[#FF9500] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 order-1 sm:order-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setSort("Terbaru")}
              className={[
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all h-auto",
                sort === "Terbaru"
                  ? "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500] hover:bg-transparent",
              ].join(" ")}
            >
              Terbaru
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setSort("Terakhir")}
              className={[
                "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all h-auto",
                sort === "Terakhir"
                  ? "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]"
                  : "bg-white text-gray-400 border border-gray-100 hover:border-[#FF9500] hover:text-[#FF9500] hover:bg-transparent",
              ].join(" ")}
            >
              Terakhir
            </Button>
          </div>
        </div>
      </section>

      {/* Payments List */}
      <section aria-label="Daftar riwayat pembayaran" className="space-y-6">
        {!listQuery.isError && (
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                  Total Semua Transaksi
                </p>
                <div className="mt-2 text-3xl font-black text-[#FF9500]">
                  {isLoading ? (
                    <Skeleton className="h-8 w-48" />
                  ) : (
                    formatRupiah(totalAmount)
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-400 font-medium">
                  {isLoading ? (
                    <Skeleton className="h-4 w-64" />
                  ) : (
                    `${totalCount} transaksi · ${statusLabel}`
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, idx) => (
              <article
                key={idx}
                aria-label="Skeleton riwayat pembayaran"
                className={[
                  `bg-white rounded-[2rem] ${cardShadow} overflow-hidden`,
                  "opacity-100",
                ].join(" ")}
              >
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-72 h-24 rounded-[1.5rem] bg-gray-50 relative overflow-hidden">
                    <Skeleton className="h-full w-full rounded-[1.5rem] bg-gray-200" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-56 bg-gray-200" />
                      <Skeleton className="h-10 w-40 bg-gray-200" />
                      <Skeleton className="h-4 w-64 bg-gray-200" />
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Skeleton className="h-11 w-44 bg-gray-200 rounded-xl" />
                      <Skeleton className="h-11 w-32 bg-gray-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : listQuery.isError ? (
          <div className="bg-white rounded-[2rem] border border-gray-100 p-10 text-center">
            <p className="text-sm font-bold text-gray-500">
              Gagal memuat riwayat pembayaran.
            </p>
            <Button
              variant="ghost"
              type="button"
              onClick={() => listQuery.refetch()}
              className="mt-4 h-auto px-6 py-3 bg-[#1a1a1a] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black"
            >
              Coba lagi
            </Button>
          </div>
        ) : filteredSortedPayments.length === 0 ? (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CreditCard className="h-6 w-6" />
              </EmptyMedia>
              <EmptyTitle>Belum ada pembayaran</EmptyTitle>
              <EmptyDescription>
                Belum ada data pembayaran untuk ditampilkan.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-6">
            {filteredSortedPayments.map((payment) => {
              const statusMeta = payment.status
                ? PAYMENT_STATUS_META[
                    payment.status as Exclude<PaymentStatusFilter, "all">
                  ]
                : null;

              const statusPill =
                payment.status && statusMeta ? statusMeta.pill : "";

              const paymentDate = formatDate(
                payment.paid_at ?? payment.created_at,
              );

              const actionHref =
                payment.status === "paid"
                  ? `/lacak-pemesanan/${payment.booking_id}`
                  : `/booking/${payment.booking_id}`;
              const actionLabel =
                payment.status === "paid" ? "Lihat Detail" : "Bayar Sekarang";

              return (
                <article
                  key={payment.id}
                  aria-label={`Pembayaran ${payment.status} ${payment.booking_id}`}
                  className={`bg-white rounded-[2rem] ${cardShadow} overflow-hidden group`}
                >
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-72 h-48 rounded-[1.5rem] overflow-hidden bg-gray-50 shrink-0 relative">
                      <div className="absolute top-4 left-4">
                        {payment.status && statusMeta ? (
                          <span
                            className={[
                              "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg",
                              statusPill,
                            ].join(" ")}
                          >
                            {statusMeta.label}
                          </span>
                        ) : null}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <CreditCard className="h-10 w-10" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black text-gray-300 tracking-widest">
                              #{payment.booking_id.slice(0, 8).toUpperCase()}
                            </span>
                          </div>
                          <h2 className="text-2xl font-black tracking-tight mb-1">
                            Pembayaran
                          </h2>
                          <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                            <Tag className="w-4 h-4 text-[#FF9500]" />
                            {payment.method ?? "-"}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Total Harga
                          </p>
                          <p className="text-2xl font-black text-[#FF9500]">
                            {formatRupiah(
                              payment.bookings?.total_price ?? payment.amount,
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                            Waktu Pembayaran
                          </p>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                              <CalendarRange className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-black">
                                {paymentDate}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                            Kode Booking
                          </p>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                              <Info className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <span className="capitalize">
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end gap-3 shrink-0">
                      <Link
                        href={actionHref}
                        className="flex-1 lg:flex-none px-6 py-3 bg-[#1a1a1a] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                        aria-label={actionLabel}
                      >
                        {actionLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
