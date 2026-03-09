import {
  ArrowUp,
  Baby,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock9,
  Cookie,
  CreditCard,
  Database,
  Download,
  Edit3,
  Eye,
  Headphones,
  Info,
  Landmark,
  Lock,
  Mail,
  Megaphone,
  Phone,
  Printer,
  RefreshCw,
  Scale,
  Search,
  Share2,
  ShieldCheck,
  Trash2,
  Umbrella,
  UserCheck,
  Zap,
} from "lucide-react";

import appData from "@/helper/data/data.json";

const cardBase =
  "legal-card rounded-[2.5rem] relative overflow-hidden group p-8 md:p-12 border border-white/5 bg-[#242424] transition-colors";

const privacy = appData.privacy_policy;

export default function Page() {
  return (
    <main className="flex-1 bg-[#1a1a1a] text-white pt-32 pb-0 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9500]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {privacy.hero.badgeLabel}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              {privacy.hero.titlePrefix}{" "}
              <span className="text-[#FF9500]">
                {privacy.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-gray-400 font-medium text-lg max-w-2xl">
              {privacy.hero.description}
            </p>
          </div>

          <div className="space-y-2 text-center lg:text-right">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
              {privacy.hero.lastUpdatedLabel}
            </p>
            <p className="text-lg font-black">
              {privacy.hero.lastUpdatedValue}
            </p>
            <div className="flex justify-center lg:justify-end gap-3 pt-4">
              <button
                id="btn-print"
                type="button"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF9500] hover:text-white transition-all"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                id="btn-download-pdf"
                type="button"
                className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all"
              >
                <Download className="w-4 h-4" />
                Unduh PDF
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari dalam kebijakan..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF9500] text-sm font-bold transition-all text-gray-200 placeholder:text-gray-500"
              />
            </div>

            <nav className="space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">
                Daftar Isi
              </p>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                {privacy.toc.map((item, index) => (
                  <li key={item.id} className="group">
                    <a
                      href={`#${item.id}`}
                      id={`nav-link-${index + 1}`}
                      className="flex items-center gap-3 hover:text-white transition-all"
                    >
                      <span className="text-[#FF9500] opacity-50 group-hover:opacity-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 space-y-12 leading-relaxed text-gray-300">
            {/* 01 Pengantar */}
            <section id="section-1" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                01
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Info className="w-5 h-5" />
                  {privacy.sections.section1.title}
                </h2>
                <div className="space-y-6 font-medium italic">
                  {privacy.sections.section1.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* 02 Informasi yang Kami Kumpulkan */}
            <section id="section-2" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                02
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Database className="w-5 h-5" />
                  {privacy.sections.section2.title}
                </h2>
                <div className="space-y-8">
                  <p>{privacy.sections.section2.intro}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {privacy.sections.section2.cards.map((card) => (
                      <div
                        key={card.title}
                        className="bg-white/5 p-6 rounded-2xl border border-white/5"
                      >
                        <h4 className="text-[#FF9500] font-black uppercase text-xs tracking-widest mb-4">
                          {card.title}
                        </h4>
                        <ul className="space-y-2 text-sm font-medium">
                          {card.items.map((item: string) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-x-auto pt-6">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr className="text-white font-black uppercase tracking-widest text-[10px]">
                          <th className="p-4">Kategori Data</th>
                          <th className="p-4">Sumber Data</th>
                          <th className="p-4">Tujuan Pengumpulan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {privacy.sections.section2.table.map((row) => (
                          <tr
                            key={row.category}
                            className="hover:bg-white/5 transition-colors font-medium"
                          >
                            <td className="p-4">{row.category}</td>
                            <td className="p-4">{row.source}</td>
                            <td className="p-4 text-[#FF9500]">
                              {row.purpose}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 Penggunaan Data */}
            <section id="section-3" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                03
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Zap className="w-5 h-5" />
                  {privacy.sections.section3.title}
                </h2>
                <div className="space-y-6 font-medium">
                  <p>{privacy.sections.section3.intro}</p>
                  <div className="space-y-4">
                    {privacy.sections.section3.uses.map((use) => (
                      <div key={use.key} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                          {use.key === "services" && (
                            <CheckCircle className="text-[#FF9500] w-5 h-5" />
                          )}
                          {use.key === "communication" && (
                            <Mail className="text-[#FF9500] w-5 h-5" />
                          )}
                          {use.key === "analytics" && (
                            <BarChart3 className="text-[#FF9500] w-5 h-5" />
                          )}
                          {use.key === "marketing" && (
                            <Megaphone className="text-[#FF9500] w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{use.title}</h4>
                          <p className="text-sm text-gray-400">
                            {use.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 04 Basis Hukum */}
            <section id="section-4" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                04
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Scale className="w-5 h-5" />
                  {privacy.sections.section4.title}
                </h2>
                <div className="space-y-6 font-medium">
                  <p>{privacy.sections.section4.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {privacy.sections.section4.legalBases.map(
                      (basis, index) => (
                        <div
                          key={basis.key}
                          className={`p-6 bg-[#1a1a1a] rounded-2xl border-l-4 ${
                            index < 2 ? "border-[#FF9500]" : "border-gray-600"
                          }`}
                        >
                          <h4 className="text-white font-black text-sm mb-2">
                            {basis.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {basis.description}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 05 Pihak Ketiga */}
            <section id="section-5" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                05
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Share2 className="w-5 h-5" />
                  {privacy.sections.section5.title}
                </h2>
                <div className="space-y-8 font-medium">
                  <p>{privacy.sections.section5.intro}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {privacy.sections.section5.partners.map((partner) => (
                      <div
                        key={partner.key}
                        className="p-6 bg-white/5 rounded-2xl text-center space-y-4"
                      >
                        {partner.key === "paymentGateway" && (
                          <CreditCard className="text-3xl text-[#FF9500] mx-auto" />
                        )}
                        {partner.key === "insurance" && (
                          <Umbrella className="text-3xl text-[#FF9500] mx-auto" />
                        )}
                        {partner.key === "authority" && (
                          <Landmark className="text-3xl text-[#FF9500] mx-auto" />
                        )}
                        <h4 className="text-sm font-black">{partner.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">
                          {partner.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm bg-[#1a1a1a] p-6 rounded-2xl italic border border-white/5">
                    &quot;{privacy.sections.section5.note}&quot;
                  </p>
                </div>
              </div>
            </section>

            {/* 06 Keamanan Data */}
            <section id="section-6" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                06
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Lock className="w-5 h-5" />
                  {privacy.sections.section6.title}
                </h2>
                <div className="space-y-8 font-medium">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">
                        {privacy.sections.section6.security.technologyTitle}
                      </h4>
                      <ul className="space-y-3 text-sm">
                        {privacy.sections.section6.security.technologyItems.map(
                          (item: string) => (
                            <li key={item}>
                              <span className="text-[#FF9500] mr-2">•</span>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">
                        {privacy.sections.section6.security.accessControlTitle}
                      </h4>
                      <ul className="space-y-3 text-sm">
                        {privacy.sections.section6.security.accessControlItems.map(
                          (item: string) => (
                            <li key={item}>
                              <span className="text-[#FF9500] mr-2">•</span>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 07 Hak Pengguna */}
            <section id="section-7" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                07
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <UserCheck className="w-5 h-5" />
                  {privacy.sections.section7.title}
                </h2>
                <div className="space-y-6 font-medium">
                  <p>{privacy.sections.section7.intro}</p>
                  <div className="space-y-4">
                    {privacy.sections.section7.rights.map((right: string) => (
                      <div
                        key={right}
                        className="flex items-center justify-between p-6 bg-[#1a1a1a] rounded-2xl hover:border-[#FF9500] border border-transparent transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {right.startsWith("Hak Akses") && (
                            <Eye className="text-xl text-[#FF9500]" />
                          )}
                          {right.startsWith("Hak Koreksi") && (
                            <Edit3 className="text-xl text-[#FF9500]" />
                          )}
                          {right.startsWith("Hak Penghapusan") && (
                            <Trash2 className="text-xl text-red-500" />
                          )}
                          <span className="text-sm font-black">{right}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {privacy.sections.section7.contactNote.replace(
                      privacy.sections.section7.contactEmail,
                      "",
                    )}
                    <span className="text-[#FF9500] font-bold">
                      {privacy.sections.section7.contactEmail}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* 08 Cookies */}
            <section id="section-8" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                08
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Cookie className="w-5 h-5" />
                  {privacy.sections.section8.title}
                </h2>
                <div className="space-y-6 font-medium">
                  <p>{privacy.sections.section8.intro}</p>
                  <ul className="space-y-4">
                    {privacy.sections.section8.cookies.map((cookie) => (
                      <li key={cookie.number} className="flex gap-4">
                        <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 font-black text-[10px] text-[#FF9500]">
                          {cookie.number}
                        </span>
                        <p className="text-sm">
                          <span className="text-white font-bold">
                            {cookie.label}:
                          </span>{" "}
                          {cookie.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-bold text-gray-500 italic">
                    {privacy.sections.section8.footerNote}
                  </p>
                </div>
              </div>
            </section>

            {/* 09 Retensi Data */}
            <section id="section-9" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                09
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Clock9 className="w-5 h-5" />
                  {privacy.sections.section9.title}
                </h2>
                <div className="space-y-6 font-medium">
                  <p>{privacy.sections.section9.intro}</p>
                  <div className="bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/5">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5">
                        <tr className="text-gray-400 font-black uppercase tracking-widest">
                          <th className="p-5">Tipe Data</th>
                          <th className="p-5">Periode Retensi</th>
                          <th className="p-5">Alasan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {privacy.sections.section9.table.map((row) => (
                          <tr key={row.type}>
                            <td className="p-5 font-black text-white">
                              {row.type}
                            </td>
                            <td className="p-5">{row.period}</td>
                            <td className="p-5">{row.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* 10 Privasi Anak */}
            <section id="section-10" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                10
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Baby className="w-5 h-5" />
                  {privacy.sections.section10.title}
                </h2>
                <div className="space-y-6 font-medium text-sm">
                  {privacy.sections.section10.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* 11 Perubahan Kebijakan */}
            <section id="section-11" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                11
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <RefreshCw className="w-5 h-5" />
                  {privacy.sections.section11.title}
                </h2>
                <div className="space-y-6 font-medium text-sm">
                  {privacy.sections.section11.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* 12 Hubungi Kami */}
            <section id="section-12" className={cardBase}>
              <span className="section-number absolute -top-4 -right-2 text-8xl font-black text-white/5">
                12
              </span>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4 group-hover:text-[#FF9500] transition-colors">
                  <Headphones className="w-5 h-5" />
                  {privacy.sections.section12.title}
                </h2>
                <div className="space-y-8 font-medium">
                  <p>{privacy.sections.section12.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 space-y-4">
                      <h4 className="text-[#FF9500] font-black uppercase text-[10px] tracking-widest">
                        {privacy.sections.section12.dpo.title}
                      </h4>
                      <div className="flex items-center gap-3 text-white font-black">
                        <Mail className="text-xl" />
                        {privacy.sections.section12.dpo.email}
                      </div>
                      <div className="flex items-center gap-3 text-white font-black">
                        <Phone className="text-xl" />
                        {privacy.sections.section12.dpo.phone}
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 space-y-4">
                      <h4 className="text-[#FF9500] font-black uppercase text-[10px] tracking-widest">
                        {privacy.sections.section12.office.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {privacy.sections.section12.office.company}
                        <br />
                        {privacy.sections.section12.office.addressLines[0]}
                        <br />
                        {privacy.sections.section12.office.addressLines[1]}
                      </p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-white/5 text-center">
                    <button
                      id="btn-back-to-top"
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#FF9500] transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                      {privacy.sections.section12.backToTopLabel}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
