import Link from "next/link";

import { ChevronRight, Copy, Heart, LogOut, User } from "lucide-react";

import { CarCard } from "@/components/ui/cars/card";

import { getSession } from "@/hooks/get-session";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const favoriteCars = [
  {
    image:
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80",
    title: "Tesla Model 3",
    subtitle: "Sedan • Electric",
    price: "1.2jt",
    transmission: "Otomatis",
    fuel: "Listrik",
    status: "",
    slug: "tesla-model-3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
    title: "BMW X5",
    subtitle: "SUV • Premium",
    price: "2.5jt",
    transmission: "Otomatis",
    fuel: "Bensin",
    status: "Terlaris",
    slug: "bmw-x5",
  },
];

export default async function Page() {
  const user = (await getSession())!;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Informasi Dasar */}
          <div className={`bg-white rounded-[2rem] p-8 md:p-10 ${cardShadow}`}>
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <User className="w-6 h-6 text-[#FF9500]" />
              Informasi Dasar
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nama Lengkap
                </label>
                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {user.name}
                </span>
              </div>
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Email
                </label>

                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {user.email}
                </span>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nomor WhatsApp
                </label>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-4 bg-gray-100 rounded-2xl font-bold text-gray-400">
                    +62
                  </div>
                  <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                    {user.phone.replace(/^0/, "")}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  defaultValue="1992-05-14"
                  className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={3}
                  defaultValue="Jl. Jenderal Sudirman No. 45, Apartemen Senayan City Tower A No. 12, Jakarta Selatan, 12190"
                  className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Tipe ID
                </label>
                <select className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all appearance-none">
                  <option>Kartu Tanda Penduduk (KTP)</option>
                  <option>Passport</option>
                  <option>SIM A</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nomor ID
                </label>
                <input
                  type="text"
                  defaultValue="3174123456780001"
                  className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Jenis Kelamin
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="gender"
                      defaultChecked
                      className="w-5 h-5 accent-[#FF9500]"
                    />
                    Laki-laki
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="gender"
                      className="w-5 h-5 accent-[#FF9500]"
                    />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 pt-8 flex gap-4">
                <button
                  id="btn-save-profile"
                  type="submit"
                  className="px-10 py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-black/10"
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  Simpan Perubahan
                </button>
                <button
                  id="btn-cancel-profile"
                  type="button"
                  className="px-10 py-5 bg-white text-gray-400 rounded-2xl font-black text-sm hover:text-gray-600 transition-all border border-gray-100"
                >
                  Batalkan
                </button>
              </div>
            </form>
          </div>

          {/* Armada Favorit */}
          <div className={`bg-white rounded-[2rem] p-8 ${cardShadow}`}>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#FF9500]" />
              Armada Favorit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteCars.map((car) => (
                <CarCard
                  key={car.slug}
                  image={car.image}
                  title={car.title}
                  subtitle={car.subtitle}
                  price={`Rp ${car.price}`}
                  transmission={car.transmission}
                  fuel={car.fuel}
                  status={car.status}
                  slug={car.slug}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* DriveEase Loyalty */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF9500]/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div>
                <h4 className="text-xs font-black text-[#FF9500] uppercase tracking-widest mb-2">
                  DriveEase Loyalty
                </h4>
                <p className="text-3xl font-black">
                  2,450{" "}
                  <span className="text-sm text-gray-400 font-bold uppercase">
                    Poin
                  </span>
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-400">
                    Status Membership
                  </span>
                  <span className="text-sm font-black text-[#FF9500]">
                    Gold
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mb-2">
                  <div className="w-3/4 h-full bg-[#FF9500] rounded-full" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold">
                  Dapatkan 550 poin lagi untuk menjadi Platinum
                </p>
              </div>
              <button
                id="btn-redeem"
                type="button"
                className="w-full py-4 bg-white text-[#1a1a1a] rounded-xl font-black text-sm hover:bg-[#FF9500] hover:text-white transition-all"
              >
                Tukar Poin Reward
              </button>
            </div>
          </div>

          {/* Kode Referral */}
          <div className={`bg-white rounded-[2rem] p-8 ${cardShadow}`}>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
              Kode Referral
            </h4>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center space-y-4">
              <p className="text-2xl font-black tracking-widest">
                DRIVE-RIZKY-99
              </p>
              <button
                id="btn-copy-ref"
                type="button"
                className="inline-flex items-center gap-2 text-xs font-black text-[#FF9500] uppercase tracking-widest hover:underline"
              >
                <Copy className="w-4 h-4" />
                Salin Kode
              </button>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-6 leading-relaxed">
              Bagikan kode ini ke teman dan dapatkan diskon 15% untuk setiap
              penyewaan pertama mereka!
            </p>
          </div>

          {/* Bantuan & Dukungan */}
          <div
            className={`bg-white rounded-[2rem] p-8 ${cardShadow} space-y-6`}
          >
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Bantuan & Dukungan
            </h4>
            <Link
              href="#"
              id="link-faq"
              className="flex items-center justify-between group"
            >
              <span className="font-bold text-gray-600 group-hover:text-[#1a1a1a]">
                Pusat Bantuan
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
            </Link>
            <Link
              href="#"
              id="link-terms"
              className="flex items-center justify-between group"
            >
              <span className="font-bold text-gray-600 group-hover:text-[#1a1a1a]">
                Syarat & Ketentuan
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
            </Link>
            <Link
              href="#"
              id="link-privacy"
              className="flex items-center justify-between group"
            >
              <span className="font-bold text-gray-600 group-hover:text-[#1a1a1a]">
                Kebijakan Privasi
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
            </Link>
          </div>

          {/* Logout */}
          <button
            id="btn-logout"
            type="button"
            className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
}
