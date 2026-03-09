"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import { io, Socket } from "socket.io-client";

import { useAuth } from "@/context/AuthContext";

import { API_CONFIG } from "@/hooks/config";

type SocketStatus = "disconnected" | "connecting" | "connected" | "scan_qr" | "ready";

export default function WhatsappLayout() {
  const { user } = useAuth();
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<SocketStatus>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [sendResult, setSendResult] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:3001";

    // Trigger server untuk mulai generate QR (backend akan proxy ke WA Node server).
    fetch(`${API_CONFIG.ENDPOINTS.base}/api/whatsapp/start`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).catch(() => null);

    const socketInstance: Socket = io(wsUrl, {
      transports: ["websocket"],
      path: "/socket.io",
      auth: {
        userId: user.id,
      },
    });

    socketInstance.on("connect", () => {
      setStatus("connected");
      setError(null);
      setSocket(socketInstance);
    });

    socketInstance.on("disconnect", () => {
      setStatus("disconnected");
    });

    socketInstance.on("qr", (payload: { qr: string }) => {
      setQr(payload.qr);
      setStatus("scan_qr");
    });

    socketInstance.on("ready", () => {
      setStatus("ready");
    });

    socketInstance.on("disconnected", () => {
      setStatus("disconnected");
    });

    socketInstance.on("connect_error", (err) => {
      setError(err.message ?? "Gagal konek ke WhatsApp socket");
      setStatus("disconnected");
    });

    socketInstance.on(
      "send_text_result",
      (payload: { ok: boolean; error?: string; to?: string }) => {
        if (payload.ok) {
          setSendResult(`Berhasil kirim ke ${payload.to ?? ""}`);
        } else {
          setSendResult(`Gagal kirim: ${payload.error ?? "Unknown error"}`);
        }
      },
    );

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [user?.id]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">WhatsApp Integration</h1>

      <p className="text-sm text-muted-foreground">
        Status koneksi: <span className="font-medium">{status}</span>
      </p>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {qr && (
        <div className="flex flex-col items-center gap-2">
          <Image
            src={qr}
            alt="WhatsApp QR Code"
            width={256}
            height={256}
            unoptimized
            className="h-64 w-64 rounded-lg border border-border bg-background p-2"
          />
          <p className="text-xs text-muted-foreground">
            Scan QR ini dengan aplikasi WhatsApp untuk menghubungkan akun.
          </p>
        </div>
      )}

      {!qr && status !== "ready" && (
        <p className="text-sm text-muted-foreground">
          Menunggu QR dari server...
        </p>
      )}

      {status === "ready" && (
        <div className="flex w-full max-w-md flex-col gap-4">
          <p className="text-sm text-emerald-600">
            WhatsApp sudah terhubung.
          </p>

          <form
            className="flex flex-col gap-3 rounded-md border border-border bg-card p-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSendResult(null);
              if (!socket) {
                setSendResult("Socket belum siap");
                return;
              }
              if (!to || !message) {
                setSendResult("Nomor dan pesan wajib diisi");
                return;
              }
              socket.emit("send_text_single", {
                to,
                message,
              });
            }}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Nomor WhatsApp (tanpa +62, contoh: 81234567890)
              </label>
              <input
                type="tel"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="81234567890"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Pesan
              </label>
              <textarea
                className="min-h-[80px] rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan WhatsApp di sini..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
              disabled={!socket}
            >
              Kirim Pesan
            </button>

            {sendResult && (
              <p className="text-xs text-muted-foreground">{sendResult}</p>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
