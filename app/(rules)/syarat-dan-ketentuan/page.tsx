import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - DriveEase Indonesia",
  description:
    "Dokumen syarat dan ketentuan resmi penggunaan layanan DriveEase Indonesia. Harap baca dengan seksama sebelum menggunakan platform kami.",
};

const legalCard =
  "bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]";

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
              Legal Documentation
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
              Syarat & <span className="text-[#FF9500]">Ketentuan</span>{" "}
              DriveEase
            </h1>

            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8">
              Kebijakan penggunaan layanan penyewaan kendaraan terpadu. Harap
              baca dokumen ini dengan seksama sebelum menggunakan platform kami.
            </p>

            <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
              <CalendarClock className="w-4 h-4 text-[#FF9500]" />
              Terakhir diperbarui: 15 Januari 2024
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
                  {[
                    { id: "definisi", label: "Definisi & Interpretasi", no: "01." },
                    { id: "penggunaan", label: "Penggunaan Layanan", no: "02." },
                    { id: "akun", label: "Akun Pengguna", no: "03." },
                    { id: "booking", label: "Booking & Pemesanan", no: "04." },
                    { id: "pembayaran", label: "Kebijakan Pembayaran", no: "05." },
                    { id: "refund", label: "Pembatalan & Refund", no: "06." },
                    { id: "liabilitas", label: "Tanggung Jawab & Liabilitas", no: "07." },
                    { id: "asuransi", label: "Asuransi & Perlindungan", no: "08." },
                    { id: "denda", label: "Denda & Penalti", no: "09." },
                    { id: "copyright", label: "Hak Cipta & IP", no: "10." },
                    { id: "perubahan", label: "Perubahan Syarat", no: "11." },
                    { id: "sengketa", label: "Penyelesaian Sengketa", no: "12." },
                  ].map((item) => (
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
                    01
                  </span>
                  Definisi &amp; Interpretasi
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Dokumen ini merupakan perjanjian sah antara Pengguna dan
                    DriveEase Indonesia. Kecuali disebutkan sebaliknya,
                    istilah-istilah berikut memiliki arti sebagai berikut:
                  </p>
                  <ul className="list-none space-y-4">
                    <li className="flex gap-4">
                      <span className="text-[#FF9500] font-black shrink-0">•</span>
                      <div>
                        <strong className="text-[#1a1a1a]">Layanan:</strong> Mengacu
                        pada seluruh platform digital, aplikasi mobile, website, dan
                        jasa penyewaan kendaraan yang disediakan oleh DriveEase.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#FF9500] font-black shrink-0">•</span>
                      <div>
                        <strong className="text-[#1a1a1a]">Pengguna:</strong> Setiap
                        individu atau badan hukum yang mengakses Layanan dan/atau
                        melakukan pemesanan kendaraan.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#FF9500] font-black shrink-0">•</span>
                      <div>
                        <strong className="text-[#1a1a1a]">Kendaraan:</strong> Semua
                        jenis armada roda empat atau lebih yang disewakan melalui
                        platform DriveEase.
                      </div>
                    </li>
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
                    02
                  </span>
                  Penggunaan Layanan
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Untuk menggunakan layanan penyewaan kendaraan kami, Pengguna
                    wajib memenuhi syarat berikut:
                  </p>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      Berusia minimal 21 (dua puluh satu) tahun untuk kategori
                      kendaraan standar dan 25 (dua puluh lima) tahun untuk kategori
                      premium.
                    </li>
                    <li>
                      Memiliki Surat Izin Mengemudi (SIM A atau lebih tinggi) yang
                      masih berlaku di wilayah hukum Republik Indonesia.
                    </li>
                    <li>
                      Menyediakan dokumen identitas asli (KTP/Passport) yang valid
                      untuk proses verifikasi.
                    </li>
                    <li>
                      Menyetujui untuk tidak menggunakan kendaraan untuk aktivitas
                      ilegal, balapan, atau pengangkutan barang terlarang.
                    </li>
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
                    03
                  </span>
                  Akun Pengguna
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Pengguna bertanggung jawab penuh atas keamanan kredensial akun
                    mereka. DriveEase berhak menangguhkan akun jika ditemukan
                    indikasi penyalahgunaan, aktivitas mencurigakan, atau data
                    profil yang tidak akurat.
                  </p>
                </div>
              </section>

              {/* 04 Booking */}
              <section
                id="booking"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    04
                  </span>
                  Booking &amp; Pemesanan
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Pemesanan dianggap sah setelah mendapatkan konfirmasi melalui
                    aplikasi atau email. DriveEase tidak menjamin ketersediaan unit
                    sampai pembayaran uang muka (DP) atau pelunasan diterima oleh
                    sistem kami.
                  </p>
                </div>
              </section>

              {/* 05 Pembayaran */}
              <section
                id="pembayaran"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    05
                  </span>
                  Kebijakan Pembayaran
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Semua transaksi menggunakan mata uang Rupiah (IDR). Harga yang
                    tertera sudah termasuk pajak yang berlaku kecuali disebutkan
                    lain. Keterlambatan pembayaran pelunasan dapat mengakibatkan
                    pembatalan otomatis secara sepihak oleh sistem.
                  </p>
                </div>
              </section>

              {/* 06 Refund */}
              <section
                id="refund"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    06
                  </span>
                  Pembatalan &amp; Refund
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <ul className="list-none space-y-4">
                    <li className="flex gap-4">
                      <CheckCircle className="text-green-500 mt-1 w-5 h-5" />
                      <div>
                        Refund 100% jika pembatalan dilakukan minimal 48 jam sebelum
                        waktu pickup.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <AlertCircle className="text-orange-500 mt-1 w-5 h-5" />
                      <div>
                        Refund 50% jika pembatalan dilakukan antara 24-48 jam
                        sebelum waktu pickup.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <XCircle className="text-red-500 mt-1 w-5 h-5" />
                      <div>
                        Tidak ada refund untuk pembatalan kurang dari 24 jam sebelum
                        waktu pickup.
                      </div>
                    </li>
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
                    07
                  </span>
                  Tanggung Jawab &amp; Liabilitas
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Pengguna bertanggung jawab penuh atas segala kerusakan,
                    kehilangan, atau biaya hukum yang timbul selama masa sewa.
                    DriveEase tidak bertanggung jawab atas kehilangan barang pribadi
                    di dalam kendaraan.
                  </p>
                </div>
              </section>

              {/* 08 Asuransi */}
              <section
                id="asuransi"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    08
                  </span>
                  Asuransi &amp; Perlindungan
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Semua unit kendaraan DriveEase dilindungi oleh asuransi standar.
                    Pengguna dapat memilih opsi perlindungan tambahan (Comprehensive)
                    dengan biaya tambahan untuk mengurangi nilai resiko sendiri (own
                    risk/deductible).
                  </p>
                </div>
              </section>

              {/* 09 Denda */}
              <section
                id="denda"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    09
                  </span>
                  Denda &amp; Penalti
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <ul className="list-none space-y-4">
                    <li className="flex gap-4">
                      <span className="font-black text-[#1a1a1a]">• Overtime:</span>
                      <span>
                        Denda 10% per jam dari harga sewa harian.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-black text-[#1a1a1a]">• BBM:</span>
                      <span>
                        Selisih bahan bakar akan dikenakan biaya sesuai harga pasar +
                        biaya layanan 15%.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-black text-[#1a1a1a]">
                        • Kebersihan:
                      </span>
                      <span>
                        Denda mulai Rp 150.000 jika kendaraan dikembalikan dalam
                        kondisi sangat kotor atau berbau asap rokok.
                      </span>
                    </li>
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
                    10
                  </span>
                  Hak Cipta &amp; Intellectual Property
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Semua konten, logo, grafis, dan kode program di platform
                    DriveEase adalah milik sah DriveEase Indonesia dan dilindungi
                    oleh Undang-Undang Hak Cipta yang berlaku.
                  </p>
                </div>
              </section>

              {/* 11 Perubahan Syarat */}
              <section
                id="perubahan"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    11
                  </span>
                  Perubahan Syarat
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    DriveEase berhak memperbarui Syarat &amp; Ketentuan ini
                    sewaktu-waktu. Pengguna disarankan untuk memeriksa halaman ini
                    secara berkala. Penggunaan layanan setelah perubahan dianggap
                    sebagai persetujuan terhadap syarat yang baru.
                  </p>
                </div>
              </section>

              {/* 12 Sengketa */}
              <section
                id="sengketa"
                className={`${legalCard} scroll-mt-28 p-10 md:p-12`}
              >
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9500] text-sm">
                    12
                  </span>
                  Penyelesaian Sengketa
                </h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    Segala perselisihan yang timbul dari penggunaan layanan akan
                    diselesaikan secara musyawarah mufakat. Jika tidak tercapai
                    kesepakatan, maka akan diselesaikan melalui jalur hukum di
                    Pengadilan Negeri Jakarta Selatan.
                  </p>
                </div>
              </section>

              {/* Legal CTA */}
              <section className="bg-[#1a1a1a] text-white rounded-[2rem] p-12 border-none">
                <div className="max-w-xl mx-auto text-center space-y-6">
                  <h3 className="text-2xl font-black">
                    Ada Pertanyaan Mengenai Legalitas?
                  </h3>
                  <p className="text-gray-400">
                    Tim kepatuhan kami siap membantu Anda memahami lebih lanjut
                    mengenai hak dan kewajiban Anda sebagai pengguna.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <a
                      href="mailto:legal@driveease.id"
                      id="contact-legal-btn"
                      className="px-8 py-4 bg-[#FF9500] text-white rounded-2xl font-black text-sm hover:bg-[#E68600] transition-all flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Hubungi Tim Legal
                    </a>
                    <a
                      href="/pusat-bantuan"
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
