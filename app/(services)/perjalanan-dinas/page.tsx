import type { Metadata } from "next";
import Image from "next/image";

import {
  BarChart3,
  Briefcase,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Coffee,
  CreditCard,
  Database,
  FileText,
  Globe2,
  LayoutDashboard,
  Layers,
  Monitor,
  Navigation,
  PieChart,
  PlayCircle,
  Plug,
  Rocket,
  Settings,
  ShieldCheck,
  Smartphone,
  TrendingDown,
  UserCheck,
  UserPlus,
  Users2,
  Wallet,
  XCircle,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Perjalanan Dinas - DriveEase Corporate Solutions",
  description:
    "Solusi perjalanan dinas korporat dengan corporate rate, fleet management, reporting terpusat, dan dukungan prioritas 24/7 untuk bisnis Anda.",
};

const cardShadow =
  "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100";

const corporateFeatures = [
  {
    title: "Corporate Rate",
    description:
      "Tarif khusus yang kompetitif untuk volume penyewaan besar bagi mitra bisnis kami.",
    icon: TrendingDown,
  },
  {
    title: "Invoicing & Reporting",
    description:
      "Sistem penagihan terpusat dan laporan perjalanan terperinci untuk audit keuangan.",
    icon: FileText,
  },
  {
    title: "Fleet Management",
    description:
      "Pantau dan kelola penggunaan armada bisnis melalui satu dashboard yang intuitif.",
    icon: LayoutDashboard,
  },
  {
    title: "Dedicated Support",
    description:
      "Bantuan khusus dari Account Manager kami yang siap melayani kebutuhan mendesak.",
    icon: UserCheck,
  },
] as const;

