import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRight,
  CalendarClock,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  IdCard,
  KeyRound,
  Minus,
  ShieldCheck,
  ShieldPlus,
  UserCheck,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sewa Lepas Kunci - DriveEase Indonesia",
  description:
    "Layanan sewa mobil lepas kunci modern dengan armada terawat dan proses pemesanan instan dari DriveEase Indonesia.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const benefits = [
  {
    title: "Fleksibilitas",
    description:
      "Pesan kapan saja, kembalikan sesuai keinginan Anda tanpa terikat jadwal supir. Kontrol penuh di tangan Anda.",
    icon: CalendarClock,
  },
  {
    title: "Harga Kompetitif",
    description:
      "Tarif transparan tanpa biaya tersembunyi. Hemat hingga 40% dibandingkan rental dengan jasa pengemudi.",
    icon: Wallet,
  },
  {
    title: "Asuransi Lengkap",
    description:
      "Perlindungan menyeluruh selama perjalanan untuk ketenangan pikiran Anda. Klaim mudah dan transparan.",
    icon: ShieldCheck,
  },
] as const;

const requirements = [
  {
    title: "Umur Minimum 21 Tahun",
    subtitle: "Memiliki kedewasaan berkendara yang cukup.",
    icon: UserCheck,
  },
  {
    title: "SIM A / Internasional Valid",
    subtitle: "Surat izin mengemudi yang masih berlaku.",
    icon: IdCard,
  },
  {
    title: "Dokumen KTP/Paspor",
    subtitle: "Identitas diri asli untuk verifikasi data.",
    icon: FileText,
  },
  {
    title: "Kartu Kredit untuk Deposit",
    subtitle: "Jaminan keamanan untuk unit kendaraan.",
    icon: CreditCard,
  },
] as const;

const steps = [
  {
    step: 1,
    title: "Pilih Armada",
    subtitle: "Temukan mobil yang sesuai gaya Anda.",
    icon: CarFront,
  },
  {
    step: 2,
    title: "Verifikasi Data",
    subtitle: "Upload dokumen secara digital dan aman.",
    icon: UserCheck,
  },
  {
    step: 3,
    title: "Pilih Asuransi",
    subtitle: "Atur tingkat perlindungan perjalanan.",
    icon: ShieldPlus,
  },
  {
    step: 4,
    title: "Pembayaran",
    subtitle: "Bayar via transfer, kartu, atau e-wallet.",
    icon: Wallet,
  },
  {
    step: 5,
    title: "Ambil Kunci",
    subtitle: "Kunci dikirim atau ambil di titik terdekat.",
    icon: KeyRound,
  },
] as const;

const packages = [
  {
    id: "daily",
    name: "Paket Harian",
    price: "Rp 350.000",
    unit: "/hari",
    highlighted: false,
    features: [
      { label: "Basic Maintenance", included: true },
      { label: "Standard Insurance", included: true },
      { label: "Fuel Discount", included: false },
    ],
  },
  {
    id: "weekly",
    name: "Paket Mingguan",
    price: "Rp 2.100.000",
    unit: "/minggu",
    highlighted: true,
    badge: "Best Seller",
    features: [
      { label: "Premium Maintenance", included: true },
      { label: "Standard Insurance", included: true },
      { label: "10% Fuel Discount", included: true },
    ],
  },
  {
    id: "monthly",
    name: "Paket Bulanan",
    price: "Rp 8.500.000",
    unit: "/bulan",
    highlighted: false,
    features: [
      { label: "Full Maintenance", included: true },
      { label: "Premium Insurance", included: true },
      { label: "25% Fuel Discount", included: true },
    ],
  },
] as const;

type InsuranceOption = {
  name: string;
  price: string;
  unit: string;
  description: string;
  highlighted?: boolean;
  badge?: string;
};

