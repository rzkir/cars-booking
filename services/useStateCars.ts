"use client";

import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/lib/config";

export const carsKeys = {
  all: ["cars"] as const,
  lists: () => [...carsKeys.all, "list"] as const,
  list: (params?: {
    status?: string;
    account_id?: string;
    page?: number;
    pageSize?: number;
  }) => [...carsKeys.lists(), params] as const,
  details: () => [...carsKeys.all, "detail"] as const,
  detail: (id: string) => [...carsKeys.details(), id] as const,
};

async function fetcher<T>(
  url: string,
  options?: RequestInit & { method?: string; body?: string },
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: getCarsApiHeaders({
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string>),
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Terjadi kesalahan");
  return data;
}

async function fetchCars(params?: {
  status?: string;
  account_id?: string;
  page?: number;
  pageSize?: number;
}): Promise<CarsListResponse> {
  const baseUrl = API_CONFIG.ENDPOINTS.cars.base;
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  if (params?.account_id) q.set("account_id", params.account_id);
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.pageSize != null) q.set("page_size", String(params.pageSize));
  const url = q.toString() ? `${baseUrl}?${q}` : baseUrl;
  const data = await fetcher<CarsListResponse>(url);

  if (!data || !Array.isArray(data.data)) {
    return {
      data: [],
      pagination: {
        currentPage: params?.page ?? 1,
        hasPrevPage: false,
        prevPage: null,
        hasNextPage: false,
        nextPage: null,
        totalPages: 0,
      },
    };
  }

  return data;
}

async function fetchCarById(id: string): Promise<Car> {
  return fetcher<Car>(API_CONFIG.ENDPOINTS.cars.byId(id));
}

async function createCar(input: CarCreateInput): Promise<Car> {
  return fetcher<Car>(API_CONFIG.ENDPOINTS.cars.base, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

async function updateCar(id: string, input: CarUpdateInput): Promise<Car> {
  return fetcher<Car>(API_CONFIG.ENDPOINTS.cars.byId(id), {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

async function deleteCar(id: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.cars.byId(id), { method: "DELETE" });
}

export function useCarsQuery(params?: {
  status?: string;
  account_id?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: carsKeys.list(params),
    queryFn: () => fetchCars(params),
  });
}

export function useCarQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: carsKeys.detail(id ?? ""),
    queryFn: () => fetchCarById(id!),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useCreateCarMutation(
  opts?: UseMutationOptions<Car, Error, CarCreateInput>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      toast.success("Mobil berhasil ditambahkan");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menambah mobil");
    },
    ...opts,
  });
}

export function useUpdateCarMutation(
  opts?: UseMutationOptions<Car, Error, { id: string; input: CarUpdateInput }>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => updateCar(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({ queryKey: carsKeys.detail(data.id) });
      toast.success("Mobil berhasil diperbarui");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal memperbarui mobil");
    },
    ...opts,
  });
}

export function useDeleteCarMutation(
  opts?: UseMutationOptions<void, Error, string>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      toast.success("Mobil berhasil dihapus");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menghapus mobil");
    },
    ...opts,
  });
}

// ========== CAR IMAGES ==========

// ========== NEW CAR IMAGE ITEMS (untuk form tambah mobil) ==========

export function useNewCarImageItems() {
  return useState<(string | File)[]>([]);
}

// ========== CAR IMAGES ==========

export const carImagesKeys = {
  all: (carId: string) => [...carsKeys.detail(carId), "images"] as const,
};

async function fetchCarImages(carId: string): Promise<CarImage[]> {
  const data = await fetcher<CarImage[]>(
    API_CONFIG.ENDPOINTS.cars.images(carId),
  );
  return Array.isArray(data) ? data : [];
}

async function uploadCarImage(carId: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(API_CONFIG.ENDPOINTS.cars.upload(carId), {
    method: "POST",
    credentials: "include",
    headers: getCarsApiHeaders(),
    body: formData,
  });
  const data = (await res.json().catch(() => null)) as {
    url?: string;
    error?: string;
  };
  if (!res.ok) throw new Error(data?.error ?? "Gagal upload");
  if (!data?.url) throw new Error("URL tidak diterima");
  return data.url;
}

export async function addCarImage(
  carId: string,
  payload: { image_url: string; is_primary?: boolean },
): Promise<CarImage> {
  return fetcher<CarImage>(API_CONFIG.ENDPOINTS.cars.images(carId), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function deleteCarImage(carId: string, imageId: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.cars.imageById(carId, imageId), {
    method: "DELETE",
  });
}

async function setPrimaryCarImage(
  carId: string,
  imageId: string,
): Promise<CarImage> {
  return fetcher<CarImage>(
    API_CONFIG.ENDPOINTS.cars.imageById(carId, imageId),
    { method: "PATCH", body: JSON.stringify({ is_primary: true }) },
  );
}

async function updateCarImage(
  carId: string,
  imageId: string,
  payload: { is_primary?: boolean; position?: number },
): Promise<CarImage> {
  return fetcher<CarImage>(
    API_CONFIG.ENDPOINTS.cars.imageById(carId, imageId),
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export function useCarImagesQuery(carId: string | null) {
  return useQuery({
    queryKey: carImagesKeys.all(carId ?? ""),
    queryFn: () => fetchCarImages(carId!),
    enabled: !!carId,
  });
}

export function useAddCarImageMutation(carId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { image_url: string; is_primary?: boolean }) =>
      addCarImage(carId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({
        queryKey: carImagesKeys.all(carId),
      });
      toast.success("Gambar berhasil ditambahkan");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menambah gambar");
    },
  });
}

export function useDeleteCarImageMutation(carId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) => deleteCarImage(carId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({
        queryKey: carImagesKeys.all(carId),
      });
      toast.success("Gambar berhasil dihapus");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menghapus gambar");
    },
  });
}

export function useSetPrimaryCarImageMutation(carId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) => setPrimaryCarImage(carId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({
        queryKey: carImagesKeys.all(carId),
      });
      toast.success("Gambar utama diperbarui");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal mengatur gambar utama");
    },
  });
}

export function useUpdateCarImageMutation(carId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      imageId: string;
      payload: { is_primary?: boolean; position?: number };
    }) => updateCarImage(carId, args.imageId, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({
        queryKey: carImagesKeys.all(carId),
      });
      toast.success("Urutan gambar berhasil diperbarui");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal memperbarui gambar");
    },
  });
}

export { uploadCarImage };
