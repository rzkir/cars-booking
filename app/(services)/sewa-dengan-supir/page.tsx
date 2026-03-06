import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRight,
  Award,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock4,
  Headphones,
  LifeBuoy,
  Map,
  Route,
  ShieldCheck,
  Star,
  StarHalf,
  UserCheck,
  Wind,
} from "lucide-react";

import Link from "next/link"

export const metadata: Metadata = {
  title: "Sewa Dengan Supir - DriveEase Indonesia",
  description:
    "Nikmati layanan sewa mobil dengan supir profesional, aman, dan nyaman bersama DriveEase Indonesia.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const advantages = [
  {
    title: "Keselamatan",
    description:
      "Driver kami memiliki sertifikasi mengemudi defensif & melalui verifikasi ketat.",
    icon: ShieldCheck,
  },
  {
    title: "Kenyamanan",
    description:
      "Duduk dengan tenang dan nikmati fasilitas kabin selagi kami mengantar Anda.",
    icon: Car,
  },
  {
    title: "Profesional",
    description:
      "Berpenampilan rapi, tepat waktu, dan menguasai rute jalan raya dengan baik.",
    icon: UserCheck,
  },
  {
    title: "Fleksibel",
    description:
      "Sesuaikan durasi, rute, dan jadwal perjalanan Anda kapan saja diperlukan.",
    icon: Route,
  },
] as const;

const premiumFeatures = [
  { icon: Map, label: "GPS Real-time" },
  { icon: Headphones, label: "Support 24/7" },
  { icon: StarHalf, label: "Rating System" },
  { icon: LifeBuoy, label: "Emergency Asst." },
  { icon: Wind, label: "Full AC Vehicle" },
  { icon: Award, label: "Professional Look" },
] as const;

const packages = [
  {
    name: "Paket Per Jam",
    subtitle: "Minimum 4 Jam",
    price: "150rb",
    unit: "/jam",
    featured: false,
    icon: Clock4,
    benefits: [
      "Supir Berpengalaman",
      "Armada Standar/Luxury",
      "Asuransi Dasar",
    ],
  },
  {
    name: "Paket Per Hari",
    subtitle: "Sewa 24 Jam",
    price: "800rb",
    unit: "/hari",
    featured: true,
    icon: CalendarDays,
    benefits: [
      "Prioritas Supir Senior",
      "Armada Premium",
      "Asuransi Full Coverage",
      "Free Mineral Water",
    ],
  },
  {
    name: "Paket Mingguan",
    subtitle: "Durasi 7 Hari",
    price: "5jt",
    unit: "/mggu",
    featured: false,
    icon: Award,
    benefits: ["Supir Dedicated", "Bebas Tukar Armada", "Support Tim Khusus"],
  },
] as const;

const steps = [
  {
    step: 1,
    title: "Tentukan Kebutuhan",
    subtitle: "Pilih Tanggal & Waktu",
  },
  {
    step: 2,
    title: "Pilih Supir",
    subtitle: "Cek Database Driver",
  },
  {
    step: 3,
    title: "Konfirmasi & Bayar",
    subtitle: "Transaksi Aman",
  },
  {
    step: 4,
    title: "Nikmati Perjalanan",
    subtitle: "Layanan Siap Jalan",
  },
] as const;

