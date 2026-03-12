"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowRight, Hash, QrCode } from "lucide-react";

export default function LacakSearchForm() {
  const router = useRouter();
  const [id, setId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = id.trim();
    if (trimmed) {
      router.push(`/lacak-pemesanan/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 w-full relative group">
          <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-[#FF9500] transition-colors" />
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Contoh: booking-id-atau-pending"
            className="w-full pl-16 pr-6 py-6 rounded-[1.5rem] bg-gray-50/50 border-none outline-none font-black text-lg focus:bg-white transition-all"
          />
        </div>

        <div className="flex w-full md:w-auto gap-2 px-2 pb-2 md:p-0">
          <button
            id="btn-scan-qr"
            type="button"
            className="h-[70px] px-6 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <QrCode className="w-6 h-6" />
          </button>

          <button
            id="btn-track-submit"
            type="submit"
            disabled={!id.trim()}
            className="flex-1 h-[70px] px-10 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cari Status
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
