import type { Metadata } from "next";
import Link from "next/link";

import {
  Bell,
  EyeOff,
  ExternalLink,
  Headphones,
  HelpCircle,
  LogOut,
  Monitor,
  Settings2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pengaturan Akun - DriveEase Indonesia",
  description: "Kelola notifikasi, privasi, keamanan, dan preferensi akun DriveEase.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const selectClass =
  "w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all appearance-none cursor-pointer";

function Toggle({
  id,
  defaultChecked = false,
}: {
  id: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="absolute inset-0 cursor-pointer bg-gray-200 rounded-full transition-all duration-300 peer-checked:bg-[#FF9500] block"
      />
      <span
        aria-hidden
        className="absolute left-1 bottom-1 w-4 h-4 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-6 pointer-events-none block"
      />
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Notifikasi */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Bell className="w-6 h-6 text-[#FF9500]" />
              Notifikasi
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Notifikasi Email</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Dapatkan update terbaru tentang booking Anda
                  </p>
                </div>
                <Toggle id="toggle-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Notifikasi SMS</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Update instan melalui nomor telepon terdaftar
                  </p>
                </div>
                <Toggle id="toggle-sms" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Notifikasi Push</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Pesan langsung ke aplikasi DriveEase Anda
                  </p>
                </div>
                <Toggle id="toggle-push" />
              </div>
            </div>
          </div>

          {/* Privasi */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <EyeOff className="w-6 h-6 text-[#FF9500]" />
              Privasi
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Bagikan data profil</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Izinkan partner penyedia armada melihat profil dasar Anda
                  </p>
                </div>
                <Toggle id="toggle-share" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Tampilkan dalam direktori</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Tampilkan profil Anda di daftar pencarian member
                  </p>
                </div>
                <Toggle id="toggle-directory" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Terima rekomendasi personal</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Saran armada berdasarkan riwayat perjalanan Anda
                  </p>
                </div>
                <Toggle id="toggle-reco" defaultChecked />
              </div>
            </div>
          </div>

          {/* Preferensi */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Settings2 className="w-6 h-6 text-[#FF9500]" />
              Preferensi
            </h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Bahasa Aplikasi
                </label>
                <select className={selectClass}>
                  <option>Bahasa Indonesia</option>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">Mode Gelap (Dark Mode)</h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Gunakan tema gelap untuk kenyamanan mata
                  </p>
                </div>
                <Toggle id="toggle-dark" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Zona Waktu
                </label>
                <select className={selectClass}>
                  <option>(GMT+07:00) Indonesia/Jakarta</option>
                  <option>(GMT+08:00) Indonesia/Makassar</option>
                  <option>(GMT+09:00) Indonesia/Jayapura</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Keamanan */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FF9500]" />
              Keamanan
            </h3>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black">
                    Two-Factor Authentication (2FA)
                  </h5>
                  <p className="text-sm text-gray-400 font-medium">
                    Lapisan keamanan tambahan untuk login Anda
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-50 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                    Aktif
                  </span>
                  <Toggle id="toggle-2fa" defaultChecked />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <button
                  id="btn-change-password"
                  type="button"
                  className="w-full py-4 bg-[#1a1a1a] text-white rounded-xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-transform"
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  Ubah Password
                </button>
              </div>
              <div>
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Perangkat Terhubung
                </h5>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Monitor className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black">Chrome on Windows</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Jakarta • 2 hari lalu
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50/30 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Smartphone className="w-5 h-5 text-[#FF9500]" />
                      </div>
                      <div>
                        <p className="text-sm font-black">Safari on iPhone</p>
                        <p className="text-[10px] text-[#FF9500] font-black uppercase">
                          Jakarta • Sedang Aktif
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Log Aktivitas Terakhir
                </h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <p className="flex-1">Login berhasil dari Chrome</p>
                    <span className="text-xs text-gray-400">Hari ini, 10:45</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#FF9500] shrink-0" />
                    <p className="flex-1">Perubahan profil tersimpan</p>
                    <span className="text-xs text-gray-400">
                      Kemarin, 14:20
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <p className="flex-1">Metode pembayaran ditambahkan</p>
                    <span className="text-xs text-gray-400">3 hari lalu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pusat Bantuan */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#FF9500]" />
              Pusat Bantuan
            </h3>
            <div className="space-y-4 mb-8">
              <Link
                href="#"
                id="link-faq-settings"
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group"
              >
                <div>
                  <p className="font-black">Pertanyaan Umum (FAQ)</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Cari jawaban instan untuk masalah Anda
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
              </Link>
              <Link
                href="#"
                id="link-privacy-settings"
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group"
              >
                <div>
                  <p className="font-black">Kebijakan Privasi</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Bagaimana kami mengelola data Anda
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
              </Link>
              <Link
                href="#"
                id="link-terms-settings"
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all group"
              >
                <div>
                  <p className="font-black">Syarat & Ketentuan</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Aturan penggunaan layanan DriveEase
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
              </Link>
            </div>
            <button
              id="btn-contact-support-settings"
              type="button"
              className="w-full py-5 bg-orange-50 text-[#FF9500] border border-orange-100 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-3"
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <Headphones className="w-5 h-5" />
              Hubungi Customer Support
            </button>
          </div>

          {/* Logout */}
          <button
            id="btn-logout-settings"
            type="button"
            className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
}
