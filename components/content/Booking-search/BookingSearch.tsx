import { Calendar, Search } from "lucide-react";

export default function BookingSearch() {
  return (
    <div className="mx-auto px-6 w-full max-w-5xl pt-6">
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
  );
}