const insuranceOptions: InsuranceOption[] = [
  {
    name: "Basic Coverage",
    price: "Rp 50.000",
    unit: "/ hari",
    description:
      "Perlindungan standar untuk kecelakaan ringan. Biaya risiko sendiri tetap berlaku sebesar Rp 500.000 per kejadian.",
  },
  {
    name: "Premium Coverage",
    price: "Rp 150.000",
    unit: "/ hari",
    description:
      "Perlindungan komprehensif termasuk asuransi pihak ketiga. Biaya risiko sendiri dibebaskan sepenuhnya (Zero Excess).",
    highlighted: true,
    badge: "Direkomendasikan",
  },
  {
    name: "Super Coverage",
    price: "Rp 250.000",
    unit: "/ hari",
    description:
      "Perlindungan total termasuk penggantian barang hilang di dalam mobil dan asuransi kecelakaan pengemudi/penumpang.",
  },
];

type ComparisonState = "check" | "minus" | "x";

type ComparisonRow = {
  label: string;
  selfDrive: ComparisonState;
  withDriver: ComparisonState;
  others: ComparisonState;
};

const comparisonRows: readonly ComparisonRow[] = [
  {
    label: "Fleksibilitas Waktu",
    selfDrive: "check",
    withDriver: "minus",
    others: "x",
  },
  {
    label: "Privasi Penumpang",
    selfDrive: "check",
    withDriver: "x",
    others: "minus",
  },
  {
    label: "Harga Terjangkau",
    selfDrive: "check",
    withDriver: "minus",
    others: "minus",
  },
  {
    label: "Kebebasan Rute",
    selfDrive: "check",
    withDriver: "minus",
    others: "x",
  },
] as const;

const faqs = [
  {
    id: "faq-age",
    question: "Berapa umur minimum untuk menyewa mobil?",
    answer:
      "Umur minimum adalah 21 tahun dengan kepemilikan SIM A minimal 1 tahun untuk memastikan pengalaman berkendara yang aman bagi penyewa dan unit kami.",
  },
  {
    id: "faq-docs",
    question: "Apa saja dokumen yang diperlukan?",
    answer:
      "Anda perlu mengupload foto KTP (atau Paspor bagi WNA), SIM A yang masih berlaku, dan Kartu Kredit dengan nama yang sama untuk keperluan deposit jaminan.",
  },
  {
    id: "faq-payment",
    question: "Bagaimana prosedur pembayaran?",
    answer:
      "Pembayaran dilakukan secara penuh di muka melalui berbagai metode seperti Transfer Bank, Kartu Kredit, atau E-wallet (OVO/GoPay/Dana) melalui sistem payment gateway kami yang aman.",
  },
  {
    id: "faq-insurance",
    question: "Apa saja yang termasuk dalam asuransi?",
    answer:
      "Asuransi dasar meliputi perlindungan terhadap kerusakan unit kendaraan. Anda dapat mengupgrade ke Premium atau Super Coverage untuk perlindungan pihak ketiga dan bebas biaya risiko sendiri.",
  },
] as const;

