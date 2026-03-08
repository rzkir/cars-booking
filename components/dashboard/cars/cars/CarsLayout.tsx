"use client";

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
  Search,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { Skeleton } from "@/components/ui/skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { useCarsListState } from "@/services/cars.service";

import { formatIdr } from "@/hooks/format-idr";

import {
  STATUS_OPTIONS,
  RENTAL_TYPE_OPTIONS,
  getPaginationRange,
  useFuelTypesQuery,
  useTransmissionsQuery,
} from "@/services/cars.service";

export default function CarsPage() {
  const { data: fuelTypes = [] } = useFuelTypesQuery();
  const { data: transmissions = [] } = useTransmissionsQuery();
  const fuelOptions = fuelTypes.map((f) => ({
    value: f.name,
    label: f.name.charAt(0).toUpperCase() + f.name.slice(1),
  }));
  const transmissionOptions = transmissions.map((t) => ({
    value: t.name.toLowerCase(),
    label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
  }));

  const {
    setPage,
    searchInput,
    setSearchInput,
    fuelType,
    setFuelType,
    status,
    setStatus,
    rentalType,
    setRentalType,
    transmission,
    setTransmission,
    carToDelete,
    openDeleteDialog,
    closeDeleteDialog,
    resetFilters,
    hasActiveFilters,
    cars,
    pagination,
    isLoading,
    deleteMutation,
    handleConfirmDelete,
  } = useCarsListState();

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl">List Mobil</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              Koleksi mobil terbaik untuk kenyamanan perjalanan Anda
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="font-medium flex items-center gap-2 w-fit"
          >
            <Link href="/dashboard/cars/new">
              <Plus className="w-5 h-5" />
              Tambah Mobil
            </Link>
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
            <div className="relative flex-1 w-fit">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama mobil..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua status</SelectItem>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={fuelType}
                onValueChange={(value) => {
                  setFuelType(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Bahan bakar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua bahan bakar</SelectItem>
                  {fuelOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={rentalType}
                onValueChange={(value) => {
                  setRentalType(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Tipe sewa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua tipe</SelectItem>
                  {RENTAL_TYPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={transmission}
                onValueChange={(value) => {
                  setTransmission(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Transmisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua transmisi</SelectItem>
                  {transmissionOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset filter
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading && cars.length === 0 ? (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <div className="relative aspect-16/10 w-full bg-muted">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader className="space-y-1">
                    <Skeleton className="h-5 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0 pb-4">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-10" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : cars.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search className="w-6 h-6" />
                </EmptyMedia>
                <EmptyTitle>
                  {hasActiveFilters
                    ? "Tidak ada mobil yang sesuai filter"
                    : "Belum ada mobil"}
                </EmptyTitle>
                <EmptyDescription>
                  {hasActiveFilters
                    ? "Coba ubah filter atau kata kunci pencarian."
                    : "Tambah mobil pertama Anda untuk memulai."}
                </EmptyDescription>
              </EmptyHeader>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={resetFilters}>
                  Reset filter
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/dashboard/cars/new">Tambah Mobil</Link>
                </Button>
              )}
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
                  : (car.car_images as { image_url?: string } | null)
                      ?.image_url;

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

          {!isLoading &&
            cars.length > 0 &&
            pagination &&
            pagination.totalPages > 1 && (
              <div className="border-t px-4 py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            pagination.hasPrevPage &&
                            pagination.prevPage != null
                          )
                            setPage(pagination.prevPage);
                        }}
                        className={
                          !pagination.hasPrevPage
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {getPaginationRange(
                      pagination.currentPage,
                      pagination.totalPages,
                    ).map((item, i) =>
                      item === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={item}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(item);
                            }}
                            isActive={item === pagination.currentPage}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            pagination.hasNextPage &&
                            pagination.nextPage != null
                          )
                            setPage(pagination.nextPage);
                        }}
                        className={
                          !pagination.hasNextPage
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
        </CardContent>
      </Card>

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
