import {
  Clock,
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Share2,
  Twitter,
} from "lucide-react";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

export default function Page() {
  return (
    <main className="flex-1 pt-32 pb-24">
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
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 bg-gray-100 rounded-[2.5rem] overflow-hidden card-shadow min-h-[500px] lg:min-h-full relative group border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d316863.0375971488!2d106.8227!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e0989f660d%3A0x889895c0c978b273!2sJakarta%20Selatan!5e0!3m2!1sid!2sid!4v1715850000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-110 brightness-90 transition-[filter] duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 pointer-events-none transition-opacity group-hover:opacity-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF9500]">
                Main Headquarters
              </p>
              <p className="font-black text-sm">Sudirman, Jakarta Selatan</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className={`bg-white p-8 rounded-[2.5rem] ${cardShadow}`}>
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <Clock className="text-[#FF9500] w-5 h-5" />
                Jam Operasional
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="font-bold text-gray-500">
                    Senin - Jumat
                  </span>
                  <span className="font-black">08:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="font-bold text-gray-500">Sabtu</span>
                  <span className="font-black">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-500">Minggu</span>
                  <span className="text-red-500 font-black">Tutup</span>
                </div>
              </div>
            </div>

            <div
              className={`bg-white p-8 rounded-[2.5rem] ${cardShadow} space-y-6 flex-1`}
            >
              <h3 className="text-xl font-black mb-2 flex items-center gap-3">
                <MapPin className="text-[#FF9500] w-5 h-5" />
                Lokasi Kantor
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl shrink-0 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <MapPin className="text-gray-400 group-hover:text-[#FF9500] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-lg">Jakarta Office</p>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      Jl. Sudirman No. 123, Jakarta Selatan
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl shrink-0 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <MapPin className="text-gray-400 group-hover:text-[#FF9500] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-lg">Surabaya Office</p>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      Jl. Ahmad Yani No. 456, Surabaya
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl shrink-0 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <MapPin className="text-gray-400 group-hover:text-[#FF9500] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-lg">Bandung Office</p>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      Jl. Diponegoro No. 789, Bandung
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="container mx-auto px-6 mb-32">
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
