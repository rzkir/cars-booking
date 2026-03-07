"use client";

import { RefreshCw } from "lucide-react";

import { CarCard } from "@/components/ui/cars/card";

import { useInfiniteCarsQuery } from "@/lib/useCarsClient";

type CarsGridWithLoadMoreProps = {
  initialData?: CarsListResponse;
  search?: string;
  rentalType?: "self_drive" | "with_driver";
};

export default function CarsGridWithLoadMore({
  initialData,
  search,
  rentalType,
}: CarsGridWithLoadMoreProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCarsQuery({
      search: search?.trim() || undefined,
      rental_type: rentalType,
      initialData,
    });

  const cars = data?.pages.flatMap((p) => p.data) ?? [];
  const pagination = data?.pages.at(-1)?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.currentPage ?? 1;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            image={car.car_images?.image_url ?? ""}
            title={car.name}
            subtitle={`${car.capacity} Kursi • ${
              car.rental_type === "with_driver" ? "Dengan Sopir" : "Lepas Kunci"
            }`}
            price={car.price_per_day.toString()}
            status={car.status}
            transmission={car.transmission}
            fuel={car.fuel_type ?? ""}
            slug={car.slug}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-10 py-4 bg-white border border-gray-100 rounded-2xl font-black text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-all flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            {isFetchingNextPage ? (
              "Memuat..."
            ) : hasNextPage ? (
              <>
                Muat Lebih Banyak
                <RefreshCw className="group-hover:rotate-180 transition-transform duration-500 w-4 h-4" />
              </>
            ) : (
              "Semua mobil telah dimuat"
            )}
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 === currentPage ? "bg-[#1a1a1a]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
