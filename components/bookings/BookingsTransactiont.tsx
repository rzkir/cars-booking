"use client";

import Image from "next/image";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";

import { useBookingsTransactionState } from "@/services/payments.service";

import { ArrowRight, Car, MapPin, Star } from "lucide-react";

const LocationPicker = dynamic(
  () => import("@/components/profile/LocationPicker"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
  },
);

type BookingsTransactiontProps = {
  bookingId: string;
};

export default function BookingsTransactiont({
  bookingId,
}: BookingsTransactiontProps) {
  const {
    copied,
    selectedGeo,
    setSelectedGeo,
    handleCopyId,
    handleOpenSnap,
    snapMutation,
    syncMutation,
    bookingQuery,
    profileQuery,
    locationsQuery,
  } = useBookingsTransactionState(bookingId);

  const isLoading = snapMutation.isPending;
  const snapData = snapMutation.data;
  const isError = snapMutation.isError;
  const paymentStatus = syncMutation.data?.status;
  const isSyncing = syncMutation.isPending;
  const booking = bookingQuery.data ?? null;
  const customer = booking?.customer_profiles ?? null;
  const idNumber = customer?.id_number ?? profileQuery.data?.id_number ?? "";
  const isSyncError = syncMutation.isError;

  const formatIDR = (value: number | null | undefined) =>
    typeof value === "number"
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(value)
      : "-";

  return (
    <div className="min-h-screen text-slate-900 pt-20 md:pt-28 pb-10">
      <main className="max-w-full-sm xl:container mx-auto px-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full space-y-8 lg:w-[60%]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="font-bold tracking-tight text-slate-900">
                Informasi Penyewa
              </h2>
              <p className="text-sm text-slate-500">
                Pastikan data yang Anda masukkan sesuai dengan identitas asli.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Nama Lengkap
                </label>
                <Input
                  value={customer?.full_name ?? ""}
                  readOnly
                  placeholder={
                    bookingQuery.isLoading ? "Memuat..." : "Contoh: John Doe"
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white focus-visible:ring-indigo-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Nomor KTP / SIM
                </label>
                <Input
                  value={idNumber}
                  readOnly
                  placeholder={
                    bookingQuery.isLoading ? "Memuat..." : "Belum tersedia"
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white focus-visible:ring-indigo-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Nomor Telepon (WhatsApp)
                </label>
                <div className="flex">
                  <span className="inline-flex h-11 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                    +62
                  </span>
                  <Input
                    type="tel"
                    value={(customer?.phone ?? "").replace(/^\+?62/, "")}
                    readOnly
                    placeholder={
                      bookingQuery.isLoading ? "Memuat..." : "8123xxxxxxx"
                    }
                    className="h-11 rounded-l-none rounded-r-xl border-slate-200 bg-white focus-visible:ring-indigo-500/20"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Alamat Email
                </label>
                <Input
                  type="email"
                  value={customer?.email ?? ""}
                  readOnly
                  placeholder={
                    bookingQuery.isLoading ? "Memuat..." : "email@anda.com"
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white focus-visible:ring-indigo-500/20"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="font-bold tracking-tight text-slate-900">
                Alamat Customer
              </h2>
              <p className="text-sm text-slate-500">
                Alamat tersimpan dari profil customer.
              </p>
            </div>

            <div className="space-y-3 p-6">
              {locationsQuery.isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-2xl" />
                  <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
              ) : (locationsQuery.data ?? []).length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">
                    Belum ada alamat tersimpan.
                  </p>
                </div>
              ) : (
                (locationsQuery.data ?? []).map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {loc.label ?? "Alamat"}
                          </p>
                          {loc.is_default ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
                              <Star className="h-3.5 w-3.5" />
                              Utama
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          {loc.address}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedGeo({
                          address: loc.address,
                          latitude: loc.latitude,
                          longitude: loc.longitude,
                        })
                      }
                      className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      Pilih
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="font-bold tracking-tight text-slate-900">
                Cari Lokasi (Leaflet GeoSearch)
              </h2>
              <p className="text-sm text-slate-500">
                Gunakan kolom pencarian di peta untuk memilih alamat.
              </p>
            </div>

            <div className="space-y-4 p-6">
              <LocationPicker
                height="320px"
                center={[
                  selectedGeo?.latitude ?? -6.2088,
                  selectedGeo?.longitude ?? 106.8456,
                ]}
                marker={
                  selectedGeo
                    ? [selectedGeo.latitude, selectedGeo.longitude]
                    : undefined
                }
                zoom={12}
                searchLabel="Alamat Anda..."
                onSelect={(loc) => setSelectedGeo(loc)}
              />
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-[40%] lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-indigo-100">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl"
            />

            <h2 className="relative z-10 mb-5 text-xl font-bold tracking-tight">
              Ringkasan Pesanan
            </h2>

            <div className="relative z-10 rounded-2xl bg-white/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Booking ID
              </p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="break-all font-mono text-xs text-white/90">
                  {bookingId}
                </p>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="shrink-0 rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80 hover:bg-white/10"
                >
                  {copied ? "Tersalin" : "Salin"}
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-5 space-y-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Mobil
                </p>
                {bookingQuery.isLoading ? (
                  <div className="mt-3 space-y-3">
                    <Skeleton className="h-4 w-1/2 bg-white/10" />
                    <Skeleton className="h-20 w-full rounded-2xl bg-white/10" />
                  </div>
                ) : booking?.cars ? (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                      {booking.cars.car_images?.length ? (
                        <Image
                          src={
                            booking.cars.car_images.find(
                              (img) => img.is_primary,
                            )?.image_url ??
                            booking.cars.car_images[0]?.image_url
                          }
                          alt={booking.cars.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/50">
                          <Car className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {booking.cars.name}
                      </p>
                      <p className="mt-0.5 text-xs text-white/60">
                        {booking.total_days} hari ·{" "}
                        {booking.rental_type === "with_driver"
                          ? "Dengan sopir"
                          : "Lepas kunci"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-white/50">
                    Data mobil tidak tersedia untuk booking ini.
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Rincian
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Penyewa</span>
                    <span className="max-w-[60%] truncate text-right font-semibold text-white">
                      {bookingQuery.isLoading
                        ? "Memuat..."
                        : (customer?.full_name ?? "-")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Telepon</span>
                    <span className="max-w-[60%] truncate text-right font-semibold text-white">
                      {bookingQuery.isLoading
                        ? "Memuat..."
                        : (customer?.phone ?? "-")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Durasi</span>
                    <span className="text-right font-semibold text-white">
                      {bookingQuery.isLoading
                        ? "Memuat..."
                        : booking?.total_days != null
                          ? `${booking.total_days} hari`
                          : "-"}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-white/15 pt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/70">Total Pembayaran</p>
                      <p className="text-2xl font-bold text-indigo-300">
                        {bookingQuery.isLoading
                          ? "Memuat..."
                          : formatIDR(booking?.total_price)}
                      </p>
                    </div>
                    <span className="text-[10px] italic text-white/40">
                      Termasuk pajak
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-white/70">Status</span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80">
                    {paymentStatus === "paid"
                      ? "Paid"
                      : isSyncError
                        ? "Sync error"
                        : isSyncing
                          ? "Checking..."
                          : "Pending"}
                  </span>
                </div>

                {syncMutation.data?.midtrans_status && (
                  <p className="mt-2 text-xs text-white/70">
                    Midtrans:{" "}
                    <span className="font-semibold text-white">
                      {syncMutation.data.midtrans_status}
                    </span>
                  </p>
                )}
                {isSyncError && (
                  <p className="mt-2 text-xs text-red-200">
                    Gagal cek status. Silakan klik “Cek status” lagi setelah
                    transaksi dibuat di Midtrans.
                  </p>
                )}
              </div>

              {isLoading && (
                <div className="rounded-2xl bg-white/10 p-4 space-y-3">
                  <Skeleton className="h-4 w-2/3 bg-white/10" />
                  <Skeleton className="h-11 w-full rounded-2xl bg-white/10" />
                </div>
              )}

              {isError && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm font-semibold text-red-200">
                    {(snapMutation.error as Error)?.message ??
                      "Gagal menyiapkan pembayaran"}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                      onClick={() => snapMutation.mutate()}
                    >
                      Coba lagi
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/5"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleOpenSnap}
                disabled={!snapData || isSyncing || isLoading || isError}
                className={[
                  "group relative z-10 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition-opacity",
                  "bg-linear-to-br from-indigo-500 to-fuchsia-500 hover:opacity-90",
                  (!snapData || isSyncing || isLoading || isError) &&
                    "cursor-not-allowed opacity-60 hover:opacity-60",
                ].join(" ")}
              >
                Bayar Sekarang
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                disabled={!snapData?.payment_id || isSyncing || isLoading}
                onClick={() =>
                  snapData?.payment_id &&
                  syncMutation.mutate(snapData.payment_id)
                }
                className={[
                  "w-full rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white/90 transition-colors hover:bg-white/10",
                  (!snapData?.payment_id || isSyncing || isLoading) &&
                    "cursor-not-allowed opacity-60 hover:bg-white/5",
                ].join(" ")}
              >
                {isSyncing ? "Mengecek..." : "Cek status"}
              </button>

              <p className="px-1 text-center text-[10px] text-white/40">
                Dengan menekan tombol di atas, Anda menyetujui Syarat &
                Ketentuan serta Kebijakan Privasi DriveEase.
              </p>

              {paymentStatus === "paid" && (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                  <p className="text-sm font-semibold text-emerald-200">
                    Pembayaran berhasil
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Anda akan diarahkan ke halaman lacak pemesanan.
                  </p>
                </div>
              )}

              {!snapData && !isLoading && !isError && (
                <p className="text-center text-xs text-white/50">
                  Menyiapkan sesi pembayaran...
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Bank Transfer</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
