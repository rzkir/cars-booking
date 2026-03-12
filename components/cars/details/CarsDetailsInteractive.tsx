"use client";

import { usePathname, useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { accountKeys, getProfile } from "@/services/accounts.service";

import { useCreateBookingMutation } from "@/services/bookings.service";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Bluetooth,
  Cable,
  Camera,
  Car,
  CheckCircle,
  ClipboardList,
  Gauge,
  Info,
  MapPin,
  Music,
  Palette,
  Settings,
  Shield,
  ShieldCheck,
  Snowflake,
  UserCheck,
  X,
} from "lucide-react";

function getFacilityIcon(
  facility: string,
): React.ComponentType<{ className?: string }> {
  const lower = facility.toLowerCase();
  if (lower.includes("ac") || lower.includes("dingin")) return Snowflake;
  if (
    lower.includes("audio") ||
    lower.includes("musik") ||
    lower.includes("sound")
  )
    return Music;
  if (lower.includes("usb")) return Cable;
  if (lower.includes("airbag")) return Shield;
  if (lower.includes("abs") || lower.includes("rem")) return ShieldCheck;
  if (lower.includes("power steering") || lower.includes("steering"))
    return Settings;
  if (lower.includes("cruise")) return Gauge;
  if (lower.includes("bluetooth")) return Bluetooth;
  if (lower.includes("gps") || lower.includes("navigasi")) return MapPin;
  if (
    lower.includes("kamera") ||
    lower.includes("camera") ||
    lower.includes("backup")
  )
    return Camera;
  return CheckCircle;
}

type RentalType = "self_drive" | "with_driver";

