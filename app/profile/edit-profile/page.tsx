import type { Metadata } from "next";
import Link from "next/link";

import {
  Award,
  ChevronDown,
  ChevronRight,
  Copy,
  LogOut,
  Save,
  UserCog,
} from "lucide-react";

import { getSession } from "@/hooks/get-session";

export const metadata: Metadata = {
  title: "Edit Profil - DriveEase Indonesia",
  description: "Ubah informasi personal dan data akun DriveEase Indonesia.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const formInputClass =
  "w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none font-bold transition-all focus:border-[#FF9500] focus:bg-white";

export default async function Page() {
  const user = (await getSession())!;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Form */}
        <div className="lg:col-span-8 space-y-8">
          <div
            className={`bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 ${cardShadow}`}
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black flex items-center gap-3">
                <UserCog className="w-6 h-6 text-[#FF9500]" />
                Informasi Personal
              </h3>
              <p className="text-xs font-bold text-gray-400">
                *Data Anda terjamin aman
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name || ""}
                    className={formInputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email || ""}
                    className={formInputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Nomor WhatsApp
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="px-5 py-4 bg-gray-100 rounded-2xl font-black text-gray-400">
                      +62
                    </div>
                    <input
                      type="tel"
                      defaultValue="81298765432"
                      className={`${formInputClass} flex-1`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    defaultValue="1992-05-14"
                    className={formInputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                  Jenis Kelamin
                </label>
                <div className="flex gap-8 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer font-bold group">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#FF9500] transition-colors">
                      <input
                        type="radio"
                        name="gender"
                        defaultChecked
                        className="peer absolute opacity-0 cursor-pointer"
                      />
                      <div className="w-3 h-3 rounded-full bg-[#FF9500] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    Laki-laki
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer font-bold group">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#FF9500] transition-colors">
                      <input
                        type="radio"
                        name="gender"
                        className="peer absolute opacity-0 cursor-pointer"
                      />
                      <div className="w-3 h-3 rounded-full bg-[#FF9500] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    Perempuan
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                  Alamat Lengkap Domisili
                </label>
                <textarea
                  rows={4}
                  defaultValue="Jl. Jenderal Sudirman No. 45, Apartemen Senayan City Tower A No. 12, Jakarta Selatan, 12190"
                  className={`${formInputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Tipe Identitas (ID)
                  </label>
                  <div className="relative">
                    <select
                      className={`${formInputClass} appearance-none cursor-pointer pr-12`}
                    >
                      <option>Kartu Tanda Penduduk (KTP)</option>
                      <option>Passport</option>
                      <option>SIM A</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Nomor Identitas
                  </label>
                  <input
                    type="text"
                    defaultValue="3174123456780001"
                    className={formInputClass}
                  />
                </div>
              </div>

              <div className="pt-10 flex flex-col sm:flex-row gap-4">
                <button
                  id="btn-save-profile-form"
                  type="submit"
                  className="px-10 py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <Save className="w-5 h-5" />
                  Simpan Perubahan
                </button>
                <Link
                  href="/profile"
                  id="btn-cancel-profile-form"
                  className="px-10 py-5 bg-white text-gray-400 rounded-2xl font-black text-sm hover:text-gray-600 border border-transparent hover:border-gray-100 transition-all text-center"
                >
                  Batalkan
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* DriveEase Loyalty */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF9500]/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[10px] font-black text-[#FF9500] uppercase tracking-[0.2em]">
                    DriveEase Loyalty
                  </h4>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#FF9500]" />
                  </div>
                </div>
                <p className="text-4xl font-black">
                  2,450{" "}
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">
                    Poin
                  </span>
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status Membership
                  </span>
                  <span className="text-xs font-black text-[#FF9500] uppercase tracking-widest">
                    Gold
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                  <div className="w-3/4 h-full bg-[#FF9500] rounded-full relative shadow-[0_0_15px_rgba(255,149,0,0.5)]" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  Dapatkan 550 poin lagi untuk membuka status{" "}
                  <span className="text-white">Platinum Member</span>
                </p>
              </div>
              <button
                id="sidebar-btn-redeem"
                type="button"
                className="w-full py-4 bg-white text-[#1a1a1a] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF9500] hover:text-white transition-all shadow-lg"
              >
                Tukar Reward Poin
              </button>
            </div>
          </div>

          {/* Kode Referral */}
          <div className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
              Kode Referral Anda
            </h4>
            <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 text-center space-y-4 group cursor-pointer hover:bg-white hover:border-[#FF9500] transition-all">
              <p className="text-2xl font-black tracking-widest group-hover:text-[#FF9500] transition-colors">
                DRIVE-RIZKY-99
              </p>
              <button
                id="sidebar-btn-copy-ref"
                type="button"
                className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 group-hover:text-[#FF9500] uppercase tracking-widest transition-colors"
              >
                <Copy className="w-4 h-4" />
                Klik Untuk Salin
              </button>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-6 leading-relaxed text-center">
              Bagikan kode ini ke kolega Anda dan dapatkan saldo kredit{" "}
              <span className="text-[#1a1a1a] font-bold">Rp 100rb</span> untuk
              setiap sewa pertama mereka.
            </p>
          </div>

          {/* Bantuan & Dukungan */}
          <div className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow} space-y-6`}>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
              Bantuan & Dukungan
            </h4>
            <div className="space-y-4">
              <Link
                href="#"
                id="sidebar-link-faq"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Pusat Bantuan (FAQ)
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                id="sidebar-link-terms"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Syarat & Ketentuan
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                id="sidebar-link-privacy"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Kebijakan Privasi
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Logout */}
          <button
            id="sidebar-btn-logout"
            type="button"
            className="w-full py-5 bg-red-50 text-red-500 rounded-[1.5rem] font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Keluar Dari Akun
          </button>
        </aside>
      </div>
    </div>
  );
}
