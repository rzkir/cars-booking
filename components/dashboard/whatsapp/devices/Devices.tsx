"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ConnectionResponse = {
  status?: string;
  whatsappConnected?: boolean;
  error?: string;
};

type QrResponse = {
  whatsappConnected?: boolean;
  qrDataUrl?: string | null;
  error?: string;
};

export default function WhatsAppDevicesPage() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [conn, setConn] = useState<ConnectionResponse | null>(null);
  const [qr, setQr] = useState<QrResponse | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const connectedLabel = useMemo(() => {
    if (!conn) return "Belum dicek";
    if (conn.error) return "Error";
    return conn.whatsappConnected ? "Terkoneksi" : "Belum terkoneksi";
  }, [conn]);

  const refreshStatus = useCallback(async () => {
    setLoadingStatus(true);
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
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  const refreshQr = useCallback(async () => {
    setLoadingQr(true);
    setQr(null);
    try {
      const res = await fetch("/api/whatsapp/qr", { cache: "no-store" });
      const data = (await res.json()) as QrResponse;
      setQr(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gagal ambil QR";
      setQr({ error: message });
    } finally {
      setLoadingQr(false);
    }
  }, []);

  useEffect(() => {
    refreshStatus();
    refreshQr();
  }, [refreshStatus, refreshQr]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Connection</CardTitle>
          <CardDescription>
            Cek apakah bot Baileys sudah terkoneksi (scan QR di terminal bot).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">
              Status: <span className="font-semibold">{connectedLabel}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={refreshStatus}
              disabled={loadingStatus}
            >
              {loadingStatus ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {conn?.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {conn.error}
            </div>
          ) : null}

          {conn && !conn.error ? (
            <pre className="max-h-48 overflow-auto rounded-md border bg-muted/30 p-3 text-xs">
              {JSON.stringify(conn, null, 2)}
            </pre>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QR Login</CardTitle>
          <CardDescription>
            Jika belum terkoneksi, refresh untuk menampilkan QR lalu scan dari
            WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">
              QR:{" "}
              <span className="font-semibold">
                {qr?.qrDataUrl ? "Tersedia" : "Belum ada"}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={refreshQr}
              disabled={loadingQr}
            >
              {loadingQr ? "Loading..." : "Refresh QR"}
            </Button>
          </div>

          {qr?.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {qr.error}
            </div>
          ) : null}

          {qr?.qrDataUrl ? (
            <div className="grid place-items-center rounded-md border bg-muted/20 p-4">
              <Image
                src={qr.qrDataUrl}
                alt="WhatsApp QR"
                width={256}
                height={256}
                unoptimized
                className="h-auto w-64 max-w-full"
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              QR belum tersedia. Pastikan bot jalan, lalu klik Refresh QR.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
