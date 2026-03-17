"use client";

import {
  useWhatsappReminderSettingsSyncToUpcomingHours,
  useWhatsappRunScheduleMutation,
  useWhatsappSaveReminderSettingsMutation,
  useWhatsappScheduleState,
  useWhatsappSendMessageState,
  toWhatsappTo,
  buildDefaultWhatsappReminderMessage,
} from "@/services/whatsapp.service";

import { useBookingsQuery } from "@/services/bookings.service";

import { formatDate } from "@/hooks/format-idr";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Plus, SendHorizontal } from "lucide-react";

export default function WhatsappSchedule() {
  useWhatsappReminderSettingsSyncToUpcomingHours();

  const { upcomingHours, setUpcomingHours, lastResult } =
    useWhatsappScheduleState();
  const saveSettingsMutation = useWhatsappSaveReminderSettingsMutation();
  const runScheduleMutation = useWhatsappRunScheduleMutation();
  const {
    isSendDialogOpen,
    setIsSendDialogOpen,
    sendTo,
    setSendTo,
    sendText,
    setSendText,
    sending,
    sendError,
    sendSuccess,
    clearSendStatus,
    sendMessage,
  } = useWhatsappSendMessageState();

  const {
    data: ongoingBookings,
    isLoading: isLoadingOngoing,
    isError: isErrorOngoing,
  } = useBookingsQuery({ status: "ongoing", pageSize: 50 });

  async function handleRunSchedule() {
    await runScheduleMutation.mutateAsync(upcomingHours);
  }

  async function handleSaveSettings() {
    await saveSettingsMutation.mutateAsync(upcomingHours);
  }

  async function handleSendMessage() {
    await sendMessage();
  }

  return (
    <section className="relative flex h-[calc(100vh-80px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative border-b border-border bg-linear-to-b from-background to-card/60">
        <div className="px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                WhatsApp Schedule
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Atur dan jalankan bot pengingat WhatsApp berdasarkan periode
                booking. Bot akan mengirim pesan ke customer ketika periode sewa
                mendekati atau sudah lewat.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#008069] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#008069]/20 transition-colors hover:bg-[#065e52] active:scale-[0.99] sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Tambah pengaturan
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Pengaturan Periode Pengingat</DialogTitle>
                    <DialogDescription>
                      Tentukan berapa jam sebelum tanggal mulai booking customer
                      akan mendapatkan pengingat otomatis.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-border bg-background/60 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Kirim pengingat sebelum mulai dalam
                        </label>
                        <div className="flex w-full items-center gap-3 md:w-auto">
                          <div className="relative w-full md:w-auto">
                            <input
                              type="number"
                              min={1}
                              max={168}
                              value={upcomingHours}
                              onChange={(e) =>
                                setUpcomingHours(
                                  Math.max(1, Number(e.target.value) || 1),
                                )
                              }
                              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm tabular-nums text-foreground shadow-sm outline-none transition focus:border-[#008069] focus:ring-2 focus:ring-[#008069]/20 md:w-28"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            jam sebelum mulai
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
                      <p>
                        Pengaturan ini disimpan di database dan akan digunakan
                        sebagai jam pengingat default sebelum periode berakhir.
                      </p>
                      <p>
                        Endpoint ini sebaiknya dijalankan otomatis via cron
                        (misalnya setiap 15 menit) untuk mengirim pengingat
                        berdasarkan data booking dari sistem utama.
                      </p>
                    </div>
                  </div>

                  <DialogFooter className="gap-2 sm:gap-2">
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Batal
                      </button>
                    </DialogClose>
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={saveSettingsMutation.isPending}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saveSettingsMutation.isPending
                        ? "Menyimpan..."
                        : "Simpan pengaturan"}
                    </button>
                    <button
                      type="button"
                      onClick={handleRunSchedule}
                      disabled={runScheduleMutation.isPending}
                      className="inline-flex items-center justify-center rounded-xl bg-[#008069] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#008069]/25 transition-colors hover:bg-[#026352] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {runScheduleMutation.isPending
                        ? "Menjalankan bot..."
                        : "Jalankan bot sekarang"}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isSendDialogOpen}
                onOpenChange={(open) => {
                  setIsSendDialogOpen(open);
                  if (!open) clearSendStatus();
                }}
              >
                <DialogTrigger asChild>
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted sm:w-auto">
                    <SendHorizontal className="h-4 w-4" />
                    Kirim pesan bot
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Kirim Pesan Bot</DialogTitle>
                    <DialogDescription>
                      Kirim pesan manual via WhatsApp bot. Isi nomor dalam
                      format WA JID (contoh:{" "}
                      <strong>62812xxxx@s.whatsapp.net</strong>) atau
                      nomor/format yang bot kamu terima.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Tujuan (to)
                      </label>
                      <Input
                        value={sendTo}
                        onChange={(e) => setSendTo(e.target.value)}
                        placeholder="62812xxxx@s.whatsapp.net"
                        disabled={sending}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Pesan
                      </label>
                      <Textarea
                        value={sendText}
                        onChange={(e) => setSendText(e.target.value)}
                        placeholder="Tulis pesan..."
                        disabled={sending}
                      />
                    </div>

                    {sendError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        Error: {sendError}
                      </div>
                    )}
                    {sendSuccess && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                        {sendSuccess}
                      </div>
                    )}
                  </div>

                  <DialogFooter className="gap-2 sm:gap-2">
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Tutup
                      </button>
                    </DialogClose>
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={sending || !sendTo.trim() || !sendText.trim()}
                      className="inline-flex items-center justify-center rounded-xl bg-[#008069] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#008069]/25 transition-colors hover:bg-[#026352] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? "Mengirim..." : "Kirim pesan"}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 md:px-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-4 py-4 md:px-6">
              <h2 className="text-base font-semibold text-foreground">
                Data Booking Berstatus Ongoing
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Daftar booking yang saat ini berstatus <strong>ongoing</strong>.
              </p>
            </div>

            <div className="p-4 md:p-6">
              {isLoadingOngoing && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/40" />
                  Memuat data booking berstatus ongoing...
                </div>
              )}

              {isErrorOngoing && !isLoadingOngoing && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Gagal memuat data booking berstatus ongoing.
                </div>
              )}

              {!isLoadingOngoing &&
                !isErrorOngoing &&
                (ongoingBookings?.data?.length ?? 0) === 0 && (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-10 text-center">
                    <p className="text-sm font-medium text-foreground">
                      Belum ada booking ongoing
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Data booking dengan status ongoing akan muncul di sini.
                    </p>
                  </div>
                )}

              {!isLoadingOngoing &&
                !isErrorOngoing &&
                (ongoingBookings?.data?.length ?? 0) > 0 && (
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <div className="max-h-[55vh] overflow-auto">
                      <Table className="min-w-full text-sm">
                        <TableHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
                          <TableRow className="border-border text-xs text-muted-foreground hover:bg-transparent">
                            <TableHead className="w-[170px] py-3 pr-4 text-left font-medium">
                              Booking ID
                            </TableHead>
                            <TableHead className="py-3 pr-4 text-left font-medium">
                              Customer
                            </TableHead>
                            <TableHead className="py-3 pr-4 text-left font-medium">
                              Armada
                            </TableHead>
                            <TableHead className="py-3 pr-4 text-left font-medium">
                              Mulai
                            </TableHead>
                            <TableHead className="py-3 pr-4 text-left font-medium">
                              Selesai
                            </TableHead>
                            <TableHead className="py-3 pr-4 text-left font-medium">
                              Status
                            </TableHead>
                            <TableHead className="py-3 pr-0 text-left font-medium">
                              Aksi
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ongoingBookings?.data?.map((booking) => (
                            <TableRow
                              key={booking.id}
                              className="border-border/70 transition-colors hover:bg-muted/30 last:border-0"
                            >
                              <TableCell className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                                {booking.id}
                              </TableCell>
                              <TableCell className="py-3 pr-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-foreground">
                                    {booking.customer_profiles?.full_name ??
                                      "Tanpa nama"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {booking.customer_profiles?.phone ?? "-"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="py-3 pr-4">
                                <span className="text-sm text-foreground">
                                  {booking.cars?.name ?? "-"}
                                </span>
                              </TableCell>
                              <TableCell className="py-3 pr-4 text-xs text-foreground">
                                {formatDate(booking.start_date)}
                              </TableCell>
                              <TableCell className="py-3 pr-4 text-xs text-foreground">
                                {formatDate(booking.end_date)}
                              </TableCell>
                              <TableCell className="py-3 pr-4">
                                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                                  {booking.status}
                                </span>
                              </TableCell>
                              <TableCell className="py-3 pr-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const phone =
                                      booking.customer_profiles?.phone;
                                    setSendTo(toWhatsappTo(phone));
                                    setSendText(
                                      buildDefaultWhatsappReminderMessage(
                                        booking,
                                      ),
                                    );
                                    clearSendStatus();
                                    setIsSendDialogOpen(true);
                                  }}
                                  className="inline-flex items-center justify-center rounded-xl bg-[#008069] px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-[#008069]/15 transition-colors hover:bg-[#026352] disabled:cursor-not-allowed disabled:opacity-60"
                                  disabled={!booking.customer_profiles?.phone}
                                  title={
                                    booking.customer_profiles?.phone
                                      ? "Kirim pesan ke customer"
                                      : "Nomor customer tidak tersedia"
                                  }
                                >
                                  Kirim
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {lastResult && (
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <div className="border-b border-border px-4 py-4 md:px-6">
                <h2 className="text-sm font-semibold text-foreground">
                  Ringkasan Hasil Terakhir
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ringkasan jumlah pesan yang berhasil dikirim dan error (jika
                  ada).
                </p>
              </div>
              <div className="space-y-3 p-4 md:p-6">
                <div className="flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Pesan terkirim
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {lastResult.sent ?? 0}
                  </span>
                </div>
                {lastResult.error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                    Error: {lastResult.error}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
