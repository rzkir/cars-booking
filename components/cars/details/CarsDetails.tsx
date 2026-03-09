import Image from "next/image";
import Link from "next/link";
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
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
          <Link
            href="/daftar-mobil"
            id="breadcrumb-cars"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Daftar Mobil
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
          <span className="text-[#1a1a1a] truncate">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery + Reviews */}
          <div className="space-y-6">
            <div className="aspect-4/3 rounded-[2rem] overflow-hidden bg-gray-100 card-shadow relative">
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
          </div>

          {/* Right: Details + Interactive Booking */}
          <div className="space-y-6">
            <CarsDetailsInteractive car={car} />
          </div>
        </div>

        {/* Spesifikasi */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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

          <p className="text-xl text-gray-400 font-medium">{car.color}</p>
        </div>

        {/* Content */}
        <div className="content-placeholder-box text-sm pt-2 border-t border-gray-100">
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: car.content ?? "" }}
              className="prose prose-invert max-w-none text-sm md:text-base
                        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 md:[&_p]:mb-4 [&_p:last-child]:mb-0 
                        [&_span]:text-muted-foreground [&_span]:leading-relaxed
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-3 md:[&_h3]:mb-4
                        [&_ol]:list-decimal [&_ol]:pl-4 md:[&_ol]:pl-6 [&_ol]:space-y-1.5 md:[&_ol]:space-y-2 [&_ol]:mb-3 md:[&_ol]:mb-4
                        [&_li]:text-muted-foreground [&_li]:leading-relaxed
                        [&_.ql-ui]:hidden
                        prose-headings:text-foreground
                        prose-strong:text-foreground
                        prose-p:text-muted-foreground
                        prose-li:text-muted-foreground
                        prose-blockquote:text-muted-foreground flex-wrap"
            />
          </div>
        </div>

        {/* Ulasan Pelanggan */}
        <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100">
          <h3 className="text-xl font-black mb-6">Ulasan Pelanggan</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Avatar Sari Indah"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
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
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Avatar Budi Santoso"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
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
                  Kondisi mesin prima untuk perjalanan jauh. AC sangat dingin
                  dan nyaman untuk keluarga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
