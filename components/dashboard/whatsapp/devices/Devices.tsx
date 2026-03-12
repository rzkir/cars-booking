"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Lightbulb,
  RefreshCcw,
  Settings2,
  ShieldCheck,
  Smartphone,
  Trash2,
  Unplug,
  X,
} from "lucide-react";

type ConnectionResponse = {
  status?: string;
  whatsappConnected?: boolean;
  error?: string;
  // Optional metadata from bot/backend
  name?: string | null;
  phoneNumber?: string | null;
  lastSeen?: string | null;
};

type QrResponse = {
  whatsappConnected?: boolean;
  qrDataUrl?: string | null;
  error?: string;
};

export default function WhatsAppDevicesPage() {
  const [conn, setConn] = useState<ConnectionResponse | null>(null);
  const [qr, setQr] = useState<QrResponse | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const connectedLabel = useMemo(() => {
    if (!conn) return "Belum dicek";
    if (conn.error) return "Error";
    return conn.whatsappConnected ? "Terkoneksi" : "Belum terkoneksi";
  }, [conn]);

  const refreshStatus = useCallback(async () => {
    setConn(null);
    try {
      const res = await fetch("/api/whatsapp/connection", {
        cache: "no-store",
      });
      const data = (await res.json()) as ConnectionResponse;
      setConn(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gagal cek status";
      setConn({ error: message });
    }
  }, []);

  const refreshQr = useCallback(async () => {
    setLoadingQr(true);
    try {
      const res = await fetch("/api/whatsapp/qr", { cache: "no-store" });
      const data = (await res.json()) as QrResponse;
      setQr(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gagal ambil QR";
      setQr({ error: message, qrDataUrl: qr?.qrDataUrl ?? null });
    } finally {
      setLoadingQr(false);
    }
  }, [qr?.qrDataUrl]);

  useEffect(() => {
    refreshStatus();
    refreshQr();
  }, [refreshStatus, refreshQr]);

  const isOnline = conn?.whatsappConnected;

  return (
    <div className="flex min-h-screen flex-col bg-card rounded-3xl">
      <main className="relative flex-1 overflow-y-auto">
        {/* Scanner / default view */}
        <div className="mx-auto space-y-8 p-8">
          {/* Sticky page header */}
          <header className="sticky top-0 z-30 mb-6 flex items-center justify-between border-b border-border bg-card px-2 py-4 md:px-0">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Connected Devices
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage and monitor your active WhatsApp connections.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold md:flex"
              >
                <Smartphone className="h-3 w-3" />
                View Devices
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
                onClick={refreshQr}
                disabled={loadingQr}
              >
                <RefreshCcw className="h-4 w-4" />
                {loadingQr ? "Refreshing QR..." : "Connect Device"}
              </Button>
            </div>
          </header>

          {/* QR + guide section */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* QR card */}
            <div className="flex flex-col items-center rounded-3xl border border-border bg-primary p-8 text-center shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-primary-foreground">
                Link a New Account
              </h3>

              <div className="relative mb-6 rounded-2xl border-2 border-dashed border-border bg-card p-6">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-lg bg-card p-2 shadow-inner">
                  {qr?.qrDataUrl ? (
                    <Image
                      src={qr.qrDataUrl}
                      alt="WhatsApp QR"
                      width={200}
                      height={200}
                      unoptimized
                      className="h-full w-full opacity-90"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-card text-xs text-muted-foreground">
                      QR belum tersedia
                    </div>
                  )}

                  {loadingQr ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-card/70 backdrop-blur-[1px]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <RefreshCcw className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <p className="mb-6 px-4 text-sm text-muted-foreground">
                Scan QR Code ini menggunakan WhatsApp di ponsel Anda melalui
                menu <strong>Linked Devices</strong>.
              </p>

              {qr?.error ? (
                <div className="mb-4 w-full rounded-2xl border border-red-100 bg-card px-4 py-3 text-xs text-destructive">
                  {qr.error}
                </div>
              ) : null}

              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-[#008069] hover:bg-[#008069]/5 hover:text-[#00695C]"
                onClick={refreshQr}
                disabled={loadingQr}
              >
                <RefreshCcw className="h-4 w-4" />
                {loadingQr ? "Refreshing..." : "Refresh QR Code"}
              </Button>
            </div>

            {/* How to connect card */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-[#008069] to-[#00695C] p-8 text-white shadow-lg lg:col-span-2">
              <ShieldCheck className="pointer-events-none absolute -right-8 -bottom-8 h-[180px] w-[180px] text-white/5" />

              <h2 className="mb-6 text-2xl font-bold">How to Connect</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    1
                  </span>
                  <p className="pt-0.5">Open WhatsApp on your mobile phone.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    2
                  </span>
                  <p className="pt-0.5">
                    Tap <strong>Menu</strong> (Settings) dan pilih{" "}
                    <strong>Linked Devices</strong>.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    3
                  </span>
                  <p className="pt-0.5">
                    Arahkan kamera ponsel ke layar ini untuk scan QR Code.
                  </p>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
                <Button
                  type="button"
                  className="rounded-xl bg-white px-6 py-2 text-[#008069] shadow-md hover:bg-gray-100"
                >
                  View Video Tutorial
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 bg-transparent px-6 py-2 text-white hover:bg-white/10"
                >
                  Need Help?
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Devices list view */}
        <section className="mx-auto space-y-8 p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-card-foreground">
              Devices List
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your active WhatsApp devices.
            </p>
          </div>

          {/* Devices grid */}
          <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Smartphone className="h-7 w-7" />
              </div>
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  isOnline
                    ? "bg-primary/10 text-primary"
                    : "bg-muted-foreground/10 text-muted-foreground"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOnline ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
                {isOnline ? "Connected" : "Disconnected"}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-card-foreground">
                {conn?.name || "Primary Device"}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {conn?.phoneNumber || "+62 --- ---- ----"}
              </p>
            </div>

            <div className="mb-8 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-card-foreground">
                  {connectedLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Active</span>
                <span className="font-semibold text-card-foreground">
                  {conn?.lastSeen
                    ? new Date(conn.lastSeen).toLocaleString()
                    : "-"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-6 text-[10px] font-bold uppercase text-muted-foreground">
              <button className="flex flex-col items-center gap-1.5 rounded-xl border border-border px-1 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-primary">
                <Unplug className="h-4 w-4" />
                <span>Unplug</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 rounded-xl border border-border px-1 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-primary">
                <Settings2 className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 rounded-xl border border-border px-1 py-2 transition-colors hover:bg-muted-foreground/10 hover:text-primary">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Pro tip footer */}
          <div className="flex items-center gap-4 rounded-[2rem] border border-[#008069]/10 bg-white/70 p-6 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008069] text-white">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-bold text-gray-900">Pro Tip for Connection</p>
              <p className="text-sm text-gray-600">
                Jaga ponsel Anda tetap terhubung ke internet dan nonaktifkan
                pengoptimalan baterai untuk WhatsApp agar koneksi tetap stabil
                24/7.
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
              aria-label="Dismiss tip"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
