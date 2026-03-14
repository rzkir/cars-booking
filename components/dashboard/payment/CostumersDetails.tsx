import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";

import { useBookingQuery } from "@/services/bookings.service";

type CostumersDetailsProps = {
  bookingId: string;
};

export function CostumersDetails({ bookingId }: CostumersDetailsProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useBookingQuery(bookingId, {
    enabled: open,
  });

  const customer = data?.customer_profiles ?? null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Customer</DialogTitle>
          <DialogDescription>
            Data profil customer untuk transaksi pembayaran ini.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-destructive">
            Gagal memuat data customer.
          </p>
        )}

        {!isLoading && !isError && !customer && (
          <p className="text-sm text-muted-foreground">
            Data customer tidak tersedia untuk booking ini.
          </p>
        )}

        {!isLoading && !isError && customer && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-xs break-all">{customer.id}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Nama</span>
              <span className="font-medium">{customer.full_name}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Nomor Telepon</span>
              <span className="font-medium">{customer.phone}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{customer.email ?? "-"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Status Verifikasi</span>
              <span className="font-medium">
                {customer.is_verified ? "Terverifikasi" : "Belum terverifikasi"}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
