import {
  Calendar,
  MapPin,
  User,
  Search,
  X,
  HelpCircle,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

import { CarCard } from "@/components/ui/card";

import carsData from "@/helper/data/data.json";

export default function Page() {
  return (
    <main className="pt-24 pb-20 bg-[#fcfcfc] min-h-screen flex flex-col">
      {/* Quick Search Bar */}
      <div className="bg-white border-b border-gray-100 py-6 mb-10">
        <div className="container mx-auto px-6">
          <div className="bg-gray-50 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Lokasi
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 rounded-xl py-3 px-10 appearance-none focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm">
                  <option>Jakarta Selatan</option>
                  <option>Jakarta Barat</option>
                  <option>Tangerang</option>
                  <option>Bekasi</option>
                </select>
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Tgl Mulai
              </label>
              <div className="relative">
                <input
                  type="date"
                  defaultValue="2024-05-20"
                  className="w-full bg-white border border-gray-100 rounded-xl py-3 px-10 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Tgl Selesai
              </label>
              <div className="relative">
                <input
                  type="date"
                  defaultValue="2024-05-22"
                  className="w-full bg-white border border-gray-100 rounded-xl py-3 px-10 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Tipe Sewa
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 rounded-xl py-3 px-10 appearance-none focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm">
                  <option>Lepas Kunci</option>
                  <option>Dengan Supir</option>
                </select>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <button className="bg-[#1a1a1a] text-white h-[46px] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95">
              <Search className="w-4 h-4" />
              <span>Perbarui</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black">Filter</h3>
                  <button className="text-xs font-bold text-[#FF9500] hover:underline">
                    Reset
                  </button>
                </div>

                {/* Price Range */}
                <div className="space-y-4 mb-8">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Harga (Rp)
                  </label>
                  <div className="pt-2">
                    <input
                      type="range"
                      min={300000}
                      max={1200000}
                      step={50000}
                      defaultValue={800000}
                      className="w-full accent-[#FF9500]"
                    />
                    <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
                      <span>300k</span>
                      <span>1.2M</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl text-center">
                    <span className="text-sm font-black">Max: Rp 800.000</span>
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-4 mb-8">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Transmisi
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Manual
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Automatic
                      </span>
                    </label>
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Bahan Bakar
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Bensin
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Diesel / Solar
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-200 text-[#FF9500] focus:ring-[#FF9500]"
                      />
                      <span className="text-sm font-medium group-hover:text-black">
                        Listrik
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-white font-black text-xl mb-2">
                    Butuh Bantuan?
                  </h4>
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

            {/* Results Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tight">
                    Hasil Pencarian Mobil
                  </h2>
                  <p className="text-sm text-gray-400 font-medium">
                    Menampilkan 12 armada tersedia di{" "}
                    <span className="text-black font-bold">
                      Jakarta Selatan
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Urutkan:
                  </span>
                  <select className="bg-white border border-gray-100 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-orange-100 outline-none font-bold text-sm">
                    <option>Harga Terendah</option>
                    <option>Harga Tertinggi</option>
                    <option>Terpopuler</option>
                    <option>Terbaru</option>
                  </select>
                </div>
              </div>

              {/* Applied Filters Summary */}
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                  <span>Automatic</span>
                  <button className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#FF9500] rounded-full text-xs font-bold">
                  <span>Rp 300k - 800k</span>
                  <button className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Car Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Pagination */}
              <div className="mt-16 flex flex-col items-center gap-6">
                <button className="px-10 py-4 bg-white border border-gray-100 rounded-2xl font-black text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-all flex items-center gap-3 group">
                  Muat Lebih Banyak
                  <RefreshCw className="group-hover:rotate-180 transition-transform duration-500 w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                  <span className="w-2 h-2 rounded-full bg-gray-200" />
                  <span className="w-2 h-2 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
