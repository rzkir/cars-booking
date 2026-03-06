import { MessageCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto bg-[#1a1a1a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF9500]/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Butuh Mobil Sekarang?
          </h2>
          <p className="text-gray-400 text-xl font-medium">
            Hubungi admin kami via WhatsApp untuk booking instan dan konsultasi
            ketersediaan armada.
          </p>
          <div className="pt-6">
            <a
              href="https://wa.me/"
              id="cta-whatsapp-big"
              className="inline-flex items-center gap-3 bg-[#FF9500] text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-orange-900/40"
            >
              <MessageCircle className="w-6 h-6" />
              Chat WhatsApp Sekarang
            </a>
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            Tersedia 24/7 untuk Layanan Darurat
          </p>
        </div>
      </div>
    </section>
  );
}