export default function Page() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-screen md:h-[85vh] flex items-center overflow-hidden bg-[#1a1a1a] pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80"
            alt="Self drive car rental hero"
            fill
            priority
            className="w-full h-full object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 w-full">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-black uppercase tracking-[0.2em] text-[#FF9500] backdrop-blur-sm">
              <KeyRound className="w-4 h-4" />
              Rental Lepas Kunci
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]">
              Kebebasan Berkendara{" "}
              <span className="text-[#FF9500]">Tanpa Batasan</span>
            </h1>

            <p className="text-xl text-gray-300 font-medium leading-relaxed opacity-90">
              Nikmati privasi penuh dan fleksibilitas rute perjalanan Anda
              dengan layanan sewa mobil lepas kunci dari DriveEase. Armada
              terawat, proses instan.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#packages-section"
                id="hero-book-btn"
                className="px-10 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
              >
                Mulai Pesan Sekarang
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#requirement-section"
                id="hero-info-btn"
                className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
              >
                Pelajari Syarat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mengapa DriveEase */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Mengapa DriveEase
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Kenyamanan yang Kami Tawarkan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className={`bg-white p-12 rounded-[2.5rem] ${cardShadow} hover:-translate-y-2 hover:shadow-2xl transition-all`}
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8">
                  <Icon className="text-3xl text-[#FF9500]" />
                </div>
                <h4 className="text-2xl font-black mb-4">{title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Persyaratan Pengemudi */}
      <section id="requirement-section" className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
                  Kualifikasi
                </h2>
                <h3 className="text-4xl font-black tracking-tight leading-tight">
                  Persyaratan Pengemudi
                </h3>
                <p className="text-lg text-gray-500 font-medium">
                  Untuk menjaga keamanan dan kenyamanan bersama, kami menerapkan
                  standar dokumen berikut:
                </p>
              </div>

              <div className="space-y-4">
                {requirements.map(({ title, subtitle, icon: Icon }) => (
                  <div
                    key={title}
                    className={`bg-white p-6 rounded-3xl flex items-center gap-6 ${cardShadow}`}
                  >
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                      <Icon className="text-2xl text-[#FF9500]" />
                    </div>
                    <div>
                      <p className="font-black">{title}</p>
                      <p className="text-sm text-gray-400 font-bold">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                  alt="Verification car"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 bg-[#1a1a1a] p-10 rounded-[2rem] text-white shadow-2xl hidden md:block max-w-[300px]">
                <p className="text-xs font-black text-[#FF9500] uppercase tracking-widest mb-4">
                  Verifikasi Digital
                </p>
                <p className="text-xl font-black leading-tight mb-4">
                  Proses verifikasi dokumen hanya butuh 15 menit melalui
                  aplikasi.
                </p>
                <Zap className="text-3xl text-[#FF9500]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proses Sewa Dalam 5 Langkah */}
      <section className="py-10 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Alur Perjalanan
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Proses Sewa Dalam 5 Langkah
            </h3>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="text-center space-y-6 group flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl card-shadow border border-gray-100 flex items-center justify-center mx-auto group-hover:bg-[#FF9500] group-hover:text-white transition-all duration-500">
                    <item.icon className="text-3xl" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-[#FF9500] uppercase tracking-widest">
                      Step {item.step}
                    </p>
                    <h5 className="text-xl font-black">{item.title}</h5>
                    <p className="text-xs text-gray-400 font-bold">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilihan Paket */}
      <section id="packages-section" className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Pilihan Paket
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Hemat Lebih Banyak
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className={`p-10 rounded-[2.5rem] flex flex-col justify-between items-center text-center space-y-8 ${
                  pkg.highlighted
                    ? "bg-[#1a1a1a] text-white shadow-2xl relative overflow-hidden"
                    : `bg-white ${cardShadow}`
                }`}
              >
                {pkg.highlighted && pkg.badge && (
                  <div className="absolute top-0 right-0 bg-[#FF9500] px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest text-white">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-2">
                  <h4
                    className={`text-xl font-black uppercase tracking-widest ${
                      pkg.highlighted ? "text-[#FF9500]" : "text-gray-400"
                    }`}
                  >
                    {pkg.name}
                  </h4>
                  <p className="text-4xl font-black">
                    {pkg.price}
                    <span
                      className={`text-sm ${
                        pkg.highlighted ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </p>
                </div>

                <ul className="space-y-4 text-sm font-bold w-full text-left">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-center gap-3 ${
                        feature.included
                          ? pkg.highlighted
                            ? "text-gray-400"
                            : "text-gray-500"
                          : "text-gray-400 opacity-60"
                      }`}
                    >
                      {feature.included ? (
                        <CheckCircle2 className="text-[#FF9500]" />
                      ) : (
                        <XCircle className="text-gray-300" />
                      )}
                      {feature.label}
                    </li>
                  ))}
                </ul>

                <button
                  id={`package-${pkg.id}-btn`}
                  type="button"
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    pkg.highlighted
                      ? "bg-[#FF9500] text-white hover:bg-[#E68600] shadow-xl shadow-orange-900/20"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  Pilih Paket
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pilihan Asuransi */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Proteksi Tambahan
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Pilihan Asuransi Kami
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insuranceOptions.map((option) => (
              <article
                key={option.name}
                className={`p-10 rounded-[2rem] space-y-8 border ${
                  option.highlighted
                    ? "bg-[#1a1a1a] text-white border-[#FF9500] shadow-2xl relative"
                    : "bg-gray-50 border-gray-100 hover:border-[#FF9500] transition-all group"
                }`}
              >
                {option.highlighted && option.badge && (
                  <div className="absolute -top-4 left-10 bg-[#FF9500] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                    {option.badge}
                  </div>
                )}

                <h5 className="text-2xl font-black">{option.name}</h5>
                <p className="text-4xl font-black">
                  {option.price}
                  <span
                    className={`text-xs uppercase tracking-widest ml-2 ${
                      option.highlighted ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {option.unit}
                  </span>
                </p>
                <div
                  className={`h-px ${
                    option.highlighted ? "bg-white/10" : "bg-gray-200"
                  }`}
                />
                <p
                  className={`text-sm font-medium leading-relaxed ${
                    option.highlighted ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {option.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Perbandingan Layanan */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Head to Head
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              Perbandingan Layanan
            </h3>
          </div>

          <div className="bg-white rounded-[3rem] overflow-hidden card-shadow border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1a1a1a] text-white">
                <tr>
                  <th className="p-10 text-xl font-black">Fitur</th>
                  <th className="p-10 text-xl font-black bg-[#FF9500]/90 text-center">
                    Lepas Kunci
                  </th>
                  <th className="p-10 text-xl font-black text-center">
                    Sewa Supir
                  </th>
                  <th className="p-10 text-xl font-black text-center">
                    Rental Lain
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={
                      idx !== comparisonRows.length - 1
                        ? "border-b border-gray-50"
                        : ""
                    }
                  >
                    <td className="p-8 text-gray-400">{row.label}</td>
                    <td className="p-8 bg-orange-50/30 text-center">
                      {row.selfDrive === "check" ? (
                        <CheckCircle2 className="text-2xl text-[#FF9500] mx-auto" />
                      ) : row.selfDrive === "x" ? (
                        <XCircle className="text-2xl text-red-300 mx-auto" />
                      ) : (
                        <Minus className="text-gray-200 mx-auto" />
                      )}
                    </td>
                    <td className="p-8 text-center">
                      {row.withDriver === "check" ? (
                        <CheckCircle2 className="text-2xl text-[#FF9500] mx-auto" />
                      ) : row.withDriver === "x" ? (
                        <XCircle className="text-2xl text-red-300 mx-auto" />
                      ) : (
                        <Minus className="text-gray-200 mx-auto" />
                      )}
                    </td>
                    <td className="p-8 text-center">
                      {row.others === "check" ? (
                        <CheckCircle2 className="text-2xl text-[#FF9500] mx-auto" />
                      ) : row.others === "x" ? (
                        <XCircle className="text-2xl text-red-300 mx-auto" />
                      ) : (
                        <Minus className="text-gray-200 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.2em]">
              Info Lebih Lanjut
            </h2>
            <h3 className="text-4xl font-black tracking-tight">
              FAQ Pelanggan
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className={`group bg-gray-50 rounded-[2rem] border border-gray-100 p-8 cursor-pointer open:bg-white open:shadow-xl transition-all ${cardShadow}`}
              >
                <summary className="flex justify-between items-center list-none">
                  <h5 className="text-lg font-black">{faq.question}</h5>
                  <ChevronDown className="text-2xl text-[#FF9500] transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-6 text-gray-500 font-medium leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#FF9500]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center space-y-12">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Siap Menyetir Mobil Impian Anda Hari Ini?
          </h2>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Ribuan pelanggan telah menikmati kebebasan berkendara bersama
            DriveEase. Kini giliran Anda mengeksplorasi setiap sudut kota dengan
            gaya.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#packages-section"
              id="cta-bottom-book"
              className="px-12 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
            >
              Pesan Sekarang
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="/kontak"
              id="cta-bottom-contact"
              className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
