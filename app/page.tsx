import {
  ShieldCheck,
  Calendar,
  Search,
  Wallet,
  Key,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { CarCard } from "@/components/ui/card";

import Image from "next/image";

import carsData from "@/helper/data/data.json";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-36 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF9500] rounded-full font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Terpercaya &amp; Aman di Seluruh Indonesia</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-[#1a1a1a]">
              Sewa Mobil <span className="text-[#FF9500]">Mudah</span> &amp;
              Cepat
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
              Harga terjangkau dengan layanan terpercaya untuk perjalanan Anda
              di dalam maupun luar kota.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#cars"
                id="hero-cta-main"
                className="bg-[#FF9500] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200"
              >
                Lihat Mobil
              </a>
              <div className="flex items-center gap-4 px-6">
                <div className="flex -space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    alt="User"
                    width={64}
                    height={64}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    alt="User"
                    width={64}
                    height={64}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    alt="User"
                    width={64}
                    height={64}
                  />
                </div>
                <span className="text-sm font-bold text-gray-500">
                  +2.4k User Puas
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50/50 rounded-full blur-3xl" />
            <Image
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Car"
              className="w-full h-auto drop-shadow-2xl"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* Booking Search Form */}
      <div className="mx-auto px-6 w-full max-w-5xl">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Tanggal Mulai
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-gray-50 border-none rounded-xl py-4 px-12 focus:ring-2 focus:ring-orange-200 outline-none font-bold text-gray-700"
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Tanggal Selesai
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-gray-50 border-none rounded-xl py-4 px-12 focus:ring-2 focus:ring-orange-200 outline-none font-bold text-gray-700"
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <button className="bg-[#1a1a1a] text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Cari Mobil
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
              <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-3">Harga Terjangkau</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Nikmati tarif kompetitif tanpa biaya tersembunyi. Transparan dan
                hemat di kantong.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
              <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-3">Lepas Kunci / Supir</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Pilihan fleksibel sesuai kebutuhan Anda. Mau nyetir sendiri atau
                dilayani driver profesional.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
              <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-3">Proses Cepat WA</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Booking instan tanpa ribet melalui WhatsApp. Konfirmasi cepat
                dalam hitungan menit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
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
            {carsData.cars.map((car) => (
              <CarCard
                key={car.id}
                image={car.image}
                title={car.title}
                subtitle={car.subtitle}
                price={car.price}
                badge={car.badge}
                transmission={car.transmission}
                fuel={car.fuel}
                slug={car.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto bg-[#1a1a1a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF9500]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Butuh Mobil Sekarang?
            </h2>
            <p className="text-gray-400 text-xl font-medium">
              Hubungi admin kami via WhatsApp untuk booking instan dan
              konsultasi ketersediaan armada.
            </p>
            <div className="pt-6">
              <a
                href="https://wa.me/"
                id="cta-whatsapp-big"
                className="inline-flex items-center gap-3 bg-[#FF9500] text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-orange-900/40"
              >
                <MessageCircle className="w-6 h-6" />
                Chat WhatsApp Sekarang
              </a>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
              Tersedia 24/7 untuk Layanan Darurat
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
