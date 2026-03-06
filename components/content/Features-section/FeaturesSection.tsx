import { Wallet, Key, MessageCircle } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-gray-50/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
            <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-3">Harga Terjangkau</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Nikmati tarif kompetitif tanpa biaya tersembunyi. Transparan dan
              hemat di kantong.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
            <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-3">Lepas Kunci / Supir</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Pilihan fleksibel sesuai kebutuhan Anda. Mau nyetir sendiri atau
              dilayani driver profesional.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 group hover:border-[#FF9500] transition-colors duration-300">
            <div className="w-14 h-14 bg-orange-100 text-[#FF9500] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black mb-3">Proses Cepat WA</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Booking instan tanpa ribet melalui WhatsApp. Konfirmasi cepat
              dalam hitungan menit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
