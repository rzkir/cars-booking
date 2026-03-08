"use client";

import { useMemo, useState } from "react";

import {
  ArrowRight,
  Car,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";

type RentalType = "self_drive" | "with_driver";

export default function CarsDetailsInteractive({ car }: { car: CarDetails }) {
  const [selectedType, setSelectedType] = useState<RentalType>(
    car.rental_type === "with_driver" ? "with_driver" : "self_drive",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const facilities = car.facilities ?? [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Rental type toggle + price */}
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-6">
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

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">
              Harga Sewa
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#FF9500]">
                {formattedPrice.replace(",00", "")}
              </span>
              <span className="text-gray-400 font-bold">/hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fasilitas & Keamanan */}
      <div className="space-y-6">
        <h3 className="text-xl font-black">Fasilitas &amp; Keamanan</h3>
        {facilities.length > 0 ? (
          <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-600 font-medium leading-relaxed">
            <p className="mb-3">
              Mobil ini dilengkapi dengan fasilitas berikut:
            </p>
            <ul className="flex flex-wrap gap-2">
              {facilities.map((facility) => (
                <li
                  key={facility}
                  className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-700"
                >
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 font-medium leading-relaxed">
            Detail fitur dan fasilitas keamanan akan ditampilkan di sini.
          </div>
        )}
      </div>

      {/* CTA + Modal trigger */}
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 text-white space-y-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF9500]/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-2">
          <h3 className="text-3xl font-black">Siap Untuk Berangkat?</h3>
          <p className="text-gray-400 font-medium">
            Pesan sekarang dan nikmati perjalanan dengan unit {car.name}.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#FF9500] text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-900/40 flex items-center justify-center gap-3 transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Booking Sekarang
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="text-[#FF9500] w-4 h-4" />
            Terpercaya &amp; Aman di Seluruh Indonesia
          </div>
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
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF9500] text-sm font-medium placeholder:text-gray-400"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF9500] text-sm font-medium placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF9500] text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF9500] text-sm font-medium"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF9500] text-sm font-medium placeholder:text-gray-400 resize-none"
                  />
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
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
                  className="w-full bg-[#FF9500] text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-900/40 hover:scale-[1.03] active:scale-95 transition-transform"
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

