import {
  AlertCircle,
  CalendarClock,
  CheckCircle,
  ListOrdered,
  Mail,
  Printer,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import termsData from "@/helper/data/data.json";

const legalCard =
  "bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]";

const terms = termsData.terms_conditions;

export default function Page() {
  return (
    <main className="flex-1 pt-20">
      {/* Hero */}
      <section className="bg-[#1a1a1a] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF9500]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF9500] mb-8">
              <ShieldCheck className="w-4 h-4" />
              {terms.hero.badgeLabel}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
              {terms.hero.titlePrefix}{" "}
              <span className="text-[#FF9500]">
                {terms.hero.titleHighlight}
              </span>{" "}
              {terms.hero.titleSuffix}
            </h1>

            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8">
              {terms.hero.description}
            </p>

            <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
              <CalendarClock className="w-4 h-4 text-[#FF9500]" />
              {terms.hero.lastUpdatedLabel} {terms.hero.lastUpdatedValue}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* TOC */}
            <aside className="lg:col-span-4 h-fit lg:sticky lg:top-32">
              <div className="bg-[#fff7ed] p-8 rounded-[2.5rem] border border-orange-100 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#FF9500] mb-6 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  Daftar Isi
                </h3>
                <nav className="flex flex-col gap-4 text-xs font-bold text-gray-500">
                  {terms.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      id={`toc-${item.no.replace(".", "")}`}
                      className="flex items-center gap-3 text-xs font-bold text-gray-500 transition-all hover:text-[#FF9500] hover:pl-2"
                    >
                      <span>{item.no}</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>

                <div className="mt-10 pt-8 border-t border-orange-200/50">
                  <button
                    type="button"
                    className="w-full py-4 bg-[#1a1a1a] text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    Cetak Dokumen
                  </button>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* 01 Definisi */}
              <section
                id="definisi"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.definisi.number}
                  </span>
                  {terms.sections.definisi.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.definisi.intro}</p>
                  <ul className="list-none space-y-4">
                    {terms.sections.definisi.items.map((item) => (
                      <li key={item.term} className="flex gap-4">
                        <span className="text-[#FF9500] font-black shrink-0">
                          •
                        </span>
                        <div>
                          <strong className="text-[#1a1a1a]">
                            {item.term}:
                          </strong>{" "}
                          {item.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 02 Penggunaan Layanan */}
              <section
                id="penggunaan"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.penggunaan.number}
                  </span>
                  {terms.sections.penggunaan.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.penggunaan.intro}</p>
                  <ol className="list-decimal pl-5 space-y-4">
                    {terms.sections.penggunaan.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* 03 Akun Pengguna */}
              <section
                id="akun"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.akun.number}
                  </span>
                  {terms.sections.akun.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.akun.text}</p>
                </div>
              </section>

              {/* 04 Booking */}
              <section
                id="booking"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.booking.number}
                  </span>
                  {terms.sections.booking.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.booking.text}</p>
                </div>
              </section>

              {/* 05 Pembayaran */}
              <section
                id="pembayaran"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.pembayaran.number}
                  </span>
                  {terms.sections.pembayaran.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.pembayaran.text}</p>
                </div>
              </section>

              {/* 06 Refund */}
              <section
                id="refund"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.refund.number}
                  </span>
                  {terms.sections.refund.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <ul className="list-none space-y-4">
                    {terms.sections.refund.rules.map((rule) => (
                      <li key={rule.text} className="flex gap-4">
                        {rule.type === "full" && (
                          <CheckCircle className="text-green-500 mt-1 w-5 h-5" />
                        )}
                        {rule.type === "partial" && (
                          <AlertCircle className="text-orange-500 mt-1 w-5 h-5" />
                        )}
                        {rule.type === "none" && (
                          <XCircle className="text-red-500 mt-1 w-5 h-5" />
                        )}
                        <div>{rule.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 07 Liabilitas */}
              <section
                id="liabilitas"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.liabilitas.number}
                  </span>
                  {terms.sections.liabilitas.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.liabilitas.text}</p>
                </div>
              </section>

              {/* 08 Asuransi */}
              <section
                id="asuransi"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.asuransi.number}
                  </span>
                  {terms.sections.asuransi.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.asuransi.text}</p>
                </div>
              </section>

              {/* 09 Denda */}
              <section
                id="denda"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.denda.number}
                  </span>
                  {terms.sections.denda.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <ul className="list-none space-y-4">
                    {terms.sections.denda.penalties.map((penalty) => (
                      <li key={penalty.labelPrefix} className="flex gap-4">
                        <span className="font-black text-[#1a1a1a]">
                          • {penalty.labelPrefix}
                        </span>
                        <span>{penalty.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 10 Hak Cipta */}
              <section
                id="copyright"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.copyright.number}
                  </span>
                  {terms.sections.copyright.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.copyright.text}</p>
                </div>
              </section>

              {/* 11 Perubahan Syarat */}
              <section
                id="perubahan"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.perubahan.number}
                  </span>
                  {terms.sections.perubahan.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.perubahan.text}</p>
                </div>
              </section>

              {/* 12 Sengketa */}
              <section
                id="sengketa"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    {terms.sections.sengketa.number}
                  </span>
                  {terms.sections.sengketa.title}
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>{terms.sections.sengketa.text}</p>
                </div>
              </section>

              {/* Legal CTA */}
              <section className="bg-[#1a1a1a] text-white rounded-[2rem] p-12 border-none">
                <div className="max-w-xl mx-auto text-center space-y-6">
                  <h3 className="text-2xl font-black">
                    {terms.legalCta.title}
                  </h3>
                  <p className="text-gray-400">{terms.legalCta.description}</p>
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <a
                      href={`mailto:${terms.legalCta.email}`}
                      id="contact-legal-btn"
                      className="px-8 py-4 bg-[#FF9500] text-white rounded-2xl font-black text-sm hover:bg-[#E68600] transition-all flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Hubungi Tim Legal
                    </a>
                    <a
                      href={terms.legalCta.helpCenterUrl}
                      id="contact-support-btn"
                      className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-sm hover:bg-white/10 transition-all"
                    >
                      Pusat Bantuan
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
