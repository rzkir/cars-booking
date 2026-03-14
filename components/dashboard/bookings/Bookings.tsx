"use client";

import {
  BOOKING_STATUS_OPTIONS,
  useBookingsQuery,
  useUpdateBookingMutation,
} from "@/services/bookings.service";

import { useColorsQuery } from "@/services/cars.service";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CarsModal from "./CarsModal";

import CostumersModal from "./CostumersModal";

export default function Bookings() {
  const { data, isLoading, isError, error } = useBookingsQuery();
  const updateBookingMutation = useUpdateBookingMutation();
  const { data: colorsData } = useColorsQuery();

  const colorsById = new Map((colorsData ?? []).map((c) => [c.id, c]));

  if (isLoading) {
    return <section>Memuat data bookings...</section>;
  }

  if (isError) {
    return (
      <section>
        Gagal memuat data bookings:{" "}
        {(error as Error)?.message ?? "Terjadi kesalahan"}
      </section>
    );
  }

  const bookings = data?.data ?? [];

  if (!bookings.length) {
    return <section>Tidak ada data bookings.</section>;
  }

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl">
              Semua Bookings
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              Semua data bookings yang telah dilakukan oleh pelanggan
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="rounded-xl border border-border bg-card">
        <Table className="min-w-full text-sm">
          <TableHeader className="bg-muted text-xs font-semibold uppercase text-muted-foreground">
            <TableRow>
              <TableHead className="px-4 py-3 text-left">Customer</TableHead>
              <TableHead className="px-4 py-3 text-left">Mobil</TableHead>
              <TableHead className="px-4 py-3 text-left">Warna</TableHead>
              <TableHead className="px-4 py-3 text-left">Rental Type</TableHead>
              <TableHead className="px-4 py-3 text-left">Periode</TableHead>
              <TableHead className="px-4 py-3 text-left">Status</TableHead>
              <TableHead className="px-4 py-3 text-left">Notes</TableHead>
              <TableHead className="px-4 py-3 text-right">
                Total Harga
              </TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const colorNameForModal =
                booking.colors?.name ??
                (booking.color_id
                  ? (colorsById.get(booking.color_id)?.name ?? "-")
                  : "-");

              return (
                <TableRow key={booking.id} className="hover:bg-muted/60">
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {booking.customer_profiles?.full_name ?? "-"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.customer_profiles?.phone ?? "-"}
                      </span>
                      {!booking.customer_profiles &&
                      booking.customer_profile_id ? (
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {booking.customer_profile_id}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {booking.cars?.name ?? "-"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.colors?.name ??
                          (booking.color_id
                            ? (colorsById.get(booking.color_id)?.name ?? "")
                            : "")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {booking.colors?.name ??
                          (booking.color_id
                            ? (colorsById.get(booking.color_id)?.name ?? "-")
                            : "-")}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {booking.color_id ?? "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {booking.rental_type?.replace("_", " ") ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                    {booking.start_date} – {booking.end_date}
                  </TableCell>
                  <TableCell className="px-4 py-3 capitalize">
                    <Select
                      defaultValue={booking.status}
                      disabled={updateBookingMutation.isPending}
                      onValueChange={(value) => {
                        if (value === booking.status) return;
                        updateBookingMutation.mutate({
                          id: booking.id,
                          input: { status: value as BookingStatus },
                        });
                      }}
                    >
                      <SelectTrigger className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground border-none shadow-none h-auto min-w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BOOKING_STATUS_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="capitalize"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="px-4 py-3 max-w-[320px]">
                    <span className="block truncate text-muted-foreground">
                      {booking.notes?.trim() ? booking.notes : "-"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right font-semibold">
                    {booking.total_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <CostumersModal booking={booking} />
                      <CarsModal
                        booking={booking}
                        colorName={colorNameForModal}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
