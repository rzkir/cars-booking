"use client";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { usePaymentsQuery } from "@/services/payments.service";

import { PaymentDetails } from "./PaymentDetails";

import { CostumersDetails } from "./CostumersDetails";

import { CustomerName } from "./CustomerName";

export default function Payments() {
  const { data, isLoading, isError } = usePaymentsQuery();

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl">
              Semua Pembayaran
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              Semua data pembayaran yang telah dilakukan oleh pelanggan
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-destructive">Gagal memuat data.</p>
          )}

          {!isLoading && !isError && (
            <>
              {(!data || data.length === 0) && (
                <p className="text-sm text-muted-foreground">
                  Belum ada data pembayaran.
                </p>
              )}

              {data && data.length > 0 && (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[160px]">
                          <Button
                            type="button"
                            variant="ghost"
                            className="px-0 font-semibold"
                          >
                            Tanggal
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>ID Booking</TableHead>
                        <TableHead>Pelanggan</TableHead>
                        <TableHead>Metode</TableHead>
                        <TableHead className="text-right">Nominal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[140px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="text-xs md:text-sm">
                            {new Date(
                              payment.paid_at ?? payment.created_at,
                            ).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="font-mono text-xs md:text-sm">
                            {payment.booking_id}
                          </TableCell>
                          <TableCell className="font-mono text-xs md:text-sm">
                            <CustomerName bookingId={payment.booking_id} />
                          </TableCell>
                          <TableCell className="capitalize text-xs md:text-sm">
                            {payment.method ?? "-"}
                          </TableCell>
                          <TableCell className="text-right text-xs md:text-sm font-semibold">
                            Rp{" "}
                            {payment.amount.toLocaleString("id-ID", {
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm capitalize">
                            {payment.status}
                          </TableCell>
                          <TableCell className="flex items-center justify-end gap-2">
                            <CostumersDetails bookingId={payment.booking_id} />
                            <PaymentDetails payment={payment} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
