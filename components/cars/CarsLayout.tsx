"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search as SearchIcon,
  User,
  X,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import CarsGridWithLoadMore from "./CarsGridWithLoadMore";

const RENTAL_TYPE_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "self_drive", label: "Lepas Kunci" },
  { value: "with_driver", label: "Dengan Supir" },
] as const;

export default function CarsLayout({
  initialCarsData,
  initialSearch,
  initialRentalType,
}: {
  initialCarsData: CarsListResponse;
  initialSearch?: string;
  initialRentalType?: "self_drive" | "with_driver";
}) {
  const [searchInput, setSearchInput] = useState(initialSearch ?? "");
  const [appliedSearch, setAppliedSearch] = useState(initialSearch ?? "");
  const [rentalTypeSelect, setRentalTypeSelect] =
    useState<(typeof RENTAL_TYPE_OPTIONS)[number]["value"]>(
      initialRentalType ?? "all",
    );
  const [appliedRentalType, setAppliedRentalType] = useState<
    "all" | "self_drive" | "with_driver"
  >(initialRentalType ?? "all");

  const router = useRouter();
  const pathname = usePathname();

  const updateUrl = (search: string, rentalType: "all" | "self_drive" | "with_driver") => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (rentalType && rentalType !== "all") params.set("rental_type", rentalType);
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    router.replace(url, { scroll: false });
  };

  const handlePerbarui = () => {
    const normalizedSearch = searchInput.trim().replace(/\s+/g, " ");
    setSearchInput(normalizedSearch);
    setAppliedSearch(normalizedSearch);
    setAppliedRentalType(rentalTypeSelect);
    updateUrl(normalizedSearch, rentalTypeSelect);
  };
  return (
    <main className="pt-24 pb-20 bg-[#fcfcfc] min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-1">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 space-y-8">
              {/* Search + Rental Type */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-black mb-6">Pencarian</h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Cari mobil
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePerbarui()}
                        placeholder="Nama mobil..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-10 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm placeholder:text-gray-400"
                      />
                      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Tipe Sewa
                    </label>
                    <div className="relative">
                      <select
                        value={rentalTypeSelect}
                        onChange={(e) =>
                          setRentalTypeSelect(
                            e.target
                              .value as (typeof RENTAL_TYPE_OPTIONS)[number]["value"],
                          )
                        }
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-10 appearance-none focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm"
                      >
                        {RENTAL_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePerbarui}
                    className="bg-[#1a1a1a] text-white h-[46px] w-full rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95"
                  >
                    <SearchIcon className="w-4 h-4" />
                    <span>Perbarui</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black">Filter</h3>
                  <button className="text-xs font-bold text-[#FF9500] hover:underline">
                    Reset
                  </button>
                </div>

                {/* Price Range */}
                <div className="space-y-4 mb-8">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Harga (Rp)
                  </label>
                  <div className="pt-2">
                    <input
                      type="range"
                      min={300000}
                      max={1200000}
                      step={50000}
                      defaultValue={800000}
                      className="w-full accent-[#FF9500]"
                    />
                    <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
                      <span>300k</span>
                      <span>1.2M</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl text-center">
                    <span className="text-sm font-black">Max: Rp 800.000</span>
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-4 mb-8">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Transmisi
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Manual
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Automatic
                      </span>
                    </label>
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Bahan Bakar
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Bensin
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Diesel / Solar
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Listrik
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-white font-black text-xl mb-2">
                    Butuh Bantuan?
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Konsultasi gratis ketersediaan unit via WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/"
                    className="bg-white text-black w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FF9500] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat Admin
                  </a>
                </div>
                <HelpCircle className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
              </div>
            </aside>

            {/* Results Content */}
            <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">
                  Hasil Pencarian Mobil
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                  Menampilkan armada{" "}
                  {appliedRentalType !== "all" && (
                    <span className="text-black font-bold">
                      {appliedRentalType === "self_drive"
                        ? "Lepas Kunci"
                        : "Dengan Supir"}{" "}
                    </span>
                  )}
                  tersedia
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Urutkan:
                </span>
                <select className="bg-white border border-gray-100 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm">
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Terpopuler</option>
                  <option>Terbaru</option>
                </select>
              </div>
            </div>

            {/* Applied Filters Summary */}
            <div className="flex flex-wrap gap-2 mb-8">
              {appliedSearch && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                  <span>&quot;{appliedSearch}&quot;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setAppliedSearch("");
                      updateUrl("", appliedRentalType);
                    }}
                    className="hover:text-black"
                    aria-label="Hapus filter pencarian"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {appliedRentalType !== "all" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                  <span>
                    {appliedRentalType === "self_drive"
                      ? "Lepas Kunci"
                      : "Dengan Supir"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedRentalType("all");
                      setRentalTypeSelect("all");
                      updateUrl(appliedSearch, "all");
                    }}
                    className="hover:text-black"
                    aria-label="Hapus filter Tipe Sewa"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Car Grid + Load More */}
            <CarsGridWithLoadMore
              initialData={initialCarsData}
              search={appliedSearch || undefined}
              rentalType={
                appliedRentalType === "all" ? undefined : appliedRentalType
              }
            />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
