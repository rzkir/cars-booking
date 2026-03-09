"use client";

import { Filter as FilterIcon, X } from "lucide-react";

import {
  useCarsPublicFiltersState,
  CARS_PUBLIC_PRICE_MAX,
} from "@/services/cars.service";

import CarsGridWithLoadMore from "./CarsGridWithLoadMore";

import Filter from "@/components/ui/cars/Filter";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CarsLayout({
  initialCarsData,
  initialSearch,
  initialRentalType,
  initialTransmission,
  initialFuelType,
  initialMaxPrice,
  initialTransmissions = [],
  initialFuelTypes = [],
}: {
  initialCarsData: CarsListResponse;
  initialSearch?: string;
  initialRentalType?: "self_drive" | "with_driver";
  initialTransmission?: string;
  initialFuelType?: string;
  initialMaxPrice?: number;
  initialTransmissions?: Transmission[];
  initialFuelTypes?: FuelType[];
}) {
  const filters = useCarsPublicFiltersState({
    search: initialSearch ?? "",
    rentalType: initialRentalType,
    transmission: initialTransmission,
    fuelType: initialFuelType,
    maxPrice: initialMaxPrice,
  });
  return (
    <main className="py-20 bg-[#fcfcfc] min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-1">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="hidden lg:block">
              <Filter
                filters={filters}
                initialTransmissions={initialTransmissions}
                initialFuelTypes={initialFuelTypes}
              />
            </div>

            {/* Results Content */}
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-black tracking-tight">
                    Hasil Pencarian Mobil
                  </h2>

                  <div className="lg:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center size-10 rounded-xl border border-gray-100 bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
                          aria-label="Buka filter"
                        >
                          <FilterIcon className="size-4" />
                        </button>
                      </SheetTrigger>
                      <SheetContent side="left" className="p-0 overflow-y-auto">
                        <SheetHeader className="border-b">
                          <SheetTitle>Filter</SheetTitle>
                        </SheetHeader>
                        <div className="px-2 pb-2">
                          <Filter
                            filters={filters}
                            initialTransmissions={initialTransmissions}
                            initialFuelTypes={initialFuelTypes}
                            className="w-full space-y-6 self-auto lg:sticky lg:top-auto lg:w-full"
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                <p className="text-sm text-gray-400 font-medium">
                  Menampilkan armada{" "}
                  {filters.appliedRentalType !== "all" && (
                    <span className="text-black font-bold">
                      {filters.appliedRentalType === "self_drive"
                        ? "Lepas Kunci"
                        : "Dengan Supir"}{" "}
                    </span>
                  )}
                  tersedia
                </p>
              </div>

              {/* Applied Filters Summary */}
              <div className="flex flex-wrap gap-2 mb-8">
                {filters.appliedSearch && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                    <span>&quot;{filters.appliedSearch}&quot;</span>
                    <button
                      type="button"
                      onClick={filters.removeSearchFilter}
                      className="hover:text-black"
                      aria-label="Hapus filter pencarian"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.appliedRentalType !== "all" && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                    <span>
                      {filters.appliedRentalType === "self_drive"
                        ? "Lepas Kunci"
                        : "Dengan Supir"}
                    </span>
                    <button
                      type="button"
                      onClick={filters.removeRentalTypeFilter}
                      className="hover:text-black"
                      aria-label="Hapus filter Tipe Sewa"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.appliedTransmissions.size > 0 &&
                  Array.from(filters.appliedTransmissions).map((name) => (
                    <div
                      key={name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold"
                    >
                      <span className="capitalize">{name}</span>
                      <button
                        type="button"
                        onClick={() => filters.removeTransmissionFilter(name)}
                        className="hover:text-black"
                        aria-label={`Hapus filter transmisi ${name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                {filters.appliedFuelTypes.size > 0 &&
                  Array.from(filters.appliedFuelTypes).map((name) => (
                    <div
                      key={name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold"
                    >
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => filters.removeFuelTypeFilter(name)}
                        className="hover:text-black"
                        aria-label={`Hapus filter bahan bakar ${name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                {filters.appliedMaxPrice < CARS_PUBLIC_PRICE_MAX && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                    <span>
                      Max Rp {(filters.appliedMaxPrice / 1000).toFixed(0)}k
                    </span>
                    <button
                      type="button"
                      onClick={filters.removePriceFilter}
                      className="hover:text-black"
                      aria-label="Hapus filter harga"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Car Grid + Load More */}
              <CarsGridWithLoadMore
                initialData={initialCarsData}
                search={filters.appliedSearch || undefined}
                rentalType={
                  filters.appliedRentalType === "all"
                    ? undefined
                    : filters.appliedRentalType
                }
                transmission={
                  filters.appliedTransmissions.size > 0
                    ? Array.from(filters.appliedTransmissions).join(",")
                    : undefined
                }
                fuelType={
                  filters.appliedFuelTypes.size > 0
                    ? Array.from(filters.appliedFuelTypes).join(",")
                    : undefined
                }
                maxPrice={
                  filters.appliedMaxPrice < CARS_PUBLIC_PRICE_MAX
                    ? filters.appliedMaxPrice
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