export default function CarsDetailsInteractive({ car }: { car: CarDetails }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: accountKeys.profile(),
    queryFn: getProfile,
    enabled: !!user,
  });
  const availableColors = car.colors ?? [];
  const firstRentalType =
    (car.car_pricings?.[0]?.type as RentalType | undefined) ??
    (car.rental_type === "with_driver" ? "with_driver" : "self_drive");
  const firstColor = availableColors[0] ?? null;

  const [selectedType, setSelectedType] = useState<RentalType>(firstRentalType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(firstColor);
  const [fullName, setFullName] = useState<string | null>(null);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const defaultFullName = String(profile?.full_name ?? "").trim();
  const defaultWhatsAppNumber = String(profile?.phone ?? "").trim();

  const getPriceForType = (type: RentalType): number => {
    const fromPricings = car.car_pricings?.find(
      (p) => p.type === type,
    )?.price_per_day;

    if (fromPricings != null) {
      return fromPricings;
    }

    if (type === "with_driver" && car.price_with_driver_per_day != null) {
      return car.price_with_driver_per_day;
    }

    return car.price_per_day;
  };

  const pricePerDay = getPriceForType(selectedType);

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(pricePerDay),
    [pricePerDay],
  );

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    if (end < start) return 0;
    const diffDays =
      Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    return Math.max(0, diffDays);
  }, [startDate, endDate]);

  const formattedTotalEstimate = useMemo(() => {
    const total = (totalDays || 0) * pricePerDay;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(total);
  }, [totalDays, pricePerDay]);

  const selectedTypeLabel =
    selectedType === "with_driver" ? "Sewa Dengan Supir" : "Sewa Lepas Kunci";

  const handleOpenBookingModal = () => {
    if (!user) {
      const signinUrl = `/signin?redirect=${encodeURIComponent(pathname ?? "/")}`;
      window.location.href = signinUrl;
      return;
    }
    // Belum isi customer_profiles atau belum terverifikasi → arahkan ke edit profil
    if (!profile || !profile.is_verified) {
      const editUrl = `/profile/edit-profile?redirect=${encodeURIComponent(pathname ?? "/")}`;
      window.location.href = editUrl;
      return;
    }
    setIsModalOpen(true);
  };

  const createBookingMutation = useCreateBookingMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customerPhone = String(
      whatsAppNumber ?? defaultWhatsAppNumber ?? "",
    ).trim();

    createBookingMutation
      .mutateAsync({
        car_id: car.id,
        rental_type: selectedType,
        customer_profile_id: profile?.id ?? null,
        // FE menyimpan warna sebagai nama → backend akan resolve
        color: selectedColor,
        start_date: startDate,
        end_date: endDate,
        notes: notes?.trim() || null,
      })
      .then((data) => {
        setIsModalOpen(false);
        if (customerPhone) {
          const messageLines = [
            `Halo ${
              (fullName ?? defaultFullName ?? "").trim() || "Customer"
            }, terima kasih sudah melakukan pemesanan di Space Digitalia Rent Car 🚗`,
            "",
            `Detail Booking:`,
            `• Mobil: ${car.name}`,
            `• Tipe: ${selectedTypeLabel}`,
            `• Tanggal: ${startDate} s/d ${endDate}`,
            `• Total estimasi: ${formattedTotalEstimate.replace(",00", "")}`,
            `• Catatan: ${notes?.trim() || "-"}`,
            "",
            `Tim admin kami akan menghubungi Anda untuk konfirmasi lebih lanjut.`,
            `Lacak status booking: ${window.location.origin}/lacak-pemesanan/${data.id}`,
          ];
          const text = messageLines.join("\n");

          // Kirim WhatsApp ke customer (non-blocking, abaikan error di UI)
          void fetch("/api/whatsapp/send", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              to: customerPhone,
              text,
            }),
          }).catch((err) => {
            console.error(
              "Gagal mengirim notifikasi WhatsApp ke customer",
              err,
            );
          });
        }
        router.push(`/lacak-pemesanan/${data.id}`);
      });
  };

  return (
    <>
      {/* Rental type toggle + price */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-[#FF9500] rounded-lg text-xs font-black uppercase tracking-wider">
        {car.status}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight wrap-break-word">
        {car.name}
      </h1>

      {/* Fasilitas Mobil */}
      <div className="space-y-3">
        {(car.facilities ?? []).length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {(car.facilities ?? []).map((facility) => {
              const Icon = getFacilityIcon(facility);
              return (
                <li
                  key={facility}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-bold text-gray-700"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white text-[#FF9500] shadow-sm">
                    <Icon className="w-4 h-4" />
                  </span>
                  {facility}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="content-placeholder-box text-sm">
            Detail fitur dan fasilitas keamanan akan ditampilkan di sini.
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-6">
        <div>
          <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">
            Pilih Tipe Rental
          </span>
          <div className="p-1.5 bg-gray-100 rounded-2xl flex">
            <button
              type="button"
              onClick={() => setSelectedType("self_drive")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all ${
                selectedType === "self_drive"
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-500 hover:text-[#1a1a1a]"
              }`}
            >
              <Car className="w-4 h-4" />
              Lepas Kunci
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("with_driver")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all ${
                selectedType === "with_driver"
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-500 hover:text-[#1a1a1a]"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Dengan Supir
            </button>
          </div>
        </div>

        <div>
          <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">
            Pilih Warna
          </span>
          {availableColors.length > 0 ? (
            <div className="p-1.5 bg-gray-100 rounded-2xl flex flex-wrap gap-1.5">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.5rem)] md:basis-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all whitespace-nowrap ${
                    selectedColor === color
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-500 hover:text-[#1a1a1a] bg-white"
                  }`}
                >
                  <Palette className="w-4 h-4 shrink-0" />
                  {color}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-3 px-4 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium">
              Tidak ada pilihan warna
            </div>
          )}
        </div>

        <div className="gap-4 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">
              Harga Sewa
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-[#FF9500]">
                {formattedPrice.replace(",00", "")}
              </span>
              <span className="text-gray-400 font-bold">/hari</span>
            </div>
          </div>

          <HoverCard openDelay={150}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                aria-label="Lihat deskripsi mobil"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF9500] shadow-sm shrink-0 hover:bg-gray-50 transition-colors"
              >
                <Info className="w-6 h-6" aria-hidden />
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              align="end"
              side="top"
              className="w-80 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
            >
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Deskripsi
                </div>
                <div className="text-sm font-medium text-gray-700 leading-relaxed">
                  {car.description?.trim()
                    ? car.description
                    : "Belum ada deskripsi untuk mobil ini."}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* CTA + Modal trigger */}
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-6 sm:p-8 md:p-12 text-white space-y-6 sm:space-y-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF9500]/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black">
            Siap Untuk Berangkat?
          </h3>
          <p className="text-gray-400 font-medium">
            Pesan sekarang dan nikmati perjalanan dengan unit {car.name}.
          </p>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={handleOpenBookingModal}
            className="flex-1 bg-[#1a1a1a] text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg btn-hover-scale border border-white/10 shadow-xl flex items-center justify-center gap-3"
          >
            Booking via Form
            <ClipboardList className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
            aria-label="Tutup modal booking"
          />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-modal-in">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#1a1a1a] transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black mb-1">Booking Form</h3>
                <p className="text-[#FF9500] font-bold text-sm uppercase tracking-widest">
                  {selectedTypeLabel}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: John Doe"
                    className="form-input text-sm font-medium placeholder:text-gray-400"
                    value={fullName ?? defaultFullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Nomor HP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    className="form-input text-sm font-medium placeholder:text-gray-400"
                    value={whatsAppNumber ?? defaultWhatsAppNumber}
                    onChange={(e) => setWhatsAppNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      required
                      className="form-input text-sm font-medium"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      required
                      className="form-input text-sm font-medium"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Catatan Tambahan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Lokasi penjemputan, dll..."
                    className="form-input text-sm font-medium placeholder:text-gray-400 resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="p-5 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-gray-400">
                    Total Estimasi
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#FF9500]">
                      {formattedTotalEstimate.replace(",00", "")}
                    </div>
                    <div className="text-xs text-gray-400 font-bold">
                      {totalDays > 0
                        ? `${totalDays} hari × ${formattedPrice.replace(",00", "")}/hari`
                        : `${formattedPrice.replace(",00", "")}/hari`}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createBookingMutation.isPending}
                  className="w-full bg-[#FF9500] text-white py-5 rounded-2xl font-black text-lg btn-hover-scale shadow-2xl shadow-orange-900/40"
                >
                  {createBookingMutation.isPending
                    ? "Memproses..."
                    : "Konfirmasi Pesanan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
