import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRight,
  CalendarCheck,
  Car,
  Check,
  ChevronDown,
  CreditCard,
  Fuel,
  Gift,
  Info,
  MapPin,
  Navigation,
  Plane,
  PlaneTakeoff,
  Star,
  Ticket,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Antar Jemput Bandara - DriveEase Indonesia",
  description:
    "Layanan antar jemput bandara 24/7 yang aman, tepat waktu, dan transparan untuk perjalanan Anda.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const fleetOptions = [
  {
    name: "Economy Class",
    category: "Avanza / Innova",
    price: "350rb",
    transmission: "Otomatis/Manual",
    fuelType: "Bensin",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
    isBestSeller: true,
  },
  {
    name: "Premium Class",
    category: "Voxy / Innova Zenix",
    price: "750rb",
    transmission: "Otomatis",
    fuelType: "Hybrid/Bensin",
    image:
      "https://images.unsplash.com/photo-1621285853634-713b8dd6b5ee?auto=format&fit=crop&w=600&q=80",
    isBestSeller: false,
  },
  {
    name: "VIP Class",
    category: "Alphard / Vellfire",
    price: "1.5jt",
    transmission: "Otomatis",
    fuelType: "Bensin",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80",
    isBestSeller: false,
  },
] as const;

const faqs = [
  {
    id: "faq1",
    question: "Bagaimana cara pesan transfer bandara?",
    answer:
      "Anda dapat memesan melalui aplikasi DriveEase atau website kami dengan memasukkan detail penerbangan, destinasi, dan memilih armada yang tersedia.",
  },
  {
    id: "faq2",
    question: "Apakah bisa mengubah jadwal pickup?",
    answer:
      "Ya, perubahan jadwal dapat dilakukan maksimal 4 jam sebelum waktu penjemputan yang telah dijadwalkan tanpa biaya tambahan.",
  },
  {
    id: "faq3",
    question: "Apa yang terjadi jika flight delay?",
    answer:
      "Kami selalu memantau status penerbangan Anda secara real-time. Driver akan menyesuaikan waktu penjemputan sesuai dengan waktu kedatangan aktual tanpa biaya tunggu.",
  },
  {
    id: "faq4",
    question: "Bagaimana pembayarannya?",
    answer:
      "Kami menerima berbagai metode pembayaran non-tunai mulai dari Kartu Kredit, Transfer Bank, hingga E-wallet seperti GoPay dan OVO.",
  },
] as const;

