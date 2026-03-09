"use client";

import {
  Search as SearchIcon,
  User,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

import {
  CARS_PUBLIC_RENTAL_TYPE_OPTIONS,
  CARS_PUBLIC_PRICE_MAX,
  CARS_PUBLIC_PRICE_MIN,
  CARS_PUBLIC_PRICE_STEP,
} from "@/services/cars.service";

type CarsPublicFiltersState = ReturnType<
  typeof import("@/services/cars.service").useCarsPublicFiltersState
>;

export default function Filter({
  filters,
  initialTransmissions,
  initialFuelTypes,
  className,
}: {
  filters: CarsPublicFiltersState;
  initialTransmissions?: Transmission[];
  initialFuelTypes?: FuelType[];
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "w-full lg:w-72 space-y-8 lg:sticky lg:top-20 self-start",
        className,
      )}
    >
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black">Filter</h3>
          <button
            type="button"
            onClick={filters.handleReset}
            className="text-xs font-bold text-[#FF9500] hover:underline"
          >
            Reset
          </button>
        </div>

        {/* Search + Rental Type */}
        <div className="space-y-4 mb-8">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Cari mobil
            </Label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchInput}
                onChange={(e) => filters.setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && filters.handlePerbarui()}
                placeholder="Nama mobil..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-10 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm placeholder:text-gray-400"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Tipe Sewa
            </Label>
            <div className="relative">
              <select
                value={filters.rentalTypeSelect}
                onChange={(e) =>
                  filters.setRentalTypeSelect(
                    e.target
                      .value as (typeof CARS_PUBLIC_RENTAL_TYPE_OPTIONS)[number]["value"],
                  )
                }
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-10 appearance-none focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm"
              >
                {CARS_PUBLIC_RENTAL_TYPE_OPTIONS.map((opt) => (
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
            onClick={filters.handlePerbarui}
            className="bg-[#1a1a1a] text-white h-[46px] w-full rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95"
          >
            <SearchIcon className="w-4 h-4" />
            <span>Perbarui</span>
          </button>
        </div>

        {/* Price Range */}
        <div className="space-y-4 mb-8">
          <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">
            Harga (Rp)
          </Label>
          <div className="pt-2">
            <input
              type="range"
              min={CARS_PUBLIC_PRICE_MIN}
              max={CARS_PUBLIC_PRICE_MAX}
              step={CARS_PUBLIC_PRICE_STEP}
              value={filters.priceMax}
              onChange={(e) => filters.setPriceMax(Number(e.target.value))}
              className="w-full accent-[#FF9500]"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
              <span>300k</span>
              <span>1.2M</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <span className="text-sm font-black">
              Max: Rp {(filters.priceMax / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        {/* Transmission */}
        <div className="space-y-4 mb-8">
          <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">
            Transmisi
          </Label>
          <div className="space-y-2">
            {(initialTransmissions ?? []).map((t) => (
              <Label
                key={t.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.selectedTransmissions.has(t.name)}
                  onCheckedChange={() => filters.toggleTransmission(t.name)}
                  className="size-5 rounded border-gray-200 data-[state=checked]:bg-[#FF9500] data-[state=checked]:border-[#FF9500] focus-visible:ring-[#FF9500]"
                />
                <span className="text-sm font-medium group-hover:text-black capitalize">
                  {t.name}
                </span>
              </Label>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-4">
          <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">
            Bahan Bakar
          </Label>
          <div className="space-y-2">
            {(initialFuelTypes ?? []).map((f) => (
              <Label
                key={f.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.selectedFuelTypes.has(f.name)}
                  onCheckedChange={() => filters.toggleFuelType(f.name)}
                  className="size-5 rounded border-gray-200 data-[state=checked]:bg-[#FF9500] data-[state=checked]:border-[#FF9500] focus-visible:ring-[#FF9500]"
                />
                <span className="text-sm font-medium group-hover:text-black">
                  {f.name}
                </span>
              </Label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-white font-black text-xl mb-2">Butuh Bantuan?</h4>
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
  );
}
