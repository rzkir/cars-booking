"use client";

import Image from "next/image";

import Link from "next/link";

import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Calendar,
  ChevronRight,
  Cog,
  Fuel,
  Palette,
  Star,
  Users,
} from "lucide-react";

import CarsDetailsInteractive from "./CarsDetailsInteractive";
import PriviewModal from "./PriviewModal";

export default function CarsDetails({ car }: { car: CarDetails }) {
  const tabsId = useId();
  const [activeTab, setActiveTab] = useState<
    "spesifikasi" | "konten" | "ulasan"
  >("konten");

  const images = [...(car.car_images ?? [])].sort(
    (a, b) => a.position - b.position,
  );

  const primaryImage = images[0] ?? null;
  const defaultActiveImageId = primaryImage?.id ?? null;
  const [activeImageId, setActiveImageId] = useState<string | number | null>(
    defaultActiveImageId,
  );

  useEffect(() => {
    setActiveImageId(defaultActiveImageId);
  }, [defaultActiveImageId]);

  const activeImage =
    images.find((image) => image.id === activeImageId) ?? primaryImage;
  const thumbnailImages = images.slice(0, 4);
  const extraImagesCount = Math.max(images.length - 4, 0);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openPreviewById = (id: string | number) => {
    const nextIndex = images.findIndex((image) => image.id === id);
    setPreviewIndex(nextIndex >= 0 ? nextIndex : 0);
    setIsPreviewOpen(true);
  };

  return (
    <main className="bg-white min-h-screen pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 overflow-x-auto text-sm font-medium text-gray-400 whitespace-nowrap sm:mb-8">
          <Link
            href="/"
            id="breadcrumb-home"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Beranda
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
          <Link
            href="/daftar-mobil"
            id="breadcrumb-cars"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Daftar Mobil
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
          <span className="max-w-[60vw] truncate text-[#1a1a1a] sm:max-w-none">
            {car.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Gallery + Reviews */}
          <div className="space-y-4 sm:space-y-6">
            <div className="aspect-4/3 rounded-2xl sm:rounded-[2rem] overflow-hidden bg-gray-100 card-shadow relative">
              {activeImage ? (
                <button
                  type="button"
                  onClick={() => openPreviewById(activeImage.id)}
                  className="group absolute inset-0"
                  aria-label="Lihat preview gambar"
                >
                  <Image
                    src={activeImage.image_url}
                    alt={car.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                  <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    Preview
                  </span>
                </button>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                  Gambar mobil belum tersedia
                </div>
              )}
            </div>

            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {thumbnailImages.map((image, index) => {
                  const isActive = image.id === activeImageId;
                  const isLast =
                    index === thumbnailImages.length - 1 &&
                    extraImagesCount > 0;

                  return (
                    <button
                      key={image.id}
                      type="button"
                      aria-label={`Pilih gambar ${index + 1}`}
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveImageId(image.id);
                      }}
                      className={`relative aspect-square overflow-hidden rounded-xl transition-opacity sm:rounded-2xl ${
                        isActive
                          ? "border-2 border-[#FF9500] ring-4 ring-orange-50"
                          : "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9500]/60 focus-visible:ring-offset-2"
                      }`}
                    >
                      <Image
                        src={image.image_url}
                        alt={`${car.name} thumbnail ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 45vw"
                        className="w-full h-full object-cover"
                      />
                      {isLast && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          +{extraImagesCount}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <PriviewModal
            open={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
            images={images}
            carName={car.name}
            index={previewIndex}
            onIndexChange={setPreviewIndex}
          />

          {/* Right: Details + Interactive Booking */}
          <div className="space-y-6">
            <CarsDetailsInteractive car={car} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 sm:mt-10">
          <div
            role="tablist"
            aria-label="Detail mobil"
            className="flex w-full items-center gap-2 overflow-x-auto rounded-2xl p-2 sm:w-auto"
          >
            <Button
              id={`${tabsId}-tab-konten`}
              type="button"
              role="tab"
              aria-selected={activeTab === "konten"}
              aria-controls={`${tabsId}-panel-konten`}
              onClick={() => setActiveTab("konten")}
              variant="ghost"
              size="default"
              className={`flex-1 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                activeTab === "konten"
                  ? "bg-[#FF9500] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Informasi
            </Button>
            <Button
              id={`${tabsId}-tab-spesifikasi`}
              type="button"
              role="tab"
              aria-selected={activeTab === "spesifikasi"}
              aria-controls={`${tabsId}-panel-spesifikasi`}
              onClick={() => setActiveTab("spesifikasi")}
              variant="ghost"
              size="default"
              className={`flex-1 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                activeTab === "spesifikasi"
                  ? "bg-[#FF9500] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Spesifikasi
            </Button>
            <Button
              id={`${tabsId}-tab-ulasan`}
              type="button"
              role="tab"
              aria-selected={activeTab === "ulasan"}
              aria-controls={`${tabsId}-panel-ulasan`}
              onClick={() => setActiveTab("ulasan")}
              variant="ghost"
              size="default"
              className={`flex-1 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                activeTab === "ulasan"
                  ? "bg-[#FF9500] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Ulasan
            </Button>
          </div>
        </div>

        {/* Panels */}
        <div className="mt-6 sm:mt-8">
          {/* Spesifikasi */}
          <section
            id={`${tabsId}-panel-spesifikasi`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-spesifikasi`}
            hidden={activeTab !== "spesifikasi"}
            className={activeTab === "spesifikasi" ? "space-y-6" : undefined}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-600 shadow-sm">
                  <Users className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kapasitas
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate">
                    {car.capacity} Kursi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-600 shadow-sm">
                  <Cog className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transmisi
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate capitalize">
                    {car.transmission}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-600 shadow-sm">
                  <Fuel className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bahan Bakar
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate capitalize">
                    {car.fuel_type ?? "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-600 shadow-sm">
                  <Calendar className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahun
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate">
                    {car.year ?? "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-gray-600 shadow-sm">
                  <Palette className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warna
                  </p>
                  <p className="text-base font-bold text-gray-900 truncate capitalize">
                    {car.colors?.length
                      ? car.colors.join(", ")
                      : (car.color ?? "—")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Konten */}
          <section
            id={`${tabsId}-panel-konten`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-konten`}
            hidden={activeTab !== "konten"}
          >
            <div className="content-placeholder-box">
              <div className="prose prose-lg max-w-none min-w-0 wrap-break-word">
                <div dangerouslySetInnerHTML={{ __html: car.content ?? "" }} />
              </div>
            </div>
          </section>

          {/* Ulasan */}
          <section
            id={`${tabsId}-panel-ulasan`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-ulasan`}
            hidden={activeTab !== "ulasan"}
          >
            <div className="rounded-[2rem] border border-gray-100 bg-gray-50/50 p-5 sm:p-8">
              <h3 className="text-xl font-black mb-6">Ulasan Pelanggan</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                    alt="Avatar Sari Indah"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="font-bold">Sari Indah</h4>
                      <span className="text-xs text-gray-400 sm:shrink-0">
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
                <div className="flex items-start gap-4">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
                    alt="Avatar Budi Santoso"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="font-bold">Budi Santoso</h4>
                      <span className="text-xs text-gray-400 sm:shrink-0">
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
          </section>
        </div>
      </div>
    </main>
  );
}
