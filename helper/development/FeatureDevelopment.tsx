import React from "react";
import {
  BrainCircuit,
  Car,
  Cpu,
  CreditCard,
  LayoutTemplate,
  Rocket,
  Sparkles,
} from "lucide-react";

export default function FeatureDevelopment() {
  return (
    <div className="min-h-[70vh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden text-white rounded-3xl border border-black/5 bg-[#1a1a1a]">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF9500] rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#FF9500] rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9500]/10 border border-[#FF9500]/30 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-[#FF9500]">
                  <Rocket className="h-4 w-4" />
                  Coming Soon
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
                  Fitur Dalam{" "}
                  <span className="text-[#FF9500]">Pengembangan</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Sesuatu yang luar biasa sedang kami siapkan untuk Anda.
                  Bersiaplah untuk pengalaman pengelolaan WhatsApp yang lebih
                  cerdas dan efisien langsung dari DriveEase Dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 pt-2">
                  <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-left">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-1">
                      Apa yang akan hadir
                    </p>
                    <p className="text-sm text-gray-200">
                      Integrasi perangkat WhatsApp, monitoring status koneksi,
                      dan insight pesan – semua di satu tempat.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.25em]">
                  Halaman WhatsApp Devices sedang dalam tahap pengembangan.
                </p>
              </div>

              <div className="flex-1 w-full max-w-md">
                <div className="relative">
                  <div className="absolute -top-6 -right-4 w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF9500]">
                    <Cpu className="h-7 w-7" />
                  </div>
                  <div className="absolute -bottom-6 -left-4 w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Car className="h-6 w-6" />
                  </div>

                  <div className="relative rounded-[2rem] border border-white/10 bg-white/5 px-4 py-4 shadow-2xl">
                    <div className="rounded-[1.6rem] bg-linear-to-br from-zinc-900 via-zinc-900 to-black p-5">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                            WhatsApp Devices
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white/90">
                            DriveEase Integration
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 border border-emerald-500/30">
                          In Progress
                        </span>
                      </div>

                      <div className="grid gap-3 text-xs text-gray-300">
                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-3">
                          <div>
                            <p className="font-semibold text-white">
                              Koneksi Bot
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Monitoring status koneksi WhatsApp secara
                              real-time.
                            </p>
                          </div>
                          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-[10px] font-semibold text-yellow-400 border border-yellow-500/40">
                            Coming Soon
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-3">
                          <div>
                            <p className="font-semibold text-white">QR Login</p>
                            <p className="text-[11px] text-gray-400">
                              Scan & sinkronisasi perangkat langsung dari
                              dashboard.
                            </p>
                          </div>
                          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-semibold text-orange-400 border border-orange-500/40">
                            Dalam Riset
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-3">
                          <div>
                            <p className="font-semibold text-white">
                              Device Insights
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Statistik perangkat & performa pesan yang mudah
                              dibaca.
                            </p>
                          </div>
                          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[10px] font-semibold text-sky-400 border border-sky-500/40">
                            Next Phase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <div className="rounded-3xl bg-card text-card-foreground border border-border shadow-sm p-6 md:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FF9500] mb-2">
              Fitur Masa Depan
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
              Apa yang akan Anda dapatkan?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Halaman ini akan menjadi pusat kontrol untuk seluruh integrasi
              WhatsApp di DriveEase. Dari status koneksi, perangkat aktif,
              hingga insight performa percakapan pelanggan.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-border bg-accent p-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm">
                  <BrainCircuit className="h-5 w-5 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Smart Automation</p>
                  <p className="text-xs text-muted-foreground">
                    Alur pesan otomatis berbasis status pemesanan & pelanggan.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-border bg-accent p-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm">
                  <CreditCard className="h-5 w-5 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Update Transaksi</p>
                  <p className="text-xs text-muted-foreground">
                    Notifikasi pembayaran & status booking via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-border bg-accent p-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm">
                  <LayoutTemplate className="h-5 w-5 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Satu Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    Semua channel komunikasi dipusatkan di DriveEase Dashboard.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-border bg-accent p-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm">
                  <Sparkles className="h-5 w-5 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Dirancang untuk Skalabilitas
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Siap dipakai mulai dari rental kecil hingga enterprise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-card text-card-foreground p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Timeline Perkiraan
              </p>
              <h3 className="text-xl font-black tracking-tight mb-2">
                Sedang kami kembangkan secara bertahap
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Kami sedang menguji integrasi teknis dengan bot WhatsApp dan
                menyusun pengalaman pengguna terbaik untuk Anda.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center text-xs font-semibold">
              <div className="rounded-2xl bg-card text-card-foreground px-3 py-4">
                <p className="text-2xl font-black">1</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                  Riset
                </p>
              </div>
              <div className="rounded-2xl bg-card/10 border border-border px-3 py-4">
                <p className="text-2xl font-black">2</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                  Desain
                </p>
              </div>
              <div className="rounded-2xl bg-card/10 border border-border px-3 py-4">
                <p className="text-2xl font-black">3</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                  Implementasi
                </p>
              </div>
              <div className="rounded-2xl bg-card/10 border border-border px-3 py-4">
                <p className="text-2xl font-black">4</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                  Beta
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
