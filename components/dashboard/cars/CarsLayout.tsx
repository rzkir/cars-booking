"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Plus,
  Pencil,
  Trash2,
  Car,
  Key,
  Users,
  Gauge,
  CircleDot,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import { useCarsQuery, useDeleteCarMutation } from "@/services/useStateCars";

import { formatIdr } from "@/hooks/format-idr";

export default function CarsPage() {
  const { data, isLoading } = useCarsQuery();
  const cars = data?.data ?? [];
  const deleteMutation = useDeleteCarMutation();
  const [carToDelete, setCarToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const openDeleteDialog = (id: string, name: string) => {
    setCarToDelete({ id, name });
  };

  const closeDeleteDialog = () => {
    setCarToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;
    await deleteMutation.mutateAsync(carToDelete.id);
    closeDeleteDialog();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 bg-accent rounded-lg border">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            List Mobil
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Koleksi mobil terbaik untuk kenyamanan perjalanan Anda
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="font-medium flex items-center gap-2"
        >
          <Link href="/dashboard/cars/new">
            <Plus className="w-5 h-5" />
            Tambah Mobil
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        {isLoading && cars.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Memuat data...
          </div>
        ) : cars.length === 0 ? (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Plus className="w-6 h-6" />
              </EmptyMedia>
              <EmptyTitle>Belum ada mobil</EmptyTitle>
              <EmptyDescription>
                Tambah mobil pertama Anda untuk memulai.
              </EmptyDescription>
            </EmptyHeader>
            <Button asChild>
              <Link href="/dashboard/cars/new">Tambah Mobil</Link>
            </Button>
          </Empty>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => {
              const selfDrive = car.car_pricings?.find(
                (p) => p.type === "self_drive",
              );
              const withDriver = car.car_pricings?.find(
                (p) => p.type === "with_driver",
              );
              const baseSelf = selfDrive?.price_per_day ?? car.price_per_day;
              const baseWith =
                withDriver?.price_per_day ??
                car.price_with_driver_per_day ??
                null;

              const imageUrl = Array.isArray(car.car_images)
                ? (car.car_images.find((i) => i.is_primary)?.image_url ??
                  car.car_images[0]?.image_url)
                : (car.car_images as { image_url?: string } | null)?.image_url;

              return (
                <Card key={car.id} className="overflow-hidden p-0">
                  <div className="relative aspect-16/10 w-full bg-muted">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={car.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Car className="h-12 w-12" />
                      </div>
                    )}
                  </div>

                  <CardHeader className="space-y-1">
                    <CardTitle className="text-lg leading-tight">
                      {car.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Harga per hari
                      </p>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Key className="h-3.5 w-3.5 shrink-0" />
                            Lepas kunci
                          </span>
                          <span className="font-semibold tabular-nums">
                            {formatIdr(baseSelf)}
                          </span>
                        </div>
                        {baseWith && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Users className="h-3.5 w-3.5 shrink-0" />
                              Dengan supir
                            </span>
                            <span className="font-semibold tabular-nums">
                              {formatIdr(baseWith)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                        <Gauge className="h-3 w-3 shrink-0" />
                        {car.transmission}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        <Users className="h-3 w-3 shrink-0" />
                        {car.capacity} orang
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                        <CircleDot className="h-3 w-3 shrink-0" />
                        {car.status}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0 pb-4">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Link href={`/dashboard/cars/${car.id}`}>
                        <Pencil className="mr-2 w-4 h-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive border-destructive/50 hover:border-destructive"
                      onClick={() => openDeleteDialog(car.id, car.name)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={!!carToDelete}
        onOpenChange={(open) => !open && closeDeleteDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus mobil</DialogTitle>
            <DialogDescription>
              Yakin hapus mobil &quot;{carToDelete?.name}&quot;? Tindakan ini
              tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
