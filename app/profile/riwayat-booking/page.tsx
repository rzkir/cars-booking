import type { Metadata } from "next";
import Image from "next/image";

import {
  AlertCircle,
  CalendarRange,
  ChevronDown,
  CreditCard,
  ExternalLink,
  MapPin,
  RefreshCw,
  Search,
  Settings2,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Riwayat Booking - DriveEase Indonesia",
  description:
    "Lihat ringkasan profil dan riwayat penyewaan mobil Anda di DriveEase Indonesia.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

export default function Page() {
  return (
    <>
      <div className="space-y-10">
        {/* Filters & Search */}
        <section
          aria-label="Filter dan pencarian riwayat booking"
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <button
              id="filter-all"
              className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-xs font-black uppercase tracking-widest"
              type="button"
            >
              Semua
            </button>
            <button
              id="filter-done"
              className="px-6 py-2.5 bg-white text-gray-400 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#FF9500] hover:text-[#FF9500] transition-all"
              type="button"
            >
              Selesai
            </button>
            <button
              id="filter-pending"
              className="px-6 py-2.5 bg-white text-gray-400 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#FF9500] hover:text-[#FF9500] transition-all"
              type="button"
            >
              Menunggu
            </button>
            <button
              id="filter-cancelled"
              className="px-6 py-2.5 bg-white text-gray-400 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#FF9500] hover:text-[#FF9500] transition-all"
              type="button"
            >
              Dibatalkan
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari ID Booking..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-[#FF9500] transition-all"
              />
            </div>
            <select
              id="sort-booking"
              className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest outline-none appearance-none"
              defaultValue="Terbaru"
            >
              <option>Terbaru</option>
              <option>Terakhir</option>
              <option>Harga Tertinggi</option>
              <option>Harga Terendah</option>
            </select>
          </div>
        </section>

        {/* Booking History List */}
        <section aria-label="Daftar riwayat booking" className="space-y-6">
          {/* Card 1: Finished */}
          <article
            aria-label="Booking selesai Toyota Avanza 2023"
            className={`bg-white rounded-[2rem] ${cardShadow} overflow-hidden group`}
          >
            <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-72 h-48 rounded-[1.5rem] overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
                  alt="Toyota Avanza"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Selesai
                      </span>
                      <span className="text-xs font-black text-gray-300 tracking-widest">
                        #DE-8829410
                      </span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-1">
                      Toyota Avanza 2023
                    </h2>
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-[#FF9500]" />
                      Manual • 7 Kursi • Bensin
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Total Harga
                    </p>
                    <p className="text-2xl font-black text-[#FF9500]">
                      Rp 1.450.000
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                      Penjemputan
                    </p>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                        <CalendarRange className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black">15 Jul 2024, 09:00</p>
                        <p className="text-xs text-gray-400 font-medium italic">
                          Bandara Soekarno-Hatta (CGK)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                      Pengembalian
                    </p>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black">18 Jul 2024, 09:00</p>
                        <p className="text-xs text-gray-400 font-medium italic">
                          Sudirman Central Business District
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-3 shrink-0 pt-4 lg:pt-0">
                <a
                  href="#"
                  id="btn-view-detail-1"
                  className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
                  aria-label="Lihat detail booking"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  id="btn-review-1"
                  type="button"
                  className="flex-1 lg:flex-none px-6 py-3 bg-[#FF9500] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#E68600] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  <Star className="w-4 h-4" />
                  Beri Review
                </button>
                <a
                  href="#"
                  id="btn-reorder-1"
                  className="w-12 h-12 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-xl shadow-black/10"
                  aria-label="Sewa lagi"
                >
                  <RefreshCw className="w-5 h-5" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Pending Payment */}
          <article
            aria-label="Booking menunggu pembayaran Tesla Model 3"
            className={`bg-white rounded-[2rem] ${cardShadow} overflow-hidden group`}
          >
            <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-72 h-48 rounded-[1.5rem] overflow-hidden bg-gray-50 shrink-0 relative">
                <Image
                  src="https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80"
                  alt="Tesla Model 3"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#FF9500] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    Menunggu Bayar
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-black text-gray-300 tracking-widest">
                        #DE-9011234
                      </span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-1">
                      Tesla Model 3 Long Range
                    </h2>
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-[#FF9500]">
                        <Settings2 className="w-3 h-3" />
                      </span>
                      Otomatis • 5 Kursi • Listrik
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Total Harga
                    </p>
                    <p className="text-2xl font-black text-[#FF9500]">
                      Rp 3.600.000
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                      Penjemputan
                    </p>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                        <CalendarRange className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black">20 Ags 2024, 10:00</p>
                        <p className="text-xs text-gray-400 font-medium italic">
                          Senayan City Mall
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                    <AlertCircle className="text-xl text-[#FF9500]" />
                    <p className="text-[10px] font-bold text-orange-800 leading-tight uppercase tracking-wider">
                      Batas waktu pembayaran berakhir dalam{" "}
                      <span className="font-black">01:45:12</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-3 shrink-0 pt-4 lg:pt-0">
                <a
                  href="#"
                  id="btn-view-detail-2"
                  className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1a1a1a] transition-all"
                  aria-label="Lihat detail booking"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  id="btn-pay-now"
                  type="button"
                  className="flex-1 lg:flex-none px-10 py-3 bg-[#1a1a1a] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                >
                  <CreditCard className="w-4 h-4" />
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </article>

          {/* Card 3: Cancelled */}
          <article
            aria-label="Booking dibatalkan BMW X5"
            className={`bg-white rounded-[2rem] ${cardShadow} overflow-hidden group opacity-70 hover:opacity-100 transition-opacity`}
          >
            <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-72 h-48 rounded-[1.5rem] overflow-hidden bg-gray-50 shrink-0 grayscale">
                <Image
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80"
                  alt="BMW X5"
                  width={600}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Dibatalkan
                      </span>
                      <span className="text-xs font-black text-gray-300 tracking-widest">
                        #DE-7721098
                      </span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-1 text-gray-400">
                      BMW X5 xDrive40i
                    </h2>
                    <p className="text-sm text-gray-300 font-medium leading-relaxed">
                      Dibatalkan oleh sistem karena pembayaran tidak diterima.
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest">
                      Total Harga
                    </p>
                    <p className="text-2xl font-black text-gray-300 italic line-through">
                      Rp 7.500.000
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                      Periode Sewa
                    </p>
                    <p className="text-sm font-bold text-gray-400">
                      01 Jun - 05 Jun 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-3 shrink-0 pt-4 lg:pt-0">
                <button
                  id="btn-retry-3"
                  type="button"
                  className="px-8 py-3 bg-gray-50 text-[#1a1a1a] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-100"
                >
                  Cek Ketersediaan
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Load More */}
        <div className="flex justify-center pt-10">
          <button
            id="btn-load-more"
            type="button"
            className="flex flex-col items-center gap-3 group"
          >
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-[#FF9500] transition-colors">
              Tampilkan Lebih Banyak
            </span>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#FF9500] group-hover:bg-orange-50 transition-all">
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#FF9500]" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
