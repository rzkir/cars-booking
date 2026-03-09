"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import {
  BadgeCheck,
  Calendar,
  Car,
  CircleDollarSign,
  FileText,
  Fuel,
  Gauge,
  Image as ImageIcon,
  ListChecks,
  Palette,
  Plus,
  Settings2,
  Star,
  Tag,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { formatIdrInput, parseIdrInput } from "@/hooks/format-idr";

import QuillEditor from "@/helper/editor/QuillEditor";

import {
  useCarImagesQuery,
  useAddCarImageMutation,
  useDeleteCarImageMutation,
  useSetPrimaryCarImageMutation,
  useUpdateCarImageMutation,
  uploadCarImage,
  useTransmissionsQuery,
  useFuelTypesQuery,
  useFacilitiesQuery,
  useColorsQuery,
} from "@/services/cars.service";

export const emptyForm = {
  name: "",
  slug: "",
  description: "",
  content: "",
  price_per_day: "",
  price_with_driver_per_day: "",
  transmission: "",
  capacity: "",
  fuel_type: "",
  year: "",
  rental_type: "self_drive" as "self_drive" | "with_driver",
  facilities: "",
  colors: "",
  status: "available" as "available" | "rented" | "maintenance",
};

export function carToForm(car: Car) {
  return {
    name: car.name,
    slug: car.slug,
    description: car.description ?? "",
    content: car.content ?? "",
    price_per_day: String(car.price_per_day),
    price_with_driver_per_day:
      car.price_with_driver_per_day != null
        ? String(car.price_with_driver_per_day)
        : "",
    transmission: car.transmission,
    capacity: String(car.capacity),
    fuel_type: car.fuel_type ?? "",
    year: car.year != null ? String(car.year) : "",
    rental_type: car.rental_type,
    facilities: car.facilities?.join(", ") ?? "",
    colors: car.colors?.join(", ") ?? "",
    status: car.status,
  };
}

