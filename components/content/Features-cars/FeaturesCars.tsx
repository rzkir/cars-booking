import { ArrowRight } from "lucide-react";

import { CarCard } from "@/components/ui/cars/card";

export default function FeaturesCars({ cars }: { cars: CarListItem[] }) {
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Mobil Pilihan Kami
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              Koleksi mobil terbaik untuk kenyamanan perjalanan Anda
            </p>
          </div>
          <a
            href="#"
            id="view-all-cars"
            className="text-[#FF9500] font-bold flex items-center gap-2 group"
          >
            Lihat Semua Mobil
            <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              image={car.car_images?.image_url ?? ""}
              title={car.name}
              subtitle={`${car.capacity} Kursi • ${
                car.rental_type === "with_driver"
                  ? "Dengan Sopir"
                  : "Lepas Kunci"
              }`}
              price={car.price_per_day.toString()}
              status={car.status}
              transmission={car.transmission}
              fuel={car.fuel_type ?? ""}
              slug={car.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
