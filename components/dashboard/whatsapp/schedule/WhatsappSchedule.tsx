"use client";

import { useEffect, useState } from "react";

export default function WhatsappSchedule() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<{
    sent?: number;
    error?: string;
  } | null>(null);

  const [upcomingHours, setUpcomingHours] = useState(24);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/whatsapp/reminder-settings", {
          method: "GET",
          cache: "no-store",
        });
        const data = (await res.json()) as {
          hours_before_end?: number;
        };
        if (!ignore && typeof data.hours_before_end === "number") {
          setUpcomingHours(
            Math.min(Math.max(Math.round(data.hours_before_end), 1), 168),
          );
        }
      } catch {
        // ignore error, keep default
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleRunSchedule() {
    setIsRunning(true);
    setLastResult(null);

    try {
      const res = await fetch("/api/whatsapp/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upcomingHours }),
      });

      const data = (await res.json()) as {
        sent?: number;
        error?: string;
      };

      if (!res.ok) {
        setLastResult({
          sent: data?.sent ?? 0,
          error: data?.error || "Gagal menjalankan bot schedule",
        });
        return;
      }

      setLastResult({
        sent: data?.sent ?? 0,
        error: data?.error,
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Gagal menjalankan bot schedule";
      setLastResult({ sent: 0, error: message });
    } finally {
      setIsRunning(false);
    }
  }

  async function handleSaveSettings() {
    setIsSaving(true);
    try {
      await fetch("/api/whatsapp/reminder-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours_before_end: upcomingHours }),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-hidden rounded-3xl">
      <header className="border-b border-gray-200 px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            WhatsApp Schedule
          </h1>
          <p className="text-sm text-foreground mt-1 max-w-xl">
            Atur dan jalankan bot pengingat WhatsApp berdasarkan periode
            booking. Bot akan mengirim pesan ke customer ketika periode sewa
            mendekati atau sudah lewat.
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4 md:p-8 space-y-6">
        <section className="bg-card rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Pengaturan Periode Pengingat
            </h2>
            <p className="text-sm text-foreground mt-1">
              Tentukan berapa jam sebelum tanggal mulai booking customer akan
              mendapatkan pengingat otomatis.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-sm font-medium text-foreground w-full md:w-auto">
              Kirim pengingat sebelum mulai dalam
            </label>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="number"
                min={1}
                max={168}
                value={upcomingHours}
                onChange={(e) =>
                  setUpcomingHours(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-24 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008069]/20 focus:border-[#008069]"
              />
              <span className="text-sm text-foreground">jam sebelum mulai</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-md text-xs text-foreground">
              <span>
                Pengaturan ini disimpan di database dan akan digunakan sebagai
                jam pengingat default sebelum periode berakhir.
              </span>
              <span>
                Endpoint ini sebaiknya dijalankan otomatis via cron (misalnya
                setiap 15 menit) untuk mengirim pengingat berdasarkan data
                booking dari sistem utama.
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-foreground bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Menyimpan..." : "Simpan pengaturan"}
              </button>
              <button
                type="button"
                onClick={handleRunSchedule}
                disabled={isRunning}
                className="inline-flex items-center justify-center rounded-xl bg-[#008069] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#008069]/30 hover:bg-[#026352] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? "Menjalankan bot..." : "Jalankan bot sekarang"}
              </button>
            </div>
          </div>

          {lastResult && (
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 space-y-1">
              <div>
                <span className="font-semibold">Pesan terkirim:</span>{" "}
                {lastResult.sent ?? 0}
              </div>
              {lastResult.error && (
                <div className="text-red-600">
                  <span className="font-semibold">Error:</span>{" "}
                  {lastResult.error}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
