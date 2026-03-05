"use client";

import Link from "next/link";

import { Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import { useCarsQuery, useDeleteCarMutation } from "@/services/useStateCars";

export default function CarsPage() {
  const { data, isLoading } = useCarsQuery();
  const cars = data?.data ?? [];
  const deleteMutation = useDeleteCarMutation();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin hapus mobil "${name}"?`)) return;
    await deleteMutation.mutateAsync(id);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Harga/hari</TableHead>
                <TableHead>Transmisi</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[140px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {car.slug}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const selfDrive = car.car_pricings?.find(
                        (p) => p.type === "self_drive",
                      );
                      const withDriver = car.car_pricings?.find(
                        (p) => p.type === "with_driver",
                      );

                      const baseSelf =
                        selfDrive?.price_per_day ?? car.price_per_day;
                      const baseWith =
                        withDriver?.price_per_day ??
                        car.price_with_driver_per_day ??
                        null;

                      return (
                        <div className="space-y-1 text-xs sm:text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Lepas kunci:
                            </span>{" "}
                            <span className="font-medium">
                              Rp {baseSelf.toLocaleString("id-ID")}
                            </span>
                          </div>
                          {baseWith && (
                            <div>
                              <span className="text-muted-foreground">
                                Dengan supir:
                              </span>{" "}
                              <span className="font-medium">
                                Rp {baseWith.toLocaleString("id-ID")}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </TableCell>
                  <TableCell className="capitalize">
                    {car.transmission}
                  </TableCell>
                  <TableCell>{car.capacity} orang</TableCell>
                  <TableCell className="capitalize">{car.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/dashboard/cars/${car.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(car.id, car.name)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
