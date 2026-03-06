"use client";

import { useParams, useRouter } from "next/navigation";

import Link from "next/link";

import {
  CarFormInner,
  NewCarImagesSection,
  CarImagesSection,
  emptyForm,
  carToForm,
} from "./FormHelper";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import {
  useCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useNewCarImageItems,
  addCarImage,
  uploadCarImage,
} from "@/services/useStateCars";

export default function CrudCars() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id ?? "");
  const isNew = id === "new";

  const [newImageItems, setNewImageItems] = useNewCarImageItems();

  const { data: car, isLoading } = useCarQuery(isNew ? null : id);
  const createMutation = useCreateCarMutation();
  const updateMutation = useUpdateCarMutation();

  const handleSubmit = async (payload: CarCreateInput) => {
    if (isNew) {
      const created = await createMutation.mutateAsync(payload);
      if (created) {
        if (newImageItems.length > 0) {
          for (let index = 0; index < newImageItems.length; index++) {
            const item = newImageItems[index];
            try {
              const url =
                typeof item === "string"
                  ? item
                  : await uploadCarImage(created.id, item);
              await addCarImage(created.id, {
                image_url: url,
                is_primary: index === 0,
              });
            } catch {}
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
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-56 hidden md:block" />
          </div>
        </div>

        <div className="space-y-6 rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-20 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
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
        imagesSection={
          isNew ? (
            <NewCarImagesSection
              items={newImageItems}
              setItems={setNewImageItems}
              isPending={createMutation.isPending || updateMutation.isPending}
            />
          ) : (
            car && <CarImagesSection carId={car.id} />
          )
        }
      />
    </section>
  );
}
