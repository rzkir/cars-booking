"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  Car,
  Filter,
  HelpCircle,
  Link2,
  Search,
} from "lucide-react";

import { CarCard } from "@/components/ui/cars/card";

import { fetchCars } from "@/lib/useCars";

export default function CarsNotFound() {
  const [cars, setCars] = useState<CarListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchCars({ page: 1, pageSize: 3 });
        if (!isMounted) return;
        setCars(data?.data ?? []);
      } catch {
        if (!isMounted) return;
        setCars([]);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasSuggestions = !isLoading && cars.length > 0;

  return (
    <div className="flex flex-col gap-12">
      {/* 404 hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gray-50 text-center pt-32">
        <div className="relative z-10 px-6 space-y-8">
          <div className="relative inline-block">
            <h1 className="select-none text-[6rem] font-black leading-none tracking-tighter text-gray-200 md:text-[8rem] lg:text-[10rem]">
              404
            </h1>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-4 md:pt-6">
              <div className="relative">
                <div className="inline-flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                  <Car className="h-16 w-16 text-[#FF9500] md:h-20 md:w-20 lg:h-24 lg:w-24" />
                </div>
                <div className="absolute -top-2 -right-4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-gray-50 bg-white shadow-lg md:h-11 md:w-11">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-xl space-y-4">
            <h2 className="text-2xl font-black tracking-tight md:text-3xl lg:text-4xl">
              Mobil Tidak Ditemukan
            </h2>
            <p className="text-sm font-medium leading-relaxed text-gray-500 md:text-base">
              Maaf, mobil yang Anda cari tidak tersedia atau mungkin sudah
              dihapus dari katalog kami. Mari bantu Anda menemukan armada lain
              yang serupa.
            </p>
          </div>
        </div>
      </section>

      {/* Tips section */}
      <section className="rounded-3xl bg-white py-12 shadow-sm ring-1 ring-gray-100 md:py-14">
        <div className="mx-auto container px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Link2 className="h-8 w-8" />,
                title: "Periksa Kembali URL",
                desc: "Pastikan alamat tautan yang Anda masukkan sudah benar.",
              },
              {
                icon: <Search className="h-8 w-8" />,
                title: "Gunakan Pencarian",
                desc: "Coba cari dengan kata kunci merek atau model yang berbeda.",
              },
              {
                icon: <Filter className="h-8 w-8" />,
                title: "Jelajahi Kategori",
                desc: "Filter berdasarkan kelas mobil untuk menemukan pilihan lain.",
              },
              {
                icon: <HelpCircle className="h-8 w-8" />,
                title: "Hubungi Support",
                desc: "Tim kami siap membantu Anda mencarikan unit terbaik.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-[2rem] border border-gray-100 bg-gray-50 p-8 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm transition-all group-hover:bg-[#FF9500] group-hover:text-white">
                  {item.icon}
                </div>
                <h4 className="mb-2 text-lg font-black">{item.title}</h4>
                <p className="text-sm font-semibold text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestions section */}
      <section className="rounded-3xl bg-gray-50 py-12 md:py-16">
        <div className="mx-auto container px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FF9500]">
                Alternatif Terbaik
              </h2>
              <h3 className="text-2xl	font-black tracking-tight md:text-3xl">
                Mungkin Anda Menyukai Ini
              </h3>
            </div>
            <Link
              href="/daftar-mobil"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-[#FF9500]"
            >
              Lihat Semua Katalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {hasSuggestions ? (
            <div className="grid gap-6 md:grid-cols-3">
              {cars.map((car) => {
                const primaryImage =
                  car.car_images && "image_url" in car.car_images
                    ? car.car_images.image_url
                    : "/placeholder-car.png";

                const subtitle = `${car.capacity} Kursi • ${
                  car.rental_type === "with_driver"
                    ? "Dengan Supir"
                    : "Lepas Kunci"
                }`;

                const fuelLabel = car.fuel_type ?? "—";

                return (
                  <CarCard
                    key={car.id}
                    image={primaryImage}
                    title={car.name}
                    subtitle={subtitle}
                    price={car.price_per_day.toString()}
                    transmission={car.transmission}
                    fuel={fuelLabel}
                    status="Rekomendasi"
                    slug={car.slug}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-6 text-center text-sm font-semibold text-gray-400">
              {!isLoading
                ? "Belum ada rekomendasi mobil yang dapat ditampilkan saat ini."
                : "Mengambil rekomendasi mobil untuk Anda..."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
