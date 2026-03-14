"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateSnapMutation,
  useSyncPaymentMutation,
} from "@/services/payments.service";

type BookingsTransactiontProps = {
  bookingId: string;
};

export default function BookingsTransactiont({
  bookingId,
}: BookingsTransactiontProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const snapMutation = useCreateSnapMutation(bookingId);
  const syncMutation = useSyncPaymentMutation(bookingId);
  const hasSynced = useRef(false);
  const hasHandledPaid = useRef(false);

  useEffect(() => {
    if (
      !snapMutation.data &&
      !snapMutation.isPending &&
      !snapMutation.isSuccess
    ) {
      snapMutation.mutate();
    }
  }, [snapMutation]);

  // Setelah dapat payment_id, sync status dari Midtrans (agar status paid tampil tanpa tunggu webhook)
  useEffect(() => {
    const paymentId = snapMutation.data?.payment_id;
    if (!paymentId || hasSynced.current || syncMutation.isPending) return;
    hasSynced.current = true;
    syncMutation.mutate(paymentId);
  }, [snapMutation.data?.payment_id, syncMutation]);

  const isLoading = snapMutation.isPending;
  const snapData = snapMutation.data;
  const isError = snapMutation.isError;
  const paymentStatus = syncMutation.data?.status;
  const isSyncing = syncMutation.isPending;

  // Jika status payment sudah "paid", arahkan ke halaman lacak-pemesanan.
  // Notifikasi WhatsApp akan ditangani oleh bot yang sudah ada di backend.
  useEffect(() => {
    if (paymentStatus !== "paid" || hasHandledPaid.current) return;
    hasHandledPaid.current = true;

    const statusPath = `/lacak-pemesanan/${bookingId}?payment=success`;
    router.push(statusPath);
  }, [paymentStatus, bookingId, router]);

  const handleOpenSnap = () => {
    if (!snapData?.token || !snapData?.client_key) return;

    const SNAP_SANDBOX_URL = "https://app.sandbox.midtrans.com/snap/snap.js";
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-midtrans-snap="true"]',
    );

    const openSnap = () => {
      (
        window as Window &
          typeof globalThis & {
            snap: {
              pay: (
                token: string,
                options?: {
                  onSuccess?: (result: unknown) => void;
                  onPending?: (result: unknown) => void;
                  onError?: (result: unknown) => void;
                  onClose?: () => void;
                },
              ) => void;
            };
          }
      ).snap?.pay(snapData.token, {
        onSuccess: () => {
          // Setelah user menyelesaikan pembayaran di Snap, sync status ke backend
          if (snapData.payment_id) {
            syncMutation.mutate(snapData.payment_id);
          }
        },
      });
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = SNAP_SANDBOX_URL;
      script.setAttribute("data-client-key", snapData.client_key);
      script.setAttribute("data-midtrans-snap", "true");
      script.onload = openSnap;
      document.body.appendChild(script);
    } else {
      if (!existingScript.getAttribute("data-client-key")) {
        existingScript.setAttribute("data-client-key", snapData.client_key);
      }
      openSnap();
    }
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md overflow-hidden border-2 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="bg-primary/5 dark:bg-primary/10 px-6 py-5">
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Lanjutkan Pembayaran
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Selesaikan pembayaran untuk booking Anda melalui Midtrans
            </p>
          </CardHeader>
        </div>

        <CardContent className="px-6 py-5 space-y-5">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              ID Booking
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg border bg-muted/50 px-3 py-2.5 font-mono text-xs break-all text-foreground">
                {bookingId}
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={handleCopyId}
              >
                {copied ? "Tersalin" : "Salin"}
              </Button>
            </div>
          </div>

          <Separator />

          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded" />
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 dark:bg-destructive/10 px-4 py-3">
              <p className="text-sm font-medium text-destructive">
                {(snapMutation.error as Error)?.message ??
                  "Gagal menyiapkan pembayaran"}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => snapMutation.mutate()}
              >
                Coba lagi
              </Button>
            </div>
          )}

          {paymentStatus === "paid" && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 dark:bg-green-500/20 px-4 py-3 text-center">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Pembayaran berhasil
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Status booking telah diperbarui. Anda dapat melihat detail di
                halaman booking.
              </p>
            </div>
          )}

          {!isLoading && !isError && paymentStatus !== "paid" && (
            <>
              {isSyncing && (
                <p className="text-xs text-muted-foreground text-center">
                  Memeriksa status pembayaran...
                </p>
              )}
              {!isSyncing && syncMutation.data?.midtrans_status && (
                <p className="text-xs text-center text-muted-foreground rounded-md bg-muted/50 px-3 py-2">
                  Status di Midtrans:{" "}
                  <strong>{syncMutation.data.midtrans_status}</strong>
                  {syncMutation.data.midtrans_status === "pending" && (
                    <span className="block mt-1">
                      Setelah bayar, klik &quot;Cek status lagi&quot; untuk
                      memperbarui.
                    </span>
                  )}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  className="flex-1 h-11 font-semibold rounded-lg shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                  size="lg"
                  disabled={!snapData || isSyncing}
                  onClick={handleOpenSnap}
                >
                  Bayar Sekarang
                </Button>
                {snapData?.payment_id && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-11 shrink-0"
                    disabled={isSyncing}
                    onClick={() => syncMutation.mutate(snapData.payment_id)}
                  >
                    {isSyncing ? "..." : "Cek status lagi"}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Anda akan diarahkan ke halaman pembayaran Midtrans. Setelah
                pembayaran berhasil, klik &quot;Cek status lagi&quot; atau
                tunggu beberapa detik.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
