import { MessageCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-52 h-52 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-52 h-52 sm:w-64 sm:h-64 bg-[#FF9500]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Butuh Mobil Sekarang?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium">
            Hubungi admin kami via WhatsApp untuk booking instan dan konsultasi
            ketersediaan armada.
            </p>
            <div className="pt-4 sm:pt-6">
              <a
                href="https://wa.me/"
                id="cta-whatsapp-big"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#FF9500] text-white px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-2xl shadow-orange-900/40 transition-colors hover:bg-[#ff8a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9500] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Chat WhatsApp Sekarang
              </a>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest">
            Tersedia 24/7 untuk Layanan Darurat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
