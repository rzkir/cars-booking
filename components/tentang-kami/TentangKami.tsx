import {
  ArrowRight,
  Award,
  Car,
  Cpu,
  Diamond,
  Rocket,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import Image from "next/image";

import Link from "next/link";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-black/5";

export default function Page() {
  return (
    <main className="flex-1">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a] pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
            alt="Background Hero"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a] z-1" />

        <div className="relative z-10 container mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9500] backdrop-blur-sm">
            <Car className="w-4 h-4" />
            Definisi Perjalanan Baru
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none text-balance">
            Tentang DriveEase Indonesia
          </h1>
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
            Lebih dari sekadar penyewaan mobil, kami adalah mitra terpercaya
            Anda dalam menjelajahi keindahan Nusantara dengan kenyamanan tanpa
            batas.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
                  Cerita Kami
                </h2>
                <h3 className="text-4xl font-black tracking-tight leading-tight">
                  Membangun Standar Baru dalam Industri Rental Mobil
                </h3>
              </div>

              <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                <p>
                  Didirikan pada tahun 2018, DriveEase bermula dari sebuah visi
                  sederhana: menghapus hambatan birokrasi dalam menyewa mobil.
                  Kami melihat betapa sulitnya proses pemesanan tradisional dan
                  memutuskan untuk melakukan revolusi digital.
                </p>
                <p>
                  Kini, DriveEase telah tumbuh menjadi platform penyewaan mobil
                  modern yang mengutamakan transparansi, kecepatan, dan kualitas
                  unit yang selalu prima. Kami percaya bahwa setiap perjalanan
                  adalah cerita yang berharga.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-4xl font-black text-[#1a1a1a]">5th+</p>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Tahun Melayani
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-black text-[#1a1a1a]">15+</p>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Kota Utama
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
                  alt="Our Fleet"
                  width={900}
                  height={900}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              <div className="absolute -bottom-10 -left-10 bg-[#FF9500] p-12 rounded-[2rem] text-white shadow-xl hidden md:block">
                <Award className="w-14 h-14 mb-4" />
                <p className="text-2xl font-black">#1 Rental</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                  Terbaik 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div
              className={`bg-white p-12 rounded-[2.5rem] ${cardShadow} space-y-6`}
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-[#FF9500]" />
              </div>
              <h3 className="text-3xl font-black">Visi Kami</h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Menjadi platform mobilitas terdepan di Asia Tenggara yang
                mendefinisikan ulang pengalaman berkendara melalui inovasi
                teknologi dan pelayanan yang humanis.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-12 rounded-[2.5rem] shadow-2xl space-y-6 text-white">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                <Rocket className="w-8 h-8 text-[#FF9500]" />
              </div>
              <h3 className="text-3xl font-black">Misi Kami</h3>
              <p className="text-lg text-gray-400 font-medium leading-relaxed">
                Menyediakan akses transportasi yang aman, mudah, dan terjangkau
                bagi semua orang dengan standar perawatan armada tingkat tinggi
                dan layanan pelanggan 24/7.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className={`bg-white p-10 rounded-3xl ${cardShadow} space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05]`}
            >
              <div className="text-[#FF9500] text-4xl">
                <Zap className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black">Kecepatan</h4>
              <p className="text-sm text-gray-400 font-medium">
                Proses booking instan dalam hitungan menit tanpa ribet.
              </p>
            </div>

            <div
              className={`bg-white p-10 rounded-3xl ${cardShadow} space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05]`}
            >
              <div className="text-[#FF9500] text-4xl">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black">Kepercayaan</h4>
              <p className="text-sm text-gray-400 font-medium">
                Asuransi lengkap dan verifikasi armada yang ketat.
              </p>
            </div>

            <div
              className={`bg-white p-10 rounded-3xl ${cardShadow} space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05]`}
            >
              <div className="text-[#FF9500] text-4xl">
                <Diamond className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black">Kualitas</h4>
              <p className="text-sm text-gray-400 font-medium">
                Unit terbaru dengan perawatan rutin di bengkel resmi.
              </p>
            </div>

            <div
              className={`bg-white p-10 rounded-3xl ${cardShadow} space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05]`}
            >
              <div className="text-[#FF9500] text-4xl">
                <Cpu className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black">Inovasi</h4>
              <p className="text-sm text-gray-400 font-medium">
                Solusi digital cerdas untuk kemudahan manajemen sewa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Armada &amp; Jangkauan
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Pencapaian DriveEase
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center space-y-2">
              <p className="text-6xl font-black tracking-tighter">500+</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Total Armada
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-6xl font-black tracking-tighter text-[#FF9500]">
                12k+
              </p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Happy Customers
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-6xl font-black tracking-tighter">4.9/5</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Rating Rata-rata
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-6xl font-black tracking-tighter text-[#FF9500]">
                24h
              </p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Support Aktif
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Dibalik Layar
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Tim Profesional Kami
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Budi Santoso",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Siska Amanda",
                role: "Operations Director",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Rizky Putra",
                role: "Technical Lead",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Maya Putri",
                role: "Customer Relations",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
              },
            ].map((member) => (
              <div
                key={member.name}
                className={`group relative overflow-hidden rounded-[2rem] bg-white ${cardShadow}`}
              >
                <div className="aspect-3/4 overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 text-center space-y-2">
                  <h5 className="text-xl font-black">{member.name}</h5>
                  <p className="text-sm font-bold text-[#FF9500] uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center space-y-12">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
            Dipercaya Oleh Partner Global
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Toyota_logo.svg"
              className="h-6 w-auto"
              alt="Toyota"
              width={120}
              height={24}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Honda_Logo.svg"
              className="h-8 w-auto"
              alt="Honda"
              width={140}
              height={32}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg"
              className="h-6 w-auto"
              alt="Suzuki"
              width={140}
              height={24}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Mitsubishi_logo.svg"
              className="h-8 w-auto"
              alt="Mitsubishi"
              width={160}
              height={32}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/07/Daihatsu_logo.svg"
              className="h-10 w-auto"
              alt="Daihatsu"
              width={160}
              height={40}
            />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-32 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9500]/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Siap Memulai Perjalanan Anda Bersama Kami?
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Temukan armada impian Anda dan nikmati pengalaman berkendara kelas
            dunia hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/daftar-mobil"
              id="cta-cars-link"
              className="px-12 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg hover:bg-[#E68600] transition-all shadow-xl shadow-orange-900/20 flex items-center gap-3"
            >
              Cari Armada Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/kontak"
              id="cta-contact-link"
              className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
