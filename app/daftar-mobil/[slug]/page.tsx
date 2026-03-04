import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  ChevronRight,
  Gauge,
  Info,
  Navigation,
  Settings2,
  Shield,
  Snowflake,
  Users,
  Fuel,
  BatteryCharging,
  Music2,
  Radio,
  Star,
  StarOff,
} from "lucide-react";

import carsData from "@/helper/data/data.json";

type CarDetailParams = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: CarDetailParams) {
  const car = carsData.cars.find((c) => c.slug === params.slug);
  const detail = carsData.cars_details.find((d) => d.slug === params.slug);

  if (!car || !detail) {
    return (
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <p className="text-lg font-bold text-gray-500">
            Mobil tidak ditemukan.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-8">
          <Link
            href="/"
            id="breadcrumb-home"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/daftar-mobil"
            id="breadcrumb-cars"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            Daftar Mobil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1a1a1a]">{detail.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery & Reviews */}
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
              <Image
                src={detail.heroImage}
                alt={detail.name}
                width={1200}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {detail.gallery.slice(0, 3).map((thumb, index) => (
                <button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden border border-gray-200 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={thumb}
                    alt={`${detail.name} thumb ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {detail.gallery[3] && (
                <button className="relative aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-opacity">
                  <Image
                    src={detail.gallery[3]}
                    alt={`${detail.name} thumb`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg">
                    +5
                  </div>
                </button>
              )}
            </div>

            {/* Reviews */}
            <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100">
              <h3 className="text-xl font-black mb-6">Ulasan Pelanggan</h3>
              <div className="space-y-6">
                {detail.reviews.map((review) => (
                  <div key={review.name} className="flex gap-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold">{review.name}</h4>
                        <span className="text-xs text-gray-400">
                          {review.timeAgo}
                        </span>
                      </div>
                      <div className="flex text-[#FF9500] text-sm">
                        {Array.from({ length: 5 }).map((_, i) =>
                          i < review.rating ? (
                            <Star key={i} className="w-4 h-4 fill-[#FF9500]" />
                          ) : (
                            <StarOff key={i} className="w-4 h-4" />
                          )
                        )}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed italic">
                        &quot;{review.text}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details & Booking */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              {detail.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-[#FF9500] rounded-lg text-xs font-black uppercase tracking-wider mb-4">
                  {detail.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                {detail.name}
              </h1>
              <p className="text-xl text-gray-400 font-medium">
                {detail.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="p-6 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
              <div className="space-y-1">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                  Harga Sewa
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#FF9500]">
                    {detail.pricePerDay}
                  </span>
                  <span className="text-gray-400 font-bold">
                    {detail.priceLabel}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF9500] shadow-sm">
                <Info className="w-6 h-6" />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SpecCard
                icon={Settings2}
                label="Transmisi"
                value={detail.transmission}
              />
              <SpecCard icon={Users} label="Kapasitas" value={detail.capacity} />
              <SpecCard icon={Fuel} label="Bahan Bakar" value={detail.fuel} />
              <SpecCard icon={Calendar} label="Tahun" value={detail.year} />
              <SpecCard icon={Gauge} label="Mileage" value={detail.mileage} />
              <SpecCard
                icon={Shield}
                label="Asuransi"
                value={detail.insurance}
              />
            </div>

            {/* Facilities */}
            <div className="space-y-4">
              <h3 className="text-xl font-black">Fasilitas &amp; Fitur</h3>
              <div className="flex flex-wrap gap-3">
                {detail.facilities.map((facility) => {
                  const icon =
                    facility === "AC Dingin"
                      ? Snowflake
                      : facility === "Audio System"
                      ? Music2
                      : facility === "Bluetooth"
                      ? Radio
                      : facility === "USB Charger"
                      ? BatteryCharging
                      : Navigation;

                  const IconComp = icon;

                  return (
                    <div
                      key={facility}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-600 text-sm"
                    >
                      <IconComp className="w-4 h-4 text-orange-400" />
                      {facility}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black">Formulir Booking</h3>
                <p className="text-gray-400 text-sm font-medium">
                  Isi data untuk konfirmasi ketersediaan unit
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Nama Lengkap"
                    placeholder="Contoh: Budi Santoso"
                  />
                  <FormField
                    label="Nomor WhatsApp"
                    placeholder="0812-xxxx-xxxx"
                    type="tel"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Tanggal Mulai" type="date" />
                  <FormField label="Tanggal Selesai" type="date" />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full outline-none focus:border-[#FF9500] focus:ring-2 focus:ring-orange-100 resize-none h-24 text-sm"
                    placeholder="Contoh: Ingin diantar ke Bandara Soekarno Hatta"
                  />
                </div>

                <button
                  type="button"
                  id="booking-submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all"
                >
                  Lanjutkan Pemesanan
                </button>

                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="h-[1px] flex-1 bg-gray-100" />
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                    Atau via WA Langsung
                  </span>
                  <div className="h-[1px] flex-1 bg-gray-100" />
                </div>

                <a
                  href="https://wa.me/"
                  id="whatsapp-direct"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all"
                >
                  Booking via WhatsApp
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

type SpecCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
};

function SpecCard({ icon: Icon, label, value }: SpecCardProps) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center text-center gap-2">
      <Icon className="text-gray-400 w-6 h-6" />
      <span className="text-xs font-bold text-gray-400 uppercase">
        {label}
      </span>
      <span className="font-black">{value}</span>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

function FormField({ label, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div>
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full outline-none focus:border-[#FF9500] focus:ring-2 focus:ring-orange-100 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
