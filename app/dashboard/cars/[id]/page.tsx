"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CarCreateInput } from "@/services/useStateCars";
import {
  useCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useCarImagesQuery,
  useAddCarImageMutation,
  useDeleteCarImageMutation,
  useSetPrimaryCarImageMutation,
  useUpdateCarImageMutation,
  uploadCarImage,
  addCarImage,
} from "@/services/useStateCars";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price_per_day: "",
  transmission: "manual" as "manual" | "matic",
  capacity: "",
  fuel_type: "",
  status: "available" as "available" | "rented" | "maintenance",
};

function carToForm(car: Car) {
  return {
    name: car.name,
    slug: car.slug,
    description: car.description ?? "",
    price_per_day: String(car.price_per_day),
    transmission: car.transmission,
    capacity: String(car.capacity),
    fuel_type: car.fuel_type ?? "",
    status: car.status,
  };
}

function CarFormInner({
  initialForm,
  isNew,
  onSubmit,
  isPending,
}: {
  initialForm: typeof emptyForm;
  isNew: boolean;
  onSubmit: (payload: CarCreateInput) => Promise<void>;
  isPending: boolean;
}) {
  const [form, setForm] = useState(initialForm);

  const autoSlug = () => {
    const s = form.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm((prev) => ({ ...prev, slug: s }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      description: form.description.trim() || undefined,
      price_per_day: Number(form.price_per_day),
      transmission: form.transmission,
      capacity: Number(form.capacity),
      fuel_type: form.fuel_type.trim() || undefined,
      status: form.status,
    };
    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-6 rounded-lg border p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nama *</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          onBlur={isNew ? autoSlug : undefined}
          placeholder="Contoh: Toyota Avanza"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={form.slug}
          placeholder="toyota-avanza (otomatis dari nama)"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Deskripsi mobil..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price_per_day">Harga / hari (Rp) *</Label>
          <Input
            id="price_per_day"
            type="number"
            min={1}
            value={form.price_per_day}
            onChange={(e) =>
              setForm((p) => ({ ...p, price_per_day: e.target.value }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Kapasitas (orang) *</Label>
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmisi *</Label>
          <Select
            value={form.transmission}
            onValueChange={(value) =>
              setForm((p) => ({
                ...p,
                transmission: value as "manual" | "matic",
              }))
            }
          >
            <SelectTrigger id="transmission" className="w-full">
              <SelectValue placeholder="Pilih transmisi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="matic">Matic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fuel_type">Jenis Bahan Bakar</Label>
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
              <SelectItem value="bensin">Bensin</SelectItem>
              <SelectItem value="solar">Solar</SelectItem>
              <SelectItem value="listrik">Listrik</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
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
      </div>

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

function NewCarImagesSection({
  files,
  setFiles,
  isPending,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isPending: boolean;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(e.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    setFiles(nextFiles);
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return nextFiles.map((file) => URL.createObjectURL(file));
    });
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

    const currentFiles = [...files];
    const fromIndex = draggingIndex;
    const toIndex = targetIndex;
    if (
      fromIndex < 0 ||
      fromIndex >= currentFiles.length ||
      toIndex < 0 ||
      toIndex >= currentFiles.length
    ) {
      return;
    }

    const [moved] = currentFiles.splice(fromIndex, 1);
    currentFiles.splice(toIndex, 0, moved);

    setFiles(currentFiles);
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return currentFiles.map((file) => URL.createObjectURL(file));
    });

    setDraggingIndex(toIndex);
  };

  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="max-w-xl space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <Label htmlFor="new-images">Gambar Mobil</Label>
        <Input
          id="new-images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={isPending}
        />
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previews.map((src, index) => (
              <div
                key={src}
                draggable
                onDragStart={() => handlePreviewDragStart(index)}
                onDragOver={(e) => handlePreviewDragOver(e, index)}
                onDragEnd={() => setDraggingIndex(null)}
                className="relative aspect-video rounded-lg border bg-muted overflow-hidden cursor-move"
              >
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CarImagesSection({ carId }: { carId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { data: images = [], isLoading } = useCarImagesQuery(carId);
  const [localImages, setLocalImages] = useState<CarImage[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const addMutation = useAddCarImageMutation(carId);
  const deleteMutation = useDeleteCarImageMutation(carId);
  const setPrimaryMutation = useSetPrimaryCarImageMutation(carId);
  const updateImageMutation = useUpdateCarImageMutation(carId);

  // sinkronkan state lokal dengan data dari server
  React.useEffect(() => {
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
      // Error handled in mutation
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
    } catch {
      // error sudah di-handle oleh mutation
    }
  };

  return (
    <div className="max-w-xl space-y-4 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Gambar Mobil</h3>
        <div>
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
            {uploading ? "Mengupload..." : "Tambah Gambar"}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat gambar...</p>
      ) : localImages.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Belum ada gambar. Klik &quot;Tambah Gambar&quot; atau drag &amp; drop
          gambar ke area ini untuk mengupload.
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
                  onClick={() => {
                    if (confirm("Hapus gambar?")) deleteMutation.mutate(img.id);
                  }}
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
  );
}

export default function CarFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id ?? "");
  const isNew = id === "new";

  const [newImages, setNewImages] = useState<File[]>([]);

  const { data: car, isLoading } = useCarQuery(isNew ? null : id);
  const createMutation = useCreateCarMutation();
  const updateMutation = useUpdateCarMutation();

  const handleSubmit = async (payload: CarCreateInput) => {
    if (isNew) {
      const created = await createMutation.mutateAsync(payload);
      if (created) {
        if (newImages.length > 0) {
          for (let index = 0; index < newImages.length; index++) {
            const file = newImages[index];
            try {
              const url = await uploadCarImage(created.id, file);
              await addCarImage(created.id, {
                image_url: url,
                is_primary: index === 0,
              });
            } catch {
              // Error toast sudah ditangani di service upload/add
            }
          }
        }
        router.push("/dashboard/cars");
      }
    } else {
      const updated = await updateMutation.mutateAsync({ id, input: payload });
      if (updated) router.push("/dashboard/cars");
    }
  };

  if (!isNew && isLoading) {
    return (
      <section className="p-4">
        <p className="text-muted-foreground">Memuat data...</p>
      </section>
    );
  }

  if (!isNew && !car) {
    router.push("/dashboard/cars");
    return null;
  }

  const initialForm = car ? carToForm(car) : emptyForm;
  const formKey = isNew ? "new" : car!.id;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/cars">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">
          {isNew ? "Tambah Mobil" : "Edit Mobil"}
        </h2>
      </div>

      <CarFormInner
        key={formKey}
        initialForm={initialForm}
        isNew={isNew}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      {isNew ? (
        <NewCarImagesSection
          files={newImages}
          setFiles={setNewImages}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      ) : (
        car && <CarImagesSection carId={car.id} />
      )}
    </section>
  );
}