export function CarFormInner({
  initialForm,
  isNew,
  onSubmit,
  isPending,
  imagesSection,
}: {
  initialForm: typeof emptyForm;
  isNew: boolean;
  onSubmit: (payload: CarCreateInput) => Promise<void>;
  isPending: boolean;
  imagesSection?: React.ReactNode;
}) {
  const [form, setForm] = useState(initialForm);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(() =>
    initialForm.facilities
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(() =>
    initialForm.colors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
  );
  const { data: transmissions = [] } = useTransmissionsQuery();
  const { data: fuelTypes = [] } = useFuelTypesQuery();
  const { data: facilities = [] } = useFacilitiesQuery();
  const { data: colors = [] } = useColorsQuery();

  const transmissionOptions = transmissions.map((t) => ({
    value: t.name.toLowerCase(),
    label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
  }));

  const fuelOptions = fuelTypes.map((f) => ({
    value: f.name,
    label: f.name.charAt(0).toUpperCase() + f.name.slice(1),
  }));

  const toggleFacility = (name: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name],
    );
  };

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const autoSlug = () => {
    const s = form.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm((prev) => ({ ...prev, slug: s }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const yearValue = form.year.trim();

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      description: form.description.trim() || undefined,
      content: form.content.trim() || undefined,
      price_per_day: parseIdrInput(form.price_per_day),
      price_with_driver_per_day: form.price_with_driver_per_day.trim()
        ? parseIdrInput(form.price_with_driver_per_day)
        : undefined,
      transmission: form.transmission?.trim().toLowerCase() ?? "",
      capacity: Number(form.capacity),
      fuel_type: form.fuel_type.trim() || undefined,
      year: yearValue ? Number(yearValue) : undefined,
      rental_type: form.rental_type as "self_drive" | "with_driver",
      facilities:
        selectedFacilities.length > 0 ? selectedFacilities : undefined,
      colors: selectedColors.length > 0 ? selectedColors : undefined,
      status: form.status,
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="name">
            <Car className="h-4 w-4" />
            Nama *
          </FieldLabel>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            onBlur={isNew ? autoSlug : undefined}
            placeholder="Contoh: Toyota Avanza"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="slug">
            <Tag className="h-4 w-4" />
            Slug
          </FieldLabel>
          <Input
            id="slug"
            value={form.slug}
            placeholder="toyota-avanza (otomatis dari nama)"
            readOnly
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="status">
            <BadgeCheck className="h-4 w-4" />
            Status
          </FieldLabel>
          <Select
            value={form.status}
            onValueChange={(value) =>
              setForm((p) => ({
                ...p,
                status: value as "available" | "rented" | "maintenance",
              }))
            }
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Tersedia</SelectItem>
              <SelectItem value="rented">Disewa</SelectItem>
              <SelectItem value="maintenance">Perawatan</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="rental_type">
            <Settings2 className="h-4 w-4" />
            Tipe Sewa Default
          </FieldLabel>
          <Select
            value={form.rental_type}
            onValueChange={(value) =>
              setForm((p) => ({
                ...p,
                rental_type: value as "self_drive" | "with_driver",
              }))
            }
          >
            <SelectTrigger id="rental_type" className="w-full">
              <SelectValue placeholder="Pilih tipe sewa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self_drive">
                Lepas Kunci (Self-drive)
              </SelectItem>
              <SelectItem value="with_driver">Dengan Supir</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="price_per_day">
            <CircleDollarSign className="h-4 w-4" />
            Harga / hari lepas kunci (Rp) *
          </FieldLabel>
          <Input
            id="price_per_day"
            type="text"
            inputMode="numeric"
            value={formatIdrInput(form.price_per_day)}
            onChange={(e) => {
              const num = parseIdrInput(e.target.value);
              setForm((p) => ({
                ...p,
                price_per_day: e.target.value.trim() === "" ? "" : String(num),
              }));
            }}
            placeholder="Contoh: Rp 500.000"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price_with_driver_per_day">
            <CircleDollarSign className="h-4 w-4" />
            Harga / hari dengan supir (Rp)
          </FieldLabel>
          <Input
            id="price_with_driver_per_day"
            type="text"
            inputMode="numeric"
            value={formatIdrInput(form.price_with_driver_per_day)}
            onChange={(e) => {
              const num = parseIdrInput(e.target.value);
              setForm((p) => ({
                ...p,
                price_with_driver_per_day:
                  e.target.value.trim() === "" ? "" : String(num),
              }));
            }}
            placeholder="Opsional"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="capacity">
            <Users className="h-4 w-4" />
            Kapasitas (orang) *
          </FieldLabel>
          <Input
            id="capacity"
            type="number"
            min={1}
            value={form.capacity}
            onChange={(e) =>
              setForm((p) => ({ ...p, capacity: e.target.value }))
            }
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="transmission">
            <Gauge className="h-4 w-4" />
            Transmisi *
          </FieldLabel>
          <Select
            value={form.transmission}
            onValueChange={(value) =>
              setForm((p) => ({
                ...p,
                transmission: value,
              }))
            }
          >
            <SelectTrigger id="transmission" className="w-full">
              <SelectValue placeholder="Pilih transmisi" />
            </SelectTrigger>
            <SelectContent>
              {transmissionOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="fuel_type">
            <Fuel className="h-4 w-4" />
            Jenis Bahan Bakar
          </FieldLabel>
          <Select
            value={form.fuel_type || undefined}
            onValueChange={(value) =>
              setForm((p) => ({
                ...p,
                fuel_type: value,
              }))
            }
          >
            <SelectTrigger id="fuel_type" className="w-full">
              <SelectValue placeholder="Pilih jenis bahan bakar" />
            </SelectTrigger>
            <SelectContent>
              {fuelOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="year">
            <Calendar className="h-4 w-4" />
            Tahun
          </FieldLabel>
          <Input
            id="year"
            type="number"
            min={1900}
            max={2100}
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
            placeholder="Contoh: 2020"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="facilities">
            <ListChecks className="h-4 w-4" />
            Fasilitas
          </FieldLabel>
          {facilities.length > 0 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {facilities.map((facility) => {
                  const value = facility.name;
                  const checked = selectedFacilities.includes(value);
                  return (
                    <label
                      key={facility.id}
                      className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleFacility(value)}
                      />
                      <span className="truncate">{facility.name}</span>
                    </label>
                  );
                })}
              </div>
              <FieldDescription className="text-xs text-muted-foreground">
                Centang fasilitas yang tersedia.
              </FieldDescription>
            </div>
          ) : (
            <FieldDescription className="text-xs text-muted-foreground">
              Belum ada data fasilitas. Tambahkan fasilitas dulu di menu
              Facilities.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="colors">
            <Palette className="h-4 w-4" />
            Warna
          </FieldLabel>
          {colors.length > 0 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {colors.map((color) => {
                  const value = color.name;
                  const checked = selectedColors.includes(value);
                  return (
                    <label
                      key={color.id}
                      className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleColor(value)}
                      />
                      <span className="truncate">{color.name}</span>
                    </label>
                  );
                })}
              </div>
              <FieldDescription className="text-xs text-muted-foreground">
                Centang warna yang tersedia.
              </FieldDescription>
            </div>
          ) : (
            <FieldDescription className="text-xs text-muted-foreground">
              Belum ada data warna. Tambahkan warna dulu di menu Colors.
            </FieldDescription>
          )}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="description">
          <FileText className="h-4 w-4" />
          Deskripsi
        </FieldLabel>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Deskripsi mobil..."
          rows={3}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="content">
          <FileText className="h-4 w-4" />
          Konten (detail / informasi tambahan)
        </FieldLabel>
        <QuillEditor
          value={form.content}
          onChange={(content) => setForm((p) => ({ ...p, content }))}
          placeholder="Konten atau informasi detail mobil (bisa HTML/teks)..."
        />
        <FieldDescription className="text-xs text-muted-foreground">
          Opsional. Untuk informasi tambahan di halaman detail mobil.
        </FieldDescription>
      </Field>

      {imagesSection}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : isNew ? "Tambah Mobil" : "Simpan"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard/cars">Batal</Link>
        </Button>
      </div>
    </form>
  );
}

function getPreviewSrc(item: string | File): string {
  return typeof item === "string" ? item : URL.createObjectURL(item);
}

export function NewCarImagesSection({
  items,
  setItems,
  isPending,
}: {
  items: (string | File)[];
  setItems: React.Dispatch<React.SetStateAction<(string | File)[]>>;
  isPending: boolean;
}) {
  const [urlInput, setUrlInput] = useState("");
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const previewSrcs = React.useMemo(
    () => items.map((item) => getPreviewSrc(item)),
    [items],
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(e.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (nextFiles.length === 0) return;
    setItems((prev) => [...prev, ...nextFiles]);
    e.target.value = "";
  };

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    setItems((prev) => [...prev, url]);
    setUrlInput("");
  };

  const handlePreviewDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handlePreviewDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === targetIndex) return;
    if (
      draggingIndex < 0 ||
      draggingIndex >= items.length ||
      targetIndex < 0 ||
      targetIndex >= items.length
    )
      return;

    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggingIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDraggingIndex(targetIndex);
  };

  const handleSetPrimary = (index: number) => {
    if (index <= 0 || index >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.unshift(moved);
      return next;
    });
  };

  const handleRemove = (index: number) => {
    if (index < 0 || index >= items.length) return;
    const item = items[index];
    setItems((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    if (typeof item !== "string") {
      const url = getPreviewSrc(item);
      URL.revokeObjectURL(url);
    }
  };

  React.useEffect(() => {
    return () => {
      previewSrcs
        .filter((s) => s.startsWith("blob:"))
        .forEach(URL.revokeObjectURL);
    };
  }, [previewSrcs]);

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Field>
        <FieldLabel htmlFor="new-images">
          <ImageIcon className="h-4 w-4" />
          Gambar Mobil
        </FieldLabel>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="new-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={isPending}
            className="sm:max-w-xs"
          />
          <div className="flex gap-2 flex-1 min-w-0">
            <Input
              type="url"
              placeholder="Atau masukkan URL gambar (https://...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddUrl())
              }
              disabled={isPending}
              className="flex-1 min-w-0"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddUrl}
              disabled={!urlInput.trim() || isPending}
            >
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Tambah URL</span>
            </Button>
          </div>
        </div>
        {items.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previewSrcs.map((src, index) => (
              <div
                key={`img-${index}-${typeof items[index] === "string" ? src : (items[index] as File).name}`}
                draggable
                onDragStart={() => handlePreviewDragStart(index)}
                onDragOver={(e) => handlePreviewDragOver(e, index)}
                onDragEnd={() => setDraggingIndex(null)}
                className="relative aspect-video rounded-lg border bg-muted overflow-hidden cursor-move group"
              >
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                  unoptimized
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {index === 0 && (
                  <span className="absolute top-1 left-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    Utama
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleSetPrimary(index)}
                      title="Jadikan utama"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemove(index)}
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

export function CarImagesSection({ carId }: { carId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);
  const { data: images = [], isLoading } = useCarImagesQuery(carId);
  const [localImages, setLocalImages] = useState<CarImage[]>([]);
  const previousImagesRef = React.useRef<CarImage[] | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const addMutation = useAddCarImageMutation(carId);
  const deleteMutation = useDeleteCarImageMutation(carId);
  const setPrimaryMutation = useSetPrimaryCarImageMutation(carId);
  const updateImageMutation = useUpdateCarImageMutation(carId);

  React.useEffect(() => {
    const prev = previousImagesRef.current;

    const isSame =
      prev &&
      prev.length === images.length &&
      prev.every((img, index) => {
        const next = images[index];
        return (
          img.id === next.id &&
          img.image_url === next.image_url &&
          img.is_primary === next.is_primary
        );
      });

    if (isSame) {
      return;
    }

    previousImagesRef.current = images;
    setLocalImages(images);
  }, [images]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const url = await uploadCarImage(carId, file);
        const isFirst = images.length === 0 && index === 0;
        await addMutation.mutateAsync({ image_url: url, is_primary: isFirst });
      }
    } catch {
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDropUpload = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const url = await uploadCarImage(carId, file);
        const isFirst = images.length === 0 && index === 0;
        await addMutation.mutateAsync({ image_url: url, is_primary: isFirst });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleAddByUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    setUploading(true);
    try {
      await addMutation.mutateAsync({
        image_url: url,
        is_primary: localImages.length === 0,
      });
      setUrlInput("");
    } finally {
      setUploading(false);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOverItem = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    setLocalImages((prev) => {
      const current = [...prev];
      const fromIndex = current.findIndex((img) => img.id === draggingId);
      const toIndex = current.findIndex((img) => img.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  };

  const handleDropReorder = async () => {
    if (!draggingId || localImages.length === 0) {
      setDraggingId(null);
      return;
    }

    const currentOrder = localImages;
    setDraggingId(null);

    try {
      await Promise.all(
        currentOrder.map((img, index) =>
          updateImageMutation.mutateAsync({
            imageId: img.id,
            payload: { position: index },
          }),
        ),
      );
    } catch {}
  };

  const handleConfirmDelete = () => {
    if (imageIdToDelete) {
      deleteMutation.mutate(imageIdToDelete);
      setImageIdToDelete(null);
    }
  };

  return (
    <>
      <Dialog
        open={!!imageIdToDelete}
        onOpenChange={(open) => !open && setImageIdToDelete(null)}
      >
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Hapus gambar?</DialogTitle>
            <DialogDescription>
              Gambar ini akan dihapus dari mobil. Tindakan ini tidak dapat
              dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton={false}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setImageIdToDelete(null)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-4 rounded-lg border p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Gambar Mobil</h3>
            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Plus className="mr-2 h-4 w-4" />
                {uploading ? "Mengupload..." : "Upload File"}
              </Button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Input
              type="url"
              placeholder="Atau masukkan URL gambar (https://...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddByUrl())
              }
              disabled={uploading}
              className="flex-1 min-w-[200px]"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddByUrl}
              disabled={!urlInput.trim() || uploading}
            >
              Tambah dari URL
            </Button>
          </div>
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Memuat gambar...</p>
        ) : localImages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada gambar. Klik &quot;Tambah Gambar&quot; atau drag &amp;
            drop gambar ke area ini untuk mengupload.
          </p>
        ) : (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 rounded-lg border-dashed ${
              isDragOver
                ? "border-2 border-primary bg-primary/5"
                : "border border-transparent"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              if ((e.target as HTMLElement).closest("[data-dropzone]")) return;
              setIsDragOver(false);
            }}
            onDrop={handleDropUpload}
            data-dropzone
          >
            {localImages.map((img) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleDragStart(img.id)}
                onDragOver={(e) => handleDragOverItem(e, img.id)}
                onDrop={handleDropReorder}
                onDragEnd={handleDropReorder}
                className="relative aspect-video rounded-lg border bg-muted overflow-hidden group cursor-move"
              >
                <Image
                  src={img.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized
                />
                {img.is_primary && (
                  <span className="absolute top-1 left-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    Utama
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!img.is_primary && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPrimaryMutation.mutate(img.id)}
                      disabled={setPrimaryMutation.isPending}
                      title="Jadikan utama"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setImageIdToDelete(img.id)}
                    disabled={deleteMutation.isPending}
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
