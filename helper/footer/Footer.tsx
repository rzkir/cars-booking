import {
  Car,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF9500] rounded-lg flex items-center justify-center text-[#1a1a1a]">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-2xl font-black tracking-tight">
              DriveEase
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed font-medium">
            Solusi sewa mobil modern dan terpercaya di Indonesia. Kami
            memberikan kemudahan perjalanan Anda dengan armada terbaik.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              id="social-ig"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF9500] hover:text-white transition-all"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              id="social-fb"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF9500] hover:text-white transition-all"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              id="social-tw"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF9500] hover:text-white transition-all"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-lg font-black">Layanan</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li>
              <Link
                href="/sewa-lepas-kunci"
                id="footer-link-1"
                className="hover:text-white transition-colors"
              >
                Sewa Lepas Kunci
              </Link>
            </li>
            <li>
              <Link
                href="/sewa-dengan-supir"
                id="footer-link-2"
                className="hover:text-white transition-colors"
              >
                Sewa Dengan Supir
              </Link>
            </li>
            <li>
              <Link
                href="/antar-jemput-bandara"
                id="footer-link-3"
                className="hover:text-white transition-colors"
              >
                Antar Jemput Bandara
              </Link>
            </li>
            <li>
              <Link
                href="/perjalanan-dinas"
                id="footer-link-4"
                className="hover:text-white transition-colors"
              >
                Perjalanan Dinas
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-lg font-black">Kontak</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li className="flex gap-3">
              <MapPin className="text-[#FF9500] mt-1 w-5 h-5" />
              <span>Jl. Jenderal Sudirman No. 123, Jakarta Selatan</span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-[#FF9500] mt-1 w-5 h-5" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex gap-3">
              <Mail className="text-[#FF9500] mt-1 w-5 h-5" />
              <span>halo@driveease.id</span>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-lg font-black">WhatsApp</h4>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-sm text-gray-400 mb-4">
              Dapatkan update ketersediaan mobil langsung ke HP Anda.
            </p>
            <Link
              href="https://wa.me/"
              id="footer-wa-btn"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat Sekarang
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 font-medium">
          &copy; 2024 DriveEase Indonesia. All rights reserved.
        </p>
        <div className="flex gap-8 text-gray-500 font-medium">
          <Link
            href="/syarat-ketentuan"
            id="footer-term"
            className="hover:text-white"
          >
            Syarat &amp; Ketentuan
          </Link>
          <Link
            href="/kebijakan-privasi"
            id="footer-privacy"
            className="hover:text-white"
          >
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </footer>
  );
}
