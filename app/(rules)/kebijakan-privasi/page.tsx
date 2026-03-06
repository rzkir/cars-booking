import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Kebijakan Privasi - DriveEase Indonesia",
  description:
    "Kebijakan privasi resmi DriveEase Indonesia terkait pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.",
};

const cardBase =
  "legal-card rounded-[2.5rem] relative overflow-hidden group p-8 md:p-12 border border-white/5 bg-[#242424] transition-colors";

export default function Page() {
  return (
    <main className="flex-1 bg-[#1a1a1a] text-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9500]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Dokumen Legal Resmi
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
              Kebijakan <span className="text-[#FF9500]">Privasi</span>
            </h1>
            <p className="text-gray-400 font-medium text-lg max-w-2xl">
              DriveEase menghormati privasi Anda dan berkomitmen untuk melindungi
              data pribadi yang Anda percayakan kepada kami.
            </p>
          </div>

          <div className="space-y-2 text-center lg:text-right">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Terakhir Diperbarui
            </p>
            <p className="text-lg font-black">24 Mei 2024</p>
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
                {[
                  { id: "section-1", label: "Pengantar" },
                  { id: "section-2", label: "Informasi Pengumpulan" },
                  { id: "section-3", label: "Penggunaan Data" },
                  { id: "section-4", label: "Basis Hukum" },
                  { id: "section-5", label: "Pihak Ketiga" },
                  { id: "section-6", label: "Keamanan Data" },
                  { id: "section-7", label: "Hak Pengguna" },
                  { id: "section-8", label: "Cookies & Pelacakan" },
                  { id: "section-9", label: "Retensi Data" },
                  { id: "section-10", label: "Privasi Anak" },
                  { id: "section-11", label: "Perubahan Kebijakan" },
                  { id: "section-12", label: "Hubungi Kami" },
                ].map((item, index) => (
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
                  Pengantar &amp; Jangkauan
                </h2>
                <div className="space-y-6 font-medium italic">
                  <p>
                    Kebijakan Privasi ini menjelaskan bagaimana DriveEase
                    (&quot;kami&quot;, &quot;kita&quot;, atau &quot;milik kami&quot;)
                    mengumpulkan, menggunakan, mengungkapkan, dan melindungi
                    informasi pribadi Anda saat Anda menggunakan situs web kami,
                    aplikasi seluler, dan layanan rental mobil kami.
                  </p>
                  <p>
                    DriveEase dioperasikan oleh PT Drive Ease Indonesia, yang
                    bertanggung jawab atas data Anda. Kebijakan ini berlaku untuk
                    semua pengguna di wilayah hukum Republik Indonesia dan secara
                    global di mana layanan kami dapat diakses.
                  </p>
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
                  Informasi yang Kami Kumpulkan
                </h2>
                <div className="space-y-8">
                  <p>
                    Kami mengumpulkan berbagai jenis informasi pribadi untuk
                    memberikan pengalaman rental terbaik bagi Anda:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-[#FF9500] font-black uppercase text-xs tracking-widest mb-4">
                        Data Identitas
                      </h4>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>• Nama Lengkap Sesuai KTP/Paspor</li>
                        <li>• Nomor NIK / Paspor</li>
                        <li>• Nomor Surat Izin Mengemudi (SIM)</li>
                        <li>• Foto KTP &amp; Selfie Verifikasi</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-[#FF9500] font-black uppercase text-xs tracking-widest mb-4">
                        Informasi Kontak
                      </h4>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>• Alamat Email Aktif</li>
                        <li>• Nomor Telepon / WhatsApp</li>
                        <li>• Alamat Domisili Pengiriman</li>
                        <li>• Kontak Darurat</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-[#FF9500] font-black uppercase text-xs tracking-widest mb-4">
                        Data Keuangan
                      </h4>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>• Nomor Rekening / E-Wallet</li>
                        <li>• Informasi Kartu Kredit (Tersandikan)</li>
                        <li>• Riwayat Transaksi Pembayaran</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="text-[#FF9500] font-black uppercase text-xs tracking-widest mb-4">
                        Data Teknis &amp; Penggunaan
                      </h4>
                      <ul className="space-y-2 text-sm font-medium">
                        <li>• Alamat IP &amp; Device ID</li>
                        <li>• Lokasi GPS Kendaraan (Selama Sewa)</li>
                        <li>• Log Aktivitas Aplikasi</li>
                      </ul>
                    </div>
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
                        <tr className="hover:bg-white/5 transition-colors font-medium">
                          <td className="p-4">Biometrik/Foto</td>
                          <td className="p-4">Upload Langsung</td>
                          <td className="p-4 text-[#FF9500]">
                            Verifikasi KYC &amp; Keamanan
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors font-medium">
                          <td className="p-4">Lokasi GPS</td>
                          <td className="p-4">Tracker Kendaraan</td>
                          <td className="p-4 text-[#FF9500]">
                            Manajemen Armada &amp; Keamanan
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors font-medium">
                          <td className="p-4">Perilaku Mengemudi</td>
                          <td className="p-4">Telemetri Sensor</td>
                          <td className="p-4 text-[#FF9500]">
                            Evaluasi Resiko Asuransi
                          </td>
                        </tr>
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
                  Bagaimana Kami Menggunakan Data
                </h2>
                <div className="space-y-6 font-medium">
                  <p>
                    Data Anda digunakan secara eksklusif untuk tujuan operasional
                    dan pengembangan layanan:
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="text-[#FF9500] w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Layanan Rental</h4>
                        <p className="text-sm text-gray-400">
                          Memproses pemesanan, verifikasi kelayakan pengemudi, dan
                          penyediaan unit kendaraan.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Mail className="text-[#FF9500] w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">
                          Komunikasi Pelanggan
                        </h4>
                        <p className="text-sm text-gray-400">
                          Mengirim konfirmasi booking, update status perjalanan, dan
                          bantuan teknis.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <BarChart3 className="text-[#FF9500] w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">
                          Analisis &amp; Pengembangan
                        </h4>
                        <p className="text-sm text-gray-400">
                          Memahami preferensi pengguna untuk meningkatkan efisiensi
                          rute dan kualitas armada.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Megaphone className="text-[#FF9500] w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">
                          Pemasaran (Opsional)
                        </h4>
                        <p className="text-sm text-gray-400">
                          Memberikan penawaran khusus dan loyalitas poin (Anda dapat
                          berhenti berlangganan kapan saja).
                        </p>
                      </div>
                    </div>
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
                  Basis Hukum Pemrosesan Data
                </h2>
                <div className="space-y-6 font-medium">
                  <p>
                    Kami memproses informasi pribadi berdasarkan dasar hukum
                    berikut:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-[#1a1a1a] rounded-2xl border-l-4 border-[#FF9500]">
                      <h4 className="text-white font-black text-sm mb-2">
                        Persetujuan (Consent)
                      </h4>
                      <p className="text-xs text-gray-500">
                        Ketika Anda menyetujui kami menggunakan data Anda untuk
                        pemasaran atau tracking GPS.
                      </p>
                    </div>
                    <div className="p-6 bg-[#1a1a1a] rounded-2xl border-l-4 border-[#FF9500]">
                      <h4 className="text-white font-black text-sm mb-2">
                        Kontrak (Contract Performance)
                      </h4>
                      <p className="text-xs text-gray-400">
                        Pemrosesan yang diperlukan untuk memenuhi kontrak sewa yang
                        Anda buat.
                      </p>
                    </div>
                    <div className="p-6 bg-[#1a1a1a] rounded-2xl border-l-4 border-gray-600">
                      <h4 className="text-white font-black text-sm mb-2">
                        Kewajiban Hukum
                      </h4>
                      <p className="text-xs text-gray-500">
                        Kepatuhan terhadap regulasi lalu lintas dan audit keuangan
                        negara.
                      </p>
                    </div>
                    <div className="p-6 bg-[#1a1a1a] rounded-2xl border-l-4 border-gray-600">
                      <h4 className="text-white font-black text-sm mb-2">
                        Kepentingan Sah
                      </h4>
                      <p className="text-xs text-gray-400">
                        Keamanan armada kami dan pencegahan penipuan identitas.
                      </p>
                    </div>
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
                  Berbagi Data dengan Pihak Ketiga
                </h2>
                <div className="space-y-8 font-medium">
                  <p>
                    DriveEase tidak menjual data Anda. Kami hanya berbagi informasi
                    dengan mitra resmi yang diperlukan:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl text-center space-y-4">
                      <CreditCard className="text-3xl text-[#FF9500] mx-auto" />
                      <h4 className="text-sm font-black">Payment Gateway</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">
                        Xendit / Midtrans
                      </p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl text-center space-y-4">
                      <Umbrella className="text-3xl text-[#FF9500] mx-auto" />
                      <h4 className="text-sm font-black">Asuransi</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">
                        Allianz / Sinarmas
                      </p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl text-center space-y-4">
                      <Landmark className="text-3xl text-[#FF9500] mx-auto" />
                      <h4 className="text-sm font-black">Otoritas Hukum</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">
                        Kepolisian (Kecelakaan)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm bg-[#1a1a1a] p-6 rounded-2xl italic border border-white/5">
                    &quot;Mitra kami diwajibkan oleh kontrak untuk menjaga
                    kerahasiaan data Anda dan hanya menggunakannya untuk tujuan
                    spesifik yang telah kami tetapkan.&quot;
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
                  Keamanan Data
                </h2>
                <div className="space-y-8 font-medium">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Teknologi Keamanan</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span> Enkripsi
                          SSL/TLS 256-bit untuk semua transmisi data.
                        </li>
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span> Penyimpanan
                          data terenkripsi (Encryption at Rest).
                        </li>
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span> Firewall
                          aplikasi web dan proteksi DDoS.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Kontrol Akses</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span>{" "}
                          Autentikasi Dua Faktor (2FA) untuk staf DriveEase.
                        </li>
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span> Prinsip Hak
                          Akses Terbatas (Least Privilege).
                        </li>
                        <li>
                          <span className="text-[#FF9500] mr-2">•</span> Audit
                          keamanan rutin oleh pihak ketiga.
                        </li>
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
                  Hak Pengguna
                </h2>
                <div className="space-y-6 font-medium">
                  <p>
                    Berdasarkan regulasi Perlindungan Data Pribadi (PDP)
                    Indonesia, Anda memiliki hak-hak berikut:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-[#1a1a1a] rounded-2xl hover:border-[#FF9500] border border-transparent transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Eye className="text-xl text-[#FF9500]" />
                        <span className="text-sm font-black">
                          Hak Akses &amp; Portabilitas
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-[#1a1a1a] rounded-2xl hover:border-[#FF9500] border border-transparent transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Edit3 className="text-xl text-[#FF9500]" />
                        <span className="text-sm font-black">
                          Hak Koreksi Data
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-[#1a1a1a] rounded-2xl hover:border-[#FF9500] border border-transparent transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Trash2 className="text-xl text-red-500" />
                        <span className="text-sm font-black">
                          Hak Penghapusan (Right to be Forgotten)
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Untuk menjalankan hak Anda, silakan hubungi{" "}
                    <span className="text-[#FF9500] font-bold">
                      privacy@driveease.id
                    </span>{" "}
                    dengan melampirkan bukti identitas yang sah.
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
                  Cookies &amp; Pelacakan
                </h2>
                <div className="space-y-6 font-medium">
                  <p>
                    Kami menggunakan cookies untuk meningkatkan pengalaman
                    browsing Anda:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 font-black text-[10px] text-[#FF9500]">
                        01
                      </span>
                      <p className="text-sm">
                        <span className="text-white font-bold">
                          Essential Cookies:
                        </span>{" "}
                        Diperlukan untuk login dan keamanan transaksi.
                      </p>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 font-black text-[10px] text-[#FF9500]">
                        02
                      </span>
                      <p className="text-sm">
                        <span className="text-white font-bold">
                          Analytics Cookies:
                        </span>{" "}
                        Google Analytics untuk memahami performa situs.
                      </p>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 font-black text-[10px] text-[#FF9500]">
                        03
                      </span>
                      <p className="text-sm">
                        <span className="text-white font-bold">
                          Marketing Cookies:
                        </span>{" "}
                        Digunakan untuk memberikan iklan yang relevan.
                      </p>
                    </li>
                  </ul>
                  <p className="text-xs font-bold text-gray-500 italic">
                    Anda dapat mengatur preferensi cookies melalui pengaturan
                    browser Anda.
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
                  Retensi Data
                </h2>
                <div className="space-y-6 font-medium">
                  <p>Kami menyimpan data pribadi Anda selama diperlukan:</p>
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
                        <tr>
                          <td className="p-5 font-black text-white">Profil Akun</td>
                          <td className="p-5">Selama Akun Aktif</td>
                          <td className="p-5">Akses Layanan</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-black text-white">
                            Riwayat Booking
                          </td>
                          <td className="p-5">10 Tahun</td>
                          <td className="p-5">Peraturan Perpajakan</td>
                        </tr>
                        <tr>
                          <td className="p-5 font-black text-white">
                            Data Lokasi (GPS)
                          </td>
                          <td className="p-5">6 Bulan</td>
                          <td className="p-5">Analisis Operasional</td>
                        </tr>
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
                  Privasi Anak
                </h2>
                <div className="space-y-6 font-medium text-sm">
                  <p>
                    Layanan kami tidak ditujukan untuk anak-anak di bawah usia 18
                    tahun. Kami tidak secara sengaja mengumpulkan data pribadi dari
                    individu di bawah umur.
                  </p>
                  <p>
                    Jika kami mengetahui bahwa kami telah mengumpulkan data dari
                    anak di bawah umur tanpa izin orang tua, kami akan segera
                    mengambil langkah untuk menghapus informasi tersebut dari server
                    kami.
                  </p>
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
                  Perubahan Kebijakan
                </h2>
                <div className="space-y-6 font-medium text-sm">
                  <p>
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu
                    untuk mencerminkan perubahan dalam praktik data kami atau
                    kewajiban hukum.
                  </p>
                  <p>
                    Kami akan memberi tahu Anda tentang perubahan materi apa pun
                    melalui email atau notifikasi aplikasi sebelum perubahan tersebut
                    menjadi efektif. Penggunaan berkelanjutan Anda atas layanan
                    DriveEase setelah pembaruan menandakan penerimaan Anda terhadap
                    kebijakan baru.
                  </p>
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
                  Hubungi Kami
                </h2>
                <div className="space-y-8 font-medium">
                  <p>
                    Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini
                    atau ingin mengajukan keluhan terkait data Anda:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 space-y-4">
                      <h4 className="text-[#FF9500] font-black uppercase text-[10px] tracking-widest">
                        Data Protection Officer (DPO)
                      </h4>
                      <div className="flex items-center gap-3 text-white font-black">
                        <Mail className="text-xl" />
                        privacy@driveease.id
                      </div>
                      <div className="flex items-center gap-3 text-white font-black">
                        <Phone className="text-xl" />
                        +62 21 1234 5678
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 space-y-4">
                      <h4 className="text-[#FF9500] font-black uppercase text-[10px] tracking-widest">
                        Kantor Pusat
                      </h4>
                      <p className="text-sm text-gray-400">
                        PT Drive Ease Indonesia
                        <br />
                        Jl. Jenderal Sudirman No. 123
                        <br />
                        Jakarta Selatan, 12190
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
                      Kembali ke Atas
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
