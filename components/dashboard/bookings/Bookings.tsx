"use client";

import { BOOKING_STATUS_OPTIONS } from "@/services/bookings.service";

import { useDashboardBookingsState } from "@/services/cars.service";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";

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

import CarsModal from "@/components/dashboard/bookings/CarsModal";

import CostumersModal from "@/components/dashboard/bookings/CostumersModal";

export default function Bookings() {
  const {
    bookings,
    filteredBookings,
    colorsById,
    rentalTypeOptions,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    rentalTypeFilter,
    setRentalTypeFilter,
    isLoading,
    isError,
    error,
    updateBookingMutation,
  } = useDashboardBookingsState();

  if (isLoading) {
    return (
      <section className="space-y-4">
        <Card>
          <CardHeader className="flex flex-col gap-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-40 md:h-8" />
              <Skeleton className="h-4 w-72" />
            </div>
          </CardHeader>
        </Card>

        <div className="rounded-xl border border-border bg-card">
          <Table className="min-w-full text-sm">
            <TableHeader className="bg-muted text-xs font-semibold uppercase text-muted-foreground">
              <TableRow>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableHead key={index} className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 8 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-[160px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        Gagal memuat data bookings:{" "}
        {(error as Error)?.message ?? "Terjadi kesalahan"}
      </section>
    );
  }

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

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Cari customer, mobil, warna..."
              className="w-full md:max-w-xs"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Select
                value={rentalTypeFilter}
                onValueChange={(value) => setRentalTypeFilter(value)}
              >
                <SelectTrigger className="h-9 w-full min-w-[160px] sm:w-[180px] text-xs">
                  <SelectValue placeholder="Filter rental type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua rental type</SelectItem>
                  {rentalTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="h-9 w-full min-w-[160px] sm:w-[180px] text-xs">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua status</SelectItem>
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
            </div>
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
              <TableHead className="px-4 py-3 text-right">
                Total Harga
              </TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!filteredBookings.length ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  Tidak ada bookings yang cocok dengan pencarian atau filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => {
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
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
