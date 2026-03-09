"use client";

import { useMemo, useState } from "react";

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

/** Map facility name (lowercase) to Lucide icon component */
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

const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "6281234567890";

type RentalType = "self_drive" | "with_driver";

/** Map facility name (lowercase) to Lucide icon component */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CarsDetailsInteractive({ car }: { car: CarDetails }) {
  const availableColors = car.colors ?? [];
  const firstRentalType =
    (car.car_pricings?.[0]?.type as RentalType | undefined) ??
    (car.rental_type === "with_driver" ? "with_driver" : "self_drive");
  const firstColor = availableColors[0] ?? null;

  const [selectedType, setSelectedType] = useState<RentalType>(firstRentalType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(firstColor);

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

  const selectedTypeLabel =
    selectedType === "with_driver" ? "Sewa Dengan Supir" : "Sewa Lepas Kunci";

  const whatsappMessage = useMemo(() => {
    const priceStr = formattedPrice.replace(",00", "");
    return `Halo, saya tertarik dengan ${car.name} untuk ${selectedTypeLabel} (${priceStr}/hari). Apakah tersedia?`;
  }, [car.name, selectedTypeLabel, formattedPrice]);

  const whatsappHref = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`,
    [whatsappMessage],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
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

          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF9500] shadow-sm shrink-0">
            <Info className="w-6 h-6" aria-hidden />
          </div>
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
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-[#1a1a1a] text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg btn-hover-scale border border-white/10 shadow-xl flex items-center justify-center gap-3"
          >
            Booking via Form
            <ClipboardList className="w-5 h-5" />
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg btn-hover-scale shadow-xl shadow-green-900/20 flex items-center justify-center gap-3"
          >
            Chat WhatsApp
            <WhatsAppIcon className="w-6 h-6" />
          </a>
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
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    className="form-input text-sm font-medium placeholder:text-gray-400"
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
                  />
                </div>

                <div className="p-5 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-gray-400">
                    Total Estimasi
                  </span>
                  <span className="text-2xl font-black text-[#FF9500]">
                    {formattedPrice.replace(",00", "")}
                    <span className="text-xs text-gray-400 font-normal">
                      /hari
                    </span>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF9500] text-white py-5 rounded-2xl font-black text-lg btn-hover-scale shadow-2xl shadow-orange-900/40"
                >
                  Konfirmasi Pesanan
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