const businessPackages = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Untuk startup & perusahaan berkembang.",
    label: "Mulai Dari",
    price: "Rp 4.9jt",
    unit: "/bln",
    highlighted: false,
    features: [
      { label: "1-10 Unit Kendaraan", included: true },
      { label: "Priority Booking", included: true },
      { label: "Bulanan Invoicing", included: true },
      { label: "Dedicated Account Manager", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Solusi komprehensif untuk perusahaan menengah.",
    label: "Mulai Dari",
    price: "Rp 14.5jt",
    unit: "/bln",
    highlighted: true,
    badge: "Pilihan Populer",
    features: [
      { label: "11-50 Unit Kendaraan", included: true },
      { label: "Dedicated Account Manager", included: true },
      { label: "Weekly Travel Reports", included: true },
      { label: "API Integration Access", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Kustomisasi penuh untuk skala korporat besar.",
    label: "Tarif Khusus",
    price: "Custom",
    unit: "Price",
    highlighted: false,
    features: [
      { label: "50+ Unit Kendaraan", included: true },
      { label: "Dedicated Fleet Manager", included: true },
      { label: "Custom Policy & Integration", included: true },
      { label: "White-label Client Portal", included: true },
    ],
  },
] as const;

const extraBenefits = [
  {
    title: "Priority Booking",
    description:
      "Pemesanan otomatis mendapat prioritas utama bahkan di musim liburan tinggi.",
    icon: Clock,
  },
  {
    title: "Flexible Cancellation",
    description:
      "Kebijakan pembatalan fleksibel yang menyesuaikan dinamika jadwal bisnis Anda.",
    icon: XCircle,
  },
  {
    title: "Digital Invoice",
    description:
      "Semua tagihan terkirim otomatis ke departemen keuangan Anda setiap bulan.",
    icon: Wallet,
  },
  {
    title: "Real-time Tracking",
    description:
      "Pantau posisi armada dan status perjalanan karyawan secara langsung.",
    icon: Navigation,
  },
  {
    title: "Custom Reports",
    description:
      "Analisis pengeluaran transportasi bulanan dengan laporan yang bisa disesuaikan.",
    icon: BarChart3,
  },
  {
    title: "Expense Management",
    description:
      "Integrasikan biaya transportasi langsung ke sistem reimbursement perusahaan.",
    icon: CreditCard,
  },
] as const;

type OnboardingStep = {
  step: number;
  title: string;
  duration: string;
  description: string;
  icon: typeof Coffee;
  highlighted?: boolean;
};

const onboardingSteps: readonly OnboardingStep[] = [
  {
    step: 1,
    title: "Konsultasi Gratis",
    duration: "30 Menit",
    description:
      "Identifikasi kebutuhan mobilitas perusahaan Anda bersama ahli kami.",
    icon: Coffee,
    highlighted: true,
  },
  {
    step: 2,
    title: "Demo Platform",
    duration: "1 Jam",
    description:
      "Uji coba dashboard dan fitur manajemen armada secara langsung.",
    icon: Monitor,
  },
  {
    step: 3,
    title: "Setup Akun",
    duration: "1-2 Hari",
    description:
      "Konfigurasi parameter kebijakan dan integrasi sistem penagihan.",
    icon: Settings,
  },
  {
    step: 4,
    title: "Training Tim",
    duration: "1 Hari",
    description:
      "Pelatihan komprehensif untuk admin dan tim operasional perusahaan.",
    icon: Users2,
  },
  {
    step: 5,
    title: "Go Live",
    duration: "Instan",
    description:
      "Mulai perjalanan bisnis Anda dengan dukungan penuh 24/7.",
    icon: Rocket,
    highlighted: true,
  },
];

const caseStudies = [
  {
    logoLabel: "LOGO CO",
    quote:
      '"Beralih ke DriveEase adalah keputusan terbaik untuk efisiensi operasional kami. Biaya transportasi terpangkas drastis."',
    metric: "30% Save",
    metricLabel: "Biaya Transportasi",
    company: "PT. Maju Jaya Abadi",
    industry: "Logistics & Supply Chain",
    dark: false,
  },
  {
    logoLabel: "TECH LOGO",
    quote:
      '"Dashboard manajemen armada mereka sangat intuitif. Kami sekarang punya kontrol penuh atas setiap perjalanan dinas tim."',
    metric: "25% Efficiency",
    metricLabel: "Manajemen Waktu",
    company: "TechCorp Indonesia",
    industry: "Software Development",
    dark: true,
  },
  {
    logoLabel: "BANK LOGO",
    quote:
      '"Kualitas unit mobil selalu prima dan dukungan Account Manager sangat responsif untuk kebutuhan mendadak direksi kami."',
    metric: "4.9/5 Rate",
    metricLabel: "Kepuasan Karyawan",
    company: "Bank Central Nusantara",
    industry: "Banking & Finance",
    dark: false,
  },
] as const;

const dashboardFeatures = [
  { label: "Dashboard Analytics", icon: PieChart },
  { label: "Multi-location Mgmt", icon: Globe2 },
  { label: "Self-service Portal", icon: UserPlus },
  { label: "Cost Center Alloc.", icon: Layers },
  { label: "Accounting Integration", icon: Database },
  { label: "Compliance Audit", icon: ShieldCheck },
  { label: "Mobile App Access", icon: Smartphone },
  { label: "Full API Support", icon: Plug },
] as const;

const faqs = [
  {
    id: "faq-implementation-time",
    question: "Berapa lama proses implementasi?",
    answer:
      "Rata-rata proses dari konsultasi hingga go-live memakan waktu 3-5 hari kerja tergantung kompleksitas integrasi.",
  },
  {
    id: "faq-setup-fee",
    question: "Apakah ada biaya setup awal?",
    answer:
      "Untuk paket Professional dan Enterprise, biaya setup sudah termasuk dalam biaya langganan bulanan tanpa biaya tersembunyi.",
  },
  {
    id: "faq-integration",
    question: "Bisa terintegrasi dengan sistem kami?",
    answer:
      "Ya, kami memiliki API terbuka yang memungkinkan integrasi dengan sistem HRIS, accounting, dan ERP perusahaan Anda.",
  },
  {
    id: "faq-support",
    question: "Support tersedia 24/7?",
    answer:
      "Tentu. Kami menyediakan dukungan teknis dan operasional penuh 24 jam sehari, 7 hari seminggu untuk memastikan perjalanan bisnis Anda lancar.",
  },
] as const;

export default function Page() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center bg-[#1a1a1a] overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Corporate background"
            fill
            priority
            className="w-full h-full object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-[#FF9500] text-xs font-black uppercase tracking-[0.2em]">
              <Briefcase className="w-4 h-4" />
              Solusi Korporat Terpercaya
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95]">
              Solusi Perjalanan <span className="text-[#FF9500]">Dinas</span>{" "}
              Perusahaan Anda
            </h1>

            <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
              Kelola armada kendaraan bisnis dengan efisiensi tinggi, laporan
              transparan, dan dukungan prioritas 24/7 untuk mendukung mobilitas
              tim Anda.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#packages"
                id="hero-demo-btn"
                className="px-10 py-5 bg-[#FF9500] text-white rounded-2xl font-black text-lg hover:bg-[#E68600] transition-transform duration-300 shadow-xl shadow-orange-500/20 flex items-center gap-3 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
              >
                Minta Demo Gratis
                <PlayCircle className="w-5 h-5" />
              </a>
              <a
                href="/kontak"
                id="hero-sales-btn"
                className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
              >
                Hubungi Tim Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Korporat Utama */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateFeatures.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="bg-gray-50 p-10 rounded-[2rem] space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className="text-3xl text-[#FF9500]" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">{title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pilihan Paket Bisnis */}
      <section id="packages" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Pilihan Paket Bisnis
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">
              Didesain Untuk Skala Bisnis Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {businessPackages.map((pkg) => (
              <article
                key={pkg.id}
                className={`p-12 rounded-[2.5rem] flex flex-col space-y-10 ${
                  pkg.highlighted
                    ? "bg-[#1a1a1a] text-white shadow-2xl relative overflow-hidden"
                    : `bg-white ${cardShadow}`
                }`}
              >
                {pkg.highlighted && pkg.badge && (
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-[#FF9500] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <h4
                    className={`text-2xl font-black uppercase tracking-widest ${
                      pkg.highlighted ? "text-[#FF9500]" : "text-gray-400"
                    }`}
                  >
                    {pkg.name}
                  </h4>
                  <p
                    className={`text-lg font-medium ${
                      pkg.highlighted ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {pkg.tagline}
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  {pkg.features.map((feature) => (
                    <div
                      key={feature.label}
                      className={`flex items-center gap-3 font-bold ${
                        pkg.highlighted
                          ? "text-white"
                          : "text-gray-700"
                      } ${!feature.included ? "opacity-30" : ""}`}
                    >
                      {feature.included ? (
                        pkg.highlighted ? (
                          <CheckCircle2 className="text-[#FF9500]" />
                        ) : (
                          <CheckCircle className="text-[#FF9500]" />
                        )
                      ) : (
                        <span className="inline-flex w-5 h-5 items-center justify-center text-gray-300">
                          •
                        </span>
                      )}
                      {feature.label}
                    </div>
                  ))}
                </div>

                <div
                  className={`pt-8 border-t ${
                    pkg.highlighted ? "border-white/10" : "border-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs font-black uppercase mb-4 ${
                      pkg.highlighted ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {pkg.label}
                  </p>
                  <p
                    className={`text-4xl font-black mb-8 ${
                      pkg.highlighted ? "text-white" : "text-[#1a1a1a]"
                    }`}
                  >
                    {pkg.price}{" "}
                    <span
                      className={`text-base font-bold ${
                        pkg.highlighted ? "text-gray-500" : "text-gray-300"
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </p>
                  <button
                    id={`package-${pkg.id}-btn`}
                    type="button"
                    className={`w-full py-5 rounded-2xl font-black transition-all ${
                      pkg.highlighted
                        ? "bg-[#FF9500] text-white hover:bg-[#E68600]"
                        : pkg.id === "enterprise"
                        ? "bg-[#1a1a1a] text-white hover:bg-black"
                        : "bg-gray-50 text-[#1a1a1a] hover:bg-gray-100"
                    }`}
                  >
                    {pkg.id === "enterprise"
                      ? "Hubungi Tim Sales"
                      : `Pilih ${pkg.name}`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Tambahan Korporat */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-20 gap-x-12">
            {extraBenefits.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon className="text-2xl text-[#FF9500]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black">{title}</h4>
                  <p className="text-gray-500 font-medium">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Langkah Bergabung */}
      <section className="py-32 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Langkah Bergabung
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Proses Implementasi Cepat
            </h3>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-4">
            {/* Garis penghubung di belakang step (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[repeating-linear-gradient(to_right,transparent,transparent_5px,#e5e7eb_5px,#e5e7eb_10px)]" />

            {onboardingSteps.map((step) => {
              const Icon = step.icon;
              const isHighlighted = step.highlighted;

              return (
                <div
                  key={step.step}
                  className="relative flex-1 text-center space-y-6 z-10"
                >
                  <div
                    className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-3xl font-black shadow-xl relative z-10 ${
                      isHighlighted
                        ? "bg-[#FF9500] text-white shadow-orange-500/20"
                        : "bg-white/5 text-white border border-white/10"
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xl font-black text-white">
                      {step.step}. {step.title}
                    </h5>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                      {step.duration}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed px-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studi Kasus */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-xs font-black text-[#FF9500] uppercase tracking-[0.3em]">
              Studi Kasus
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">
              Kisah Sukses Mitra Kami
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((item) => (
              <article
                key={item.company}
                className={`p-12 rounded-[2.5rem] space-y-10 flex flex-col ${
                  item.dark
                    ? "bg-[#1a1a1a] text-white shadow-2xl"
                    : "bg-gray-50 text-[#1a1a1a]"
                }`}
              >
                <div
                  className={`h-12 w-32 rounded flex items-center justify-center font-black italic shrink-0 ${
                    item.dark
                      ? "bg-white/10 text-white/30"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {item.logoLabel}
                </div>
                <p
                  className={`text-lg font-bold italic flex-1 leading-relaxed ${
                    item.dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.quote}
                </p>
                <div
                  className={`pt-8 border-t ${
                    item.dark ? "border-white/10" : "border-gray-200"
                  }`}
                >
                  <p className="text-3xl font-black text-[#FF9500]">
                    {item.metric}
                  </p>
                  <p
                    className={`text-sm font-bold uppercase tracking-widest ${
                      item.dark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {item.metricLabel}
                  </p>
                  <p className="mt-4 font-black">{item.company}</p>
                  <p
                    className={`text-xs font-medium ${
                      item.dark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {item.industry}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Dashboard */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
          <h3 className="text-4xl font-black tracking-tight mb-20">
            Fitur Unggulan Dashboard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {dashboardFeatures.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={`bg-white p-8 rounded-3xl ${cardShadow} space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <Icon className="text-3xl text-[#FF9500] mx-auto" />
                <h6 className="font-black">{label}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-4xl font-black tracking-tight mb-16 text-center">
            Pertanyaan Umum (FAQ)
          </h3>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-100 transition-all"
              >
                <details className="group p-6 cursor-pointer">
                  <summary className="flex justify-between items-center list-none">
                    <h5 className="font-black">{faq.question}</h5>
                    <ChevronDown className="text-gray-400 transition-transform group-open:rotate-180 w-5 h-5" />
                  </summary>
                  <p className="mt-4 text-gray-500 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#FF9500]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Siap Menghemat Biaya Transportasi Perusahaan?
          </h3>
          <p className="text-xl text-orange-100 font-medium">
            Dapatkan konsultasi gratis dan strategi optimasi perjalanan dinas
            hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <a
              href="#packages"
              id="final-demo-btn"
              className="px-12 py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-black/20"
            >
              Minta Demo Gratis
            </a>
            <a
              href="/kontak"
              id="final-sales-btn"
              className="px-12 py-5 bg-white text-[#FF9500] rounded-2xl font-black text-lg hover:bg-gray-50 transition-all"
            >
              Hubungi Tim Sales
            </a>
          </div>
          <p className="text-orange-900/40 text-sm font-bold">
            Tersedia di 15+ kota besar di Indonesia
          </p>
        </div>
      </section>
    </main>
  );
}