const drivers = [
  {
    name: "Bambang S.",
    role: "Spesialis VIP Premium",
    quote: '"Selalu mengutamakan kenyamanan tamu selama perjalanan."',
    reviews: "128+",
    experience: "8 Thn",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rizky A.",
    role: "Ramah & On Time",
    quote: '"Tepat waktu adalah bentuk rasa hormat kepada pelanggan."',
    reviews: "95+",
    experience: "5 Thn",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Siti Aminah",
    role: "Expert City Navigator",
    quote: '"Memastikan rute tercepat dan teraman untuk efisiensi waktu."',
    reviews: "210+",
    experience: "12 Thn",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hendrik K.",
    role: "Spesialis Luar Kota",
    quote: '"Menguasai medan perjalanan jarak jauh lintas provinsi."',
    reviews: "64+",
    experience: "6 Thn",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
] as const;

const faqs = [
  {
    id: "faq-driver-meal",
    question: "Apakah biaya makan supir sudah termasuk?",
    answer:
      "Ya, seluruh paket kami sudah termasuk biaya makan dan operasional harian supir (Uang Makan & Tip). Tidak ada biaya tambahan di luar tol dan parkir.",
  },
  {
    id: "faq-extend",
    question: "Bagaimana jika saya ingin memperpanjang waktu sewa?",
    answer:
      "Anda bisa melakukan perpanjangan melalui aplikasi atau langsung menghubungi Customer Service kami minimal 2 jam sebelum waktu sewa berakhir.",
  },
  {
    id: "faq-outside-city",
    question: "Apakah supir bisa menjemput di luar kota?",
    answer:
      "Bisa, kami melayani penjemputan antar kota dengan biaya tambahan jarak tempuh (overnight fee) jika diperlukan menginap.",
  },
  {
    id: "faq-choose-driver",
    question: "Apakah saya bisa memilih supir tertentu?",
    answer:
      "Tentu. Saat proses booking, Anda dapat melihat database pengemudi kami beserta rating dan review untuk memilih yang paling sesuai dengan kebutuhan Anda.",
  },
] as const;

const testimonials = [
  {
    name: "Aditya Wijaya",
    role: "Corporate User",
    text: "Layanan supir VIP-nya luar biasa. Pak Bambang sangat sopan dan hafal jalan pintas sehingga saya tidak telat meeting penting.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Amanda S.",
    role: "Leisure Traveler",
    text: "Sewa mingguan dengan supir untuk liburan keluarga di Bali. Sangat nyaman, supirnya juga merangkap sebagai guide lokal yang asik.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
  },
  {
    name: "Deni Ramadhan",
    role: "Personal User",
    text: "Transparan banget biayanya. Udah include makan supir jadi gak ribet bayar-bayar lagi di jalan. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
  },
] as const;

export default function Page() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-screen md:h-[85vh] flex items-center overflow-hidden bg-[#1a1a1a] pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury car with professional driver"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-black uppercase tracking-[0.2em] text-[#FF9500] backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              Layanan Premium VIP
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Sewa Dengan <span className="text-[#FF9500]">Supir</span>{" "}
              Profesional
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-xl leading-relaxed opacity-90">
              Nikmati perjalanan tanpa hambatan dengan pengemudi terlatih dan
              berpengalaman. Fokus pada tujuan Anda, biar kami yang mengemudi.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#pricing"
                id="hero-book-now-btn"
                className="px-10 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg hover:bg-[#E68600] transition-transform shadow-xl shadow-orange-900/20 flex items-center gap-3 duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
              >
                Pesan Sekarang
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#packages"
                id="hero-view-packages-btn"
                className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Lihat Paket
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Layanan Supir */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Mengapa DriveEase?
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Keunggulan Layanan Supir Kami
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="p-10 bg-gray-50 rounded-[2.5rem] space-y-6 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100 group"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-[#FF9500] group-hover:text-white transition-all">
                  <Icon className="w-8 h-8 text-[#FF9500] group-hover:text-white" />
                </div>
                <h4 className="text-xl font-black">{title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Tanpa Kompromi */}
      <section className="py-10 md:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF9500]/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80"
                    alt="Driver 1"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=400&q=80"
                    alt="Driver 2"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=400&q=80"
                    alt="Driver 3"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80"
                    alt="Driver 4"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
                  Premium Features
                </h2>
                <h3 className="text-4xl font-black text-white tracking-tight">
                  Layanan Tanpa Kompromi
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {premiumFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 text-white group"
                  >
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#FF9500] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-bold">{label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-10 h-10 text-[#FF9500]" />
                    </div>
                    <div>
                      <h5 className="text-xl font-black text-white">
                        Terjamin & Aman
                      </h5>
                      <p className="text-gray-400 font-medium text-sm">
                        Seluruh pengemudi telah melalui pelatihan Standard
                        Operational Procedure (SOP) Internasional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paket Sewa */}
      <section id="packages" className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Pricing
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Paket Sewa Transparan
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              Sudah termasuk Supir, Unit Armada, dan Asuransi. Tidak ada biaya
              tersembunyi.
            </p>
          </div>

          <div id="pricing" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const isFeatured = pkg.featured;

              return (
                <article
                  key={pkg.name}
                  className={`p-10 rounded-[3rem] flex flex-col items-center text-center space-y-8 transition-all duration-500 ${
                    isFeatured
                      ? "bg-[#1a1a1a] text-white shadow-2xl relative overflow-hidden transform scale-105 z-10"
                      : "bg-white shadow-xl border border-gray-100 hover:-translate-y-4"
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-[#FF9500] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        Terpopuler
                      </span>
                    </div>
                  )}

                  <div
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                      isFeatured ? "bg-white/5" : "bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`text-4xl ${
                        isFeatured ? "text-[#FF9500]" : "text-gray-400"
                      }`}
                    />
                  </div>

                  <div>
                    <h4
                      className={`text-2xl font-black mb-2 ${
                        isFeatured ? "text-white" : ""
                      }`}
                    >
                      {pkg.name}
                    </h4>
                    <p
                      className={`text-sm font-bold uppercase tracking-widest ${
                        isFeatured ? "text-[#FF9500]" : "text-gray-400"
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div
                    className={`flex items-baseline gap-2 ${
                      isFeatured ? "text-white" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        isFeatured ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Mulai
                    </span>
                    <span className="text-5xl font-black">{pkg.price}</span>
                    <span
                      className={`text-sm font-bold ${
                        isFeatured ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </div>

                  <ul className="space-y-4 text-sm font-bold text-gray-500 w-full text-left">
                    {pkg.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={`flex items-center gap-3 ${
                          isFeatured ? "text-gray-400" : ""
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#FF9500]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                      isFeatured
                        ? "bg-[#FF9500] text-white hover:bg-[#E68600]"
                        : "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                    }`}
                  >
                    Pilih Paket
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proses Pemesanan Mudah */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              How It Works
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Proses Pemesanan Mudah
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-1/2 w-full -translate-x-1/2 h-[2px] bg-linear-to-r from-transparent via-gray-200 to-transparent pointer-events-none" />
            {steps.map((item, index) => (
              <div
                key={item.step}
                className={`relative z-10 text-center space-y-6 flex flex-col items-center ${
                  index < steps.length - 1 ? "md:step-connector" : ""
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shadow-xl ring-8 ring-gray-50 ${
                    item.step === 4
                      ? "bg-[#FF9500] text-white shadow-orange-900/20 ring-orange-50"
                      : "bg-[#1a1a1a] text-white shadow-black/20"
                  }`}
                >
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h5 className="text-lg font-black">{item.title}</h5>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Drivers */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
                Our Drivers
              </h2>
              <h3 className="text-4xl font-black tracking-tight leading-none">
                Supir Berperingkat Tinggi
              </h3>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="px-8 py-3 bg-[#1a1a1a] text-white rounded-xl font-black text-xs uppercase tracking-widest"
              >
                Semua
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-white text-gray-400 border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#FF9500] hover:text-[#FF9500] transition-all"
              >
                5 Bintang
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-white text-gray-400 border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#FF9500] hover:text-[#FF9500] transition-all"
              >
                Direkomendasikan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {drivers.map((driver) => (
              <article
                key={driver.name}
                className={`bg-white rounded-[2rem] overflow-hidden border border-gray-100 ${cardShadow} hover:-translate-y-2 transition-all group`}
              >
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={driver.image}
                    alt={driver.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#FF9500]" />
                    <span className="text-xs font-black">{driver.rating}</span>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h5 className="text-xl font-black">{driver.name}</h5>
                  <p className="text-xs font-bold text-[#FF9500] uppercase tracking-widest mt-1">
                    {driver.role}
                  </p>
                  <p className="text-xs text-gray-400 font-medium mt-4">
                    {driver.quote}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-gray-300 uppercase">
                        Reviews
                      </p>
                      <p className="text-sm font-black">{driver.reviews}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-300 uppercase">
                        Experience
                      </p>
                      <p className="text-sm font-black">{driver.experience}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proteksi Perjalanan */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#1a1a1a] p-12 md:p-16 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9500]/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h4 className="text-3xl font-black tracking-tight">
                  Proteksi Perjalanan Maksimal
                </h4>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Seluruh layanan sewa supir dilengkapi dengan asuransi
                  komprehensif yang melindungi Anda dan pengemudi.
                </p>
                <div className="space-y-4">
                  {[
                    "Fully Insured",
                    "24/7 Support",
                    "Money-back Guarantee",
                  ].map((label) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#FF9500]" />
                      <span className="font-black uppercase tracking-widest">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center gap-3 backdrop-blur-md animate-pulse">
                  <ShieldCheck className="w-16 h-16 text-[#FF9500]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Verified Secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              FAQs
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Pertanyaan Umum
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`group bg-white rounded-2xl border border-gray-100 p-0 cursor-pointer hover:border-[#FF9500] transition-all ${cardShadow}`}
              >
                <input type="checkbox" id={faq.id} className="peer hidden" />
                <label
                  htmlFor={faq.id}
                  className="flex justify-between items-center p-8"
                >
                  <h5 className="font-black text-lg">{faq.question}</h5>
                  <ArrowRight className="w-4 h-4 text-gray-300 transition-transform peer-checked:rotate-90" />
                </label>
                <div className="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out peer-checked:max-h-40 px-8 pb-8">
                  <p className="mt-2 text-gray-500 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Testimonials
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Kisah Perjalanan Pelanggan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className={`p-10 bg-white rounded-[2.5rem] border border-gray-100 ${cardShadow} space-y-8`}
              >
                <div className="flex gap-1 text-[#FF9500]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-lg font-medium text-gray-500 leading-relaxed italic">
                  “{item.text}”
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  />
                  <div>
                    <p className="font-black text-sm">{item.name}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
            alt="Final CTA background"
            fill
            className="w-full h-full object-cover opacity-20 bg-linear-to-r"
          />
        </div>
        <div className="absolute inset-0 bg-[#FF9500]/10 z-0" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 space-y-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Siap Dalam Perjalanan Anda?
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Ribuan pelanggan telah mempercayakan kenyamanan perjalanan mereka
            kepada DriveEase. Jadilah salah satu dari mereka hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/daftar-mobil"
              id="final-book-driver-btn"
              className="px-12 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg hover:bg-[#E68600] transition-transform shadow-xl shadow-orange-900/20 hover:scale-[1.02]"
            >
              Pesan Supir Sekarang
            </Link>
            <Link
              href="/kontak"
              id="final-contact-us-btn"
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
