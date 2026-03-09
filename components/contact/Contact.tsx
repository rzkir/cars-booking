import {
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Share2,
  Twitter,
} from "lucide-react";

import { OfficeMapSection } from "@/components/contact/OfficeMapSection";

export default function Page() {
  return (
    <main className="flex-1 pt-20 md:pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF9500] rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <Headphones className="w-4 h-4" />
          <span>Support 24/7</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Hubungi <span className="text-[#FF9500]">Kami</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Kami siap membantu Anda kapan saja. Kunjungi kantor kami atau hubungi
          tim kami melalui kanal yang tersedia.
        </p>
      </section>

      {/* Map + Office Info */}
      <OfficeMapSection />

      {/* Quick Contact Methods */}
      <section className="container mx-auto px-6 py-10 md:py-20">
        <h2 className="text-2xl font-black tracking-tight mb-10 text-center lg:text-left">
          Metode Kontak Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp */}
          <div className="bg-gray-50 p-8 rounded-[2rem] text-center hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-gray-100">
            <div className="w-16 h-16 bg-[#25D366] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100 group-hover:-translate-y-2 transition-transform">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg mb-2">WhatsApp</h4>
            <p className="text-sm text-gray-400 font-medium mb-4">
              0812-9876-5432
            </p>
            <a
              href="https://wa.me/6281298765432"
              id="contact-wa-link"
              className="text-xs font-black uppercase tracking-widest text-[#25D366] hover:underline"
            >
              Chat Sekarang
            </a>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-8 rounded-[2rem] text-center hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-gray-100">
            <div className="w-16 h-16 bg-[#1a1a1a] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10 group-hover:-translate-y-2 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg mb-2">Email Support</h4>
            <p className="text-sm text-gray-400 font-medium mb-4">
              halo@driveease.id
            </p>
            <a
              href="mailto:halo@driveease.id"
              id="contact-email-link"
              className="text-xs font-black uppercase tracking-widest text-[#1a1a1a] hover:underline"
            >
              Kirim Email
            </a>
          </div>

          {/* Hotline */}
          <div className="bg-gray-50 p-8 rounded-[2rem] text-center hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-gray-100">
            <div className="w-16 h-16 bg-[#FF9500] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-100 group-hover:-translate-y-2 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg mb-2">Hotline</h4>
            <p className="text-sm text-gray-400 font-medium mb-4">
              021-1234567
            </p>
            <a
              href="tel:0211234567"
              id="contact-phone-link"
              className="text-xs font-black uppercase tracking-widest text-[#FF9500] hover:underline"
            >
              Telepon Sekarang
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-gray-50 p-8 rounded-[2rem] text-center hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-gray-100">
            <div className="w-16 h-16 bg-[#1a1a1a] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10 group-hover:-translate-y-2 transition-transform">
              <Share2 className="w-7 h-7" />
            </div>
            <h4 className="font-black text-lg mb-2">Social Media</h4>
            <div className="flex justify-center gap-4 mt-4 text-gray-400">
              <a
                href="#"
                id="contact-ig-link"
                className="hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                id="contact-fb-link"
                className="hover:text-[#1877F2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                id="contact-tw-link"
                className="hover:text-black transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                id="contact-li-link"
                className="hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
