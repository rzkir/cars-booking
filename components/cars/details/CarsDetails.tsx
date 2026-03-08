import Image from "next/image";
import Link from "next/link";

import { Star } from "lucide-react";

import CarsDetailsInteractive from "./CarsDetailsInteractive";

export default function CarsDetails({ car }: { car: CarDetails }) {
  const images = [...(car.car_images ?? [])].sort(
    (a, b) => a.position - b.position,
  );

  const primaryImage = images[0] ?? null;
  const thumbnailImages = images.slice(0, 4);
  const extraImagesCount = Math.max(images.length - 4, 0);

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-8">
          <Link
            href="/"
            id="breadcrumb-home"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Beranda
          </Link>
          <span className="text-xs">/</span>
          <Link
            href="/daftar-mobil"
            id="breadcrumb-cars"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Daftar Mobil
          </Link>
          <span className="text-xs">/</span>
          <span className="text-[#1a1a1a]">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery + Reviews */}
          <div className="space-y-6">
            <div className="aspect-4/3 rounded-[2rem] overflow-hidden bg-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative">
              {primaryImage ? (
                <Image
                  src={primaryImage.image_url}
                  alt={car.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                  Gambar mobil belum tersedia
                </div>
              )}
            </div>

            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {thumbnailImages.map((image, index) => {
                  const isFirst = index === 0;
                  const isLast =
                    index === thumbnailImages.length - 1 &&
                    extraImagesCount > 0;

                  return (
                    <button
                      key={image.id}
                      type="button"
                      className={`relative aspect-square rounded-2xl overflow-hidden transition-opacity ${
                        isFirst
                          ? "border-2 border-[#FF9500] ring-4 ring-orange-50"
                          : "hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={image.image_url}
                        alt={`${car.name} thumbnail ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 12vw, 24vw"
                        className="w-full h-full object-cover"
                      />
                      {isLast && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg">
                          +{extraImagesCount}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Spesifikasi Teknis placeholder */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] space-y-4">
              <h3 className="text-2xl font-black">Spesifikasi Teknis</h3>
              <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-500 font-medium leading-relaxed">
                Detail spesifikasi teknis mobil akan ditampilkan di sini. Saat
                ini data yang tersedia:{" "}
                <span className="font-semibold text-gray-700">
                  {car.capacity} kursi
                </span>
                {car.fuel_type && (
                  <>
                    , bahan bakar{" "}
                    <span className="font-semibold text-gray-700">
                      {car.fuel_type}
                    </span>
                  </>
                )}
                {car.year && (
                  <>
                    , tahun{" "}
                    <span className="font-semibold text-gray-700">
                      {car.year}
                    </span>
                  </>
                )}
                .
              </div>
            </div>

            {/* Customer Reviews (static sample, for visual design) */}
            <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100">
              <h3 className="text-xl font-black mb-6">Ulasan Pelanggan</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    SI
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">Sari Indah</h4>
                      <span className="text-xs text-gray-400">
                        2 hari yang lalu
                      </span>
                    </div>
                    <div className="flex text-[#FF9500] text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF9500]" />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed italic">
                      Mobil sangat bersih dan terawat. Pelayanan admin lewat WA
                      sangat cepat dan membantu. Sangat recommended!
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    BS
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">Budi Santoso</h4>
                      <span className="text-xs text-gray-400">
                        1 minggu yang lalu
                      </span>
                    </div>
                    <div className="flex text-[#FF9500] text-sm">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF9500]" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed italic">
                      Kondisi mesin prima untuk perjalanan jauh. AC sangat
                      dingin dan nyaman untuk keluarga.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details + Interactive Booking */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-[#FF9500] rounded-lg text-xs font-black uppercase tracking-wider mb-4">
                Terpopuler
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                {car.name}
              </h1>
              <p className="text-xl text-gray-400 font-medium">
                {car.capacity} Kursi • {car.transmission}
              </p>
              <div className="mt-4 p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-500 font-medium leading-relaxed max-w-xl">
                {car.description
                  ? car.description
                  : "Deskripsi detail mobil akan ditampilkan di sini. Jelaskan keunggulan, kenyamanan, dan fitur utama unit ini."}
              </div>
            </div>

            <CarsDetailsInteractive car={car} />
          </div>
        </div>
      </div>
    </main>
  );
}