export default function Page() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-screen md:h-[80vh] flex items-center overflow-hidden bg-[#1a1a1a] pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1920&q=80"
            alt="Airport transfer background"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9500] backdrop-blur-md">
              <PlaneTakeoff className="w-4 h-4" />
              Transfer Bandara 24/7
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
              Antar Jemput Bandara{" "}
              <span className="text-[#FF9500]">Terpercaya</span>
            </h1>

            <p className="text-xl text-gray-300 font-medium leading-relaxed opacity-90">
              Nikmati perjalanan bebas stres dari dan ke bandara. Aman, tepat
              waktu, dan harga transparan untuk kenyamanan maksimal Anda.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 items-center">
              <a
                href="#booking-section"
                id="hero-book-btn"
                className="px-10 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
              >
                Pesan Sekarang
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-6 px-4">
                <div className="text-center">
                  <p className="text-white font-black text-xl">24/7</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Support
                  </p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <p className="text-white font-black text-xl">100%</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    On-Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinasi Utama */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Destinasi Utama
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Pilihan Bandara Populer
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "cgk",
                code: "CGK Jakarta",
                name: "Soekarno-Hatta Int'l",
                rating: "4.9/5 Rating",
              },
              {
                id: "sub",
                code: "SUB Surabaya",
                name: "Juanda International",
                rating: "4.8/5 Rating",
              },
              {
                id: "jog",
                code: "JOG Yogyakarta",
                name: "Yogyakarta Int'l",
                rating: "4.9/5 Rating",
              },
              {
                id: "bdo",
                code: "BDO Bandung",
                name: "Kertajati International",
                rating: "4.7/5 Rating",
              },
            ].map((airport) => (
              <div
                key={airport.id}
                className="group p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8 group-hover:bg-[#1a1a1a] transition-colors">
                  <Plane className="text-3xl text-[#FF9500]" />
                </div>
                <h4 className="text-xl font-black mb-2">{airport.code}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
                  {airport.name}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-black">{airport.rating}</span>
                  <a
                    href="#booking-section"
                    id={`book-${airport.id}`}
                    className="w-10 h-10 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center hover:bg-[#FF9500] transition-colors"
                    aria-label={`Booking ${airport.code}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Titik Penjemputan */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
                  Titik Penjemputan
                </h2>
                <h3 className="text-4xl font-black tracking-tight">
                  Temukan Kami di Terminal
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                    <span className="font-black text-[#FF9500]">T1</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-black">Terminal 1</h5>
                    <p className="text-sm text-gray-400 font-medium">
                      Area kedatangan domestik Lion Air, Citilink, &amp;
                      Sriwijaya.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                    <span className="font-black text-[#FF9500]">T2</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-black">Terminal 2</h5>
                    <p className="text-sm text-gray-400 font-medium">
                      Penerbangan domestik &amp; internasional maskapai
                      terpilih.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-[#1a1a1a] rounded-3xl shadow-xl text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="font-black text-[#FF9500]">T3</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-black">Terminal 3 Ultimate</h5>
                    <p className="text-sm text-gray-400 font-medium">
                      Hub utama Garuda Indonesia &amp; penerbangan internasional
                      premium.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100/50 p-6 rounded-3xl border border-orange-200 flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-[#FF9500]">
                  <Info className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-orange-900">
                  Driver kami akan menunggu di meeting point dengan papan nama
                  Anda.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1540339832862-47459980783f?auto=format&fit=crop&w=800&q=80"
                  alt="Meeting Point"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] max-w-xs space-y-4 hidden md:block border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="font-black">Parkir Area Aman</p>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Kami menggunakan area parkir resmi bandara untuk keamanan dan
                  kenyamanan penjemputan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Tarif Layanan */}
      <section className="py-10 md:py-20 bg-white" id="booking-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Transparansi Harga
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Daftar Tarif Layanan
            </h3>
          </div>

          <div className="overflow-x-auto rounded-[2.5rem] border border-gray-100 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1a1a1a] text-white text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-6">Rute Perjalanan</th>
                  <th className="px-10 py-6">Economy</th>
                  <th className="px-10 py-6">Premium</th>
                  <th className="px-10 py-6">VIP</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-gray-500">
                {[
                  {
                    route: "Bandara CGK ↔ Sudirman/Thamrin",
                    economy: "Rp 350.000",
                    premium: "Rp 750.000",
                    vip: "Rp 1.500.000",
                  },
                  {
                    route: "Bandara CGK ↔ Kelapa Gading",
                    economy: "Rp 320.000",
                    premium: "Rp 700.000",
                    vip: "Rp 1.400.000",
                  },
                  {
                    route: "Bandara CGK ↔ Bekasi City",
                    economy: "Rp 450.000",
                    premium: "Rp 900.000",
                    vip: "Rp 1.800.000",
                  },
                  {
                    route: "Bandara CGK ↔ Bogor/Puncak",
                    economy: "Rp 650.000",
                    premium: "Rp 1.200.000",
                    vip: "Rp 2.500.000",
                  },
                ].map((row, index) => (
                  <tr
                    key={row.route}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      index === 3 ? "last:border-b-0" : ""
                    }`}
                  >
                    <td className="px-10 py-6 text-[#1a1a1a] font-black">
                      {row.route}
                    </td>
                    <td className="px-10 py-6">{row.economy}</td>
                    <td className="px-10 py-6 text-[#FF9500]">{row.premium}</td>
                    <td className="px-10 py-6">{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-xs text-gray-400 font-bold">
            *Harga sudah termasuk bensin &amp; jasa driver. Belum termasuk toll
            &amp; parkir bandara.
          </p>
        </div>
      </section>

      {/* Pilihan Armada */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Pilihan Armada
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Kendaraan untuk Perjalanan Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleetOptions.map((car) => (
              <article
                key={car.name}
                className={`group bg-white rounded-[2rem] border border-gray-100 overflow-hidden ${cardShadow} hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {car.isBestSeller && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">
                      Terlaris
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black">{car.name}</h4>
                      <p className="text-gray-400 font-medium">
                        {car.category}
                      </p>
                    </div>
                    <span className="text-[#FF9500] font-black text-xl">
                      Rp {car.price}
                      <span className="text-gray-400 text-sm font-normal tracking-normal">
                        /hari
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <Car className="w-4 h-4" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <Fuel className="w-4 h-4" />
                      <span>{car.fuelType}</span>
                    </div>
                  </div>

                  <a
                    href="#booking-section"
                    className="block w-full text-center bg-[#1a1a1a] text-white py-4 rounded-xl font-black text-sm hover:bg-black transition-colors"
                  >
                    Lihat Detail
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Booking Mudah */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Cara Memesan
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Proses Booking Mudah
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-24 right-24 h-px bg-gray-100" />

            {[
              {
                icon: CalendarCheck,
                title: "Select & Time",
                desc: "Pilih bandara dan waktu penjemputan.",
              },
              {
                icon: Car,
                title: "Choose Vehicle",
                desc: "Pilih kelas armada sesuai kebutuhan Anda.",
              },
              {
                icon: MapPin,
                title: "Confirm Pickup",
                desc: "Tentukan terminal & titik temu yang tepat.",
              },
              {
                icon: CreditCard,
                title: "Payment & Done",
                desc: "Bayar via aplikasi dan selesai!",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="relative z-10 text-center space-y-6 group"
              >
                <div className="w-24 h-24 bg-white rounded-[2rem] border border-gray-100 shadow-xl flex items-center justify-center mx-auto group-hover:bg-[#FF9500] group-hover:text-white transition-all duration-500">
                  <step.icon className="text-4xl w-10 h-10" />
                </div>
                <h5 className="text-xl font-black">{step.title}</h5>
                <p className="text-sm text-gray-400 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknologi Cerdas */}
      <section className="py-10 md:py-20 bg-[#1a1a1a] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
                  Teknologi Cerdas
                </h2>
                <h3 className="text-4xl font-black tracking-tight text-white">
                  Pelacakan Real-time &amp; Driver Contact
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF9500]/20 flex items-center justify-center text-[#FF9500]">
                    <Navigation className="text-2xl" />
                  </div>
                  <h5 className="text-lg font-black text-white">
                    Live Tracking
                  </h5>
                  <p className="text-sm text-gray-500 font-medium">
                    Pantau lokasi driver Anda secara akurat melalui peta
                    interaktif.
                  </p>
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF9500]/20 flex items-center justify-center text-[#FF9500]">
                    <CreditCard className="text-2xl" />
                  </div>
                  <h5 className="text-lg font-black text-white">Direct Chat</h5>
                  <p className="text-sm text-gray-500 font-medium">
                    Komunikasi instan via WhatsApp untuk koordinasi penjemputan.
                  </p>
                </div>
              </div>

              <p className="text-gray-400 font-medium italic border-l-4 border-[#FF9500] pl-6">
                Transparansi adalah kunci layanan kami. Anda tahu siapa yang
                menjemput dan kapan mereka tiba.
              </p>
            </div>

            <div className="relative flex justify-center">
              <div className="w-full max-w-[320px] aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-8 border-white/10 shadow-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80"
                  alt="App tracking showcase"
                  width={400}
                  height={760}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 px-6 text-center text-white">
                  <p className="text-xs font-black uppercase tracking-widest text-[#FF9500] mb-1">
                    Driver On Way
                  </p>
                  <p className="text-lg font-black">Budi Santoso</p>
                  <p className="text-xs text-gray-400">
                    Toyota Innova Zenix • B 1234 EASE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Menarik */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Penawaran Spesial
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Promo Menarik Untuk Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-[#FF9500] rounded-[2.5rem] text-white shadow-xl shadow-orange-900/10 space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
                <Ticket className="text-3xl" />
              </div>
              <h4 className="text-2xl font-black">Diskon Perdana</h4>
              <p className="text-sm font-medium opacity-90">
                Dapatkan potongan Rp 50.000 untuk pemesanan pertama Anda.
              </p>
              <p className="text-xs font-black uppercase tracking-widest bg-white/20 inline-block px-4 py-2 rounded-lg">
                Kode: FLYEASE
              </p>
            </div>

            <div className="p-10 bg-[#1a1a1a] rounded-[2.5rem] text-white shadow-xl shadow-black/10 space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <Users className="text-3xl" />
              </div>
              <h4 className="text-2xl font-black">Group Booking</h4>
              <p className="text-sm font-medium opacity-80">
                Pesan 3 unit sekaligus dan hemat hingga 20% biaya total.
              </p>
              <a
                href="#"
                id="promo-group"
                className="text-xs font-black uppercase tracking-widest text-[#FF9500] hover:underline"
              >
                Cek Detail
              </a>
            </div>

            <div className="p-10 bg-gray-50 rounded-[2.5rem] text-[#1a1a1a] border border-gray-100 space-y-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]">
              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center">
                <Gift className="text-3xl text-[#FF9500]" />
              </div>
              <h4 className="text-2xl font-black">Loyalty Points</h4>
              <p className="text-sm font-medium text-gray-400">
                Kumpulkan poin dan tukarkan dengan gratis upgrade armada.
              </p>
              <a
                href="#"
                id="promo-loyalty"
                className="text-xs font-black uppercase tracking-widest text-[#FF9500] hover:underline"
              >
                Tukar Poin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              FAQ
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Pertanyaan Umum
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`bg-white rounded-[2rem] border border-gray-100 ${cardShadow} overflow-hidden`}
              >
                <input type="checkbox" id={faq.id} className="peer hidden" />
                <label
                  htmlFor={faq.id}
                  className="flex justify-between items-center p-8 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-black text-lg">{faq.question}</span>
                  <ChevronDown className="text-gray-400 transition-transform peer-checked:rotate-180 w-5 h-5" />
                </label>
                <div className="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out peer-checked:max-h-52 px-8 pb-8">
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-16">
          <div className="space-y-4">
            <div className="flex justify-center gap-1 mb-6 text-[#FF9500]">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="text-2xl w-6 h-6" />
              ))}
            </div>
            <h3 className="text-4xl font-black">Apa Kata Mereka?</h3>
            <p className="text-gray-400 font-medium">
              Trusted by 50,000+ happy travelers in Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                name: "Andi Wijaya",
                role: "Frequent Traveler",
                text: "Driver standby tepat waktu di Terminal 3. Mobilnya bersih dan wangi. Sangat recommended untuk urusan bisnis!",
                highlighted: false,
                avatar: "https://i.pravatar.cc/150?u=1",
              },
              {
                name: "Sisca Melina",
                role: "Holiday Traveler",
                text: "Pertama kali pakai VIP class untuk jemput tamu penting. Alphard-nya sangat terawat dan driver sangat sopan.",
                highlighted: true,
                avatar: "https://i.pravatar.cc/150?u=2",
              },
              {
                name: "Bambang S.",
                role: "Business Owner",
                text: "Harganya sangat kompetitif dibandingkan taksi bandara biasa, tapi layanannya jauh lebih premium.",
                highlighted: false,
                avatar: "https://i.pravatar.cc/150?u=3",
              },
            ].map((item) => (
              <article
                key={item.name}
                className={`p-10 rounded-[2.5rem] space-y-8 ${
                  item.highlighted
                    ? "bg-[#1a1a1a] text-white"
                    : `bg-white border border-gray-100 ${cardShadow} text-[#1a1a1a]`
                }`}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-black">{item.name}</p>
                    <p
                      className={`text-xs ${
                        item.highlighted ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-medium leading-relaxed ${
                    item.highlighted ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-20 bg-[#FF9500] relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10 space-y-12">
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight text-balance">
            Siap Untuk Perjalanan Nyaman Ke Bandara?
          </h3>
          <p className="text-xl text-white/80 font-medium">
            Pesan sekarang dan nikmati diskon khusus pemesanan via website.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#booking-section"
              id="final-book-btn"
              className="px-12 py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg flex items-center gap-3 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
            >
              Pesan Transfer Sekarang
            </a>
            <a
              href="/kontak"
              id="final-contact-btn"
              className="px-12 py-5 bg-white text-[#1a1a1a] rounded-2xl font-black text-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
