import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CarsModalProps = {
  booking: BookingWithRelations;
  colorName: string;
};

export default function CarsModal({ booking, colorName }: CarsModalProps) {
  const carImages = booking.cars?.car_images as
    | { image_url?: string; is_primary?: boolean }[]
    | { image_url?: string }
    | null
    | undefined;

  const imageUrl = Array.isArray(carImages)
    ? (carImages.find((i) => i.is_primary)?.image_url ??
      carImages[0]?.image_url)
    : (carImages as { image_url?: string } | null)?.image_url;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" variant="outline" disabled={!booking.cars}>
          Lihat Mobil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Mobil</DialogTitle>
          <DialogDescription>
            Data lengkap mobil untuk booking ini.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative aspect-16/10 w-full rounded-md bg-muted">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={booking.cars?.name ?? "Car image"}
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 640px) 100vw, 480px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Tidak ada gambar
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Nama</span>
            <span className="font-medium">{booking.cars?.name ?? "-"}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Warna</span>
            <span className="font-medium">{colorName}</span>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <span className="text-muted-foreground">Notes</span>
            <span className="whitespace-pre-wrap text-sm text-foreground">
              {booking.notes?.trim() ? booking.notes : "-"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
