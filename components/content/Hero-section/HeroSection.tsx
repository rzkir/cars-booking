import { ShieldCheck } from "lucide-react";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-14 md:pb-unset md:pt-48 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF9500] rounded-full font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Terpercaya &amp; Aman di Seluruh Indonesia</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-[#1a1a1a]">
            Sewa Mobil <span className="text-[#FF9500]">Mudah</span> &amp; Cepat
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
            Harga terjangkau dengan layanan terpercaya untuk perjalanan Anda di
            dalam maupun luar kota.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#cars"
              id="hero-cta-main"
              className="bg-[#FF9500] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200"
            >
              Lihat Mobil
            </a>
            <div className="flex items-center gap-4 px-6">
              <div className="flex -space-x-3">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="User"
                  width={64}
                  height={64}
                />
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="User"
                  width={64}
                  height={64}
                />
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="User"
                  width={64}
                  height={64}
                />
              </div>
              <span className="text-sm font-bold text-gray-500">
                +2.4k User Puas
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50/50 rounded-full blur-3xl" />
          <Image
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80"
            alt="Modern Car"
            className="w-full h-auto drop-shadow-2xl"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
