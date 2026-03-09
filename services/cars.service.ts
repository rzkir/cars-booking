"use client";

import { useState, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

export function getPaginationRange(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "ellipsis", total];
  if (current >= total - 2)
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export const STATUS_OPTIONS = [
  { value: "available", label: "Tersedia" },
  { value: "rented", label: "Disewa" },
  { value: "maintenance", label: "Perawatan" },
];

export const RENTAL_TYPE_OPTIONS = [
  { value: "self_drive", label: "Lepas kunci" },
  { value: "with_driver", label: "Dengan supir" },
];

export const carsKeys = {
  all: ["cars"] as const,
  lists: () => [...carsKeys.all, "list"] as const,
  list: (params?: {
    status?: string;
    account_id?: string;
    search?: string;
    fuel_type?: string;
    rental_type?: string;
    transmission?: string;
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
  search?: string;
  fuel_type?: string;
  rental_type?: string;
  transmission?: string;
  page?: number;
  pageSize?: number;
}): Promise<CarsListResponse> {
  const hasSearchOrFilter =
    params?.search ||
    params?.status ||
    params?.fuel_type ||
    params?.rental_type ||
    params?.transmission;

  const baseUrl = hasSearchOrFilter
    ? API_CONFIG.ENDPOINTS.cars.search
    : API_CONFIG.ENDPOINTS.cars.base;

  const q = new URLSearchParams();
  if (params?.search) q.set("q", params.search);
  if (params?.status) q.set("status", params.status);
  if (!hasSearchOrFilter && params?.account_id)
    q.set("account_id", params.account_id);
  if (params?.fuel_type) q.set("fuel_type", params.fuel_type);
  if (params?.rental_type) q.set("rental_type", params.rental_type);
  if (params?.transmission) q.set("transmission", params.transmission);
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
  search?: string;
  fuel_type?: string;
  rental_type?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: carsKeys.list(params),
    queryFn: () => fetchCars(params),
  });
}

export const CARS_PUBLIC_PAGE_SIZE = 12;

export function useInfiniteCarsQuery(params?: {
  search?: string;
  fuel_type?: string;
  rental_type?: string;
  transmission?: string;
  initialData?: CarsListResponse;
}) {
  const { initialData, ...queryParams } = params ?? {};
  return useInfiniteQuery({
    queryKey: [...carsKeys.lists(), "infinite", queryParams] as const,
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        pageSize: CARS_PUBLIC_PAGE_SIZE,
        ...(queryParams.search && { search: queryParams.search }),
        ...(queryParams.fuel_type && { fuel_type: queryParams.fuel_type }),
        ...(queryParams.rental_type && {
          rental_type: queryParams.rental_type,
        }),
        ...(queryParams.transmission && {
          transmission: queryParams.transmission,
        }),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextPage
        : undefined,
    initialData:
      initialData &&
      !queryParams.search &&
      !queryParams.rental_type &&
      !queryParams.fuel_type &&
      !queryParams.transmission
        ? {
            pages: [initialData],
            pageParams: [1],
          }
        : undefined,
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

// ========== CARS PUBLIC FILTERS STATE (untuk halaman daftar mobil) ==========

export const CARS_PUBLIC_RENTAL_TYPE_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "self_drive", label: "Lepas Kunci" },
  { value: "with_driver", label: "Dengan Supir" },
] as const;

export const CARS_PUBLIC_PRICE_MIN = 300000;
export const CARS_PUBLIC_PRICE_MAX = 1200000;
export const CARS_PUBLIC_PRICE_STEP = 50000;

export type CarsPublicFiltersInitial = {
  search?: string;
  rentalType?: "self_drive" | "with_driver";
  transmission?: string;
  fuelType?: string;
  maxPrice?: number;
  transmissions?: Transmission[];
  fuelTypes?: FuelType[];
};

export function useCarsPublicFiltersState(initial: CarsPublicFiltersInitial) {
  const {
    search: initialSearch = "",
    rentalType: initialRentalType,
    transmission: initialTransmission,
    fuelType: initialFuelType,
    maxPrice: initialMaxPrice,
  } = initial;

  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [rentalTypeSelect, setRentalTypeSelect] = useState<
    (typeof CARS_PUBLIC_RENTAL_TYPE_OPTIONS)[number]["value"]
  >(initialRentalType ?? "all");
  const [appliedRentalType, setAppliedRentalType] = useState<
    "all" | "self_drive" | "with_driver"
  >(initialRentalType ?? "all");
  const [selectedTransmissions, setSelectedTransmissions] = useState<
    Set<string>
  >(
    () =>
      new Set(
        initialTransmission
          ? initialTransmission
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      ),
  );
  const [appliedTransmissions, setAppliedTransmissions] = useState<Set<string>>(
    () =>
      new Set(
        initialTransmission
          ? initialTransmission
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      ),
  );
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<Set<string>>(
    () =>
      new Set(
        initialFuelType
          ? initialFuelType
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      ),
  );
  const [appliedFuelTypes, setAppliedFuelTypes] = useState<Set<string>>(
    () =>
      new Set(
        initialFuelType
          ? initialFuelType
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      ),
  );
  const [priceMax, setPriceMax] = useState(
    initialMaxPrice ?? CARS_PUBLIC_PRICE_MAX,
  );
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(
    initialMaxPrice ?? CARS_PUBLIC_PRICE_MAX,
  );

  const updateUrl = (params: {
    search?: string;
    rentalType?: "all" | "self_drive" | "with_driver";
    transmission?: string;
    fuelType?: string;
    maxPrice?: number;
  }) => {
    const q = new URLSearchParams();
    if (params.search) q.set("q", params.search);
    if (params.rentalType && params.rentalType !== "all")
      q.set("rental_type", params.rentalType);
    if (params.transmission) q.set("transmission", params.transmission);
    if (params.fuelType) q.set("fuel_type", params.fuelType);
    if (
      params.maxPrice != null &&
      params.maxPrice > 0 &&
      params.maxPrice < CARS_PUBLIC_PRICE_MAX
    )
      q.set("max_price", String(params.maxPrice));
    const query = q.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handlePerbarui = () => {
    const normalizedSearch = searchInput.trim().replace(/\s+/g, " ");
    setSearchInput(normalizedSearch);
    setAppliedSearch(normalizedSearch);
    setAppliedRentalType(rentalTypeSelect);
    setAppliedTransmissions(new Set(selectedTransmissions));
    setAppliedFuelTypes(new Set(selectedFuelTypes));
    setAppliedMaxPrice(priceMax);
    updateUrl({
      search: normalizedSearch,
      rentalType: rentalTypeSelect,
      transmission:
        selectedTransmissions.size > 0
          ? Array.from(selectedTransmissions).join(",")
          : undefined,
      fuelType:
        selectedFuelTypes.size > 0
          ? Array.from(selectedFuelTypes).join(",")
          : undefined,
      maxPrice: priceMax < CARS_PUBLIC_PRICE_MAX ? priceMax : undefined,
    });
  };

  const handleReset = () => {
    setSearchInput("");
    setAppliedSearch("");
    setRentalTypeSelect("all");
    setAppliedRentalType("all");
    setSelectedTransmissions(new Set());
    setAppliedTransmissions(new Set());
    setSelectedFuelTypes(new Set());
    setAppliedFuelTypes(new Set());
    setPriceMax(CARS_PUBLIC_PRICE_MAX);
    setAppliedMaxPrice(CARS_PUBLIC_PRICE_MAX);
    updateUrl({});
  };

  const toggleTransmission = (name: string) => {
    setSelectedTransmissions((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleFuelType = (name: string) => {
    setSelectedFuelTypes((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const removeSearchFilter = () => {
    setSearchInput("");
    setAppliedSearch("");
    updateUrl({
      search: "",
      rentalType: appliedRentalType,
      transmission:
        appliedTransmissions.size > 0
          ? Array.from(appliedTransmissions).join(",")
          : undefined,
      fuelType:
        appliedFuelTypes.size > 0
          ? Array.from(appliedFuelTypes).join(",")
          : undefined,
      maxPrice:
        appliedMaxPrice < CARS_PUBLIC_PRICE_MAX ? appliedMaxPrice : undefined,
    });
  };

  const removeRentalTypeFilter = () => {
    setAppliedRentalType("all");
    setRentalTypeSelect("all");
    updateUrl({
      search: appliedSearch || undefined,
      rentalType: "all",
      transmission:
        appliedTransmissions.size > 0
          ? Array.from(appliedTransmissions).join(",")
          : undefined,
      fuelType:
        appliedFuelTypes.size > 0
          ? Array.from(appliedFuelTypes).join(",")
          : undefined,
      maxPrice:
        appliedMaxPrice < CARS_PUBLIC_PRICE_MAX ? appliedMaxPrice : undefined,
    });
  };

  const removeTransmissionFilter = (name: string) => {
    const next = new Set(appliedTransmissions);
    next.delete(name);
    setSelectedTransmissions(next);
    setAppliedTransmissions(next);
    updateUrl({
      search: appliedSearch || undefined,
      rentalType: appliedRentalType,
      transmission: next.size > 0 ? Array.from(next).join(",") : undefined,
      fuelType:
        appliedFuelTypes.size > 0
          ? Array.from(appliedFuelTypes).join(",")
          : undefined,
      maxPrice:
        appliedMaxPrice < CARS_PUBLIC_PRICE_MAX ? appliedMaxPrice : undefined,
    });
  };

  const removeFuelTypeFilter = (name: string) => {
    const next = new Set(appliedFuelTypes);
    next.delete(name);
    setSelectedFuelTypes(next);
    setAppliedFuelTypes(next);
    updateUrl({
      search: appliedSearch || undefined,
      rentalType: appliedRentalType,
      transmission:
        appliedTransmissions.size > 0
          ? Array.from(appliedTransmissions).join(",")
          : undefined,
      fuelType: next.size > 0 ? Array.from(next).join(",") : undefined,
      maxPrice:
        appliedMaxPrice < CARS_PUBLIC_PRICE_MAX ? appliedMaxPrice : undefined,
    });
  };

  const removePriceFilter = () => {
    setPriceMax(CARS_PUBLIC_PRICE_MAX);
    setAppliedMaxPrice(CARS_PUBLIC_PRICE_MAX);
    updateUrl({
      search: appliedSearch || undefined,
      rentalType: appliedRentalType,
      transmission:
        appliedTransmissions.size > 0
          ? Array.from(appliedTransmissions).join(",")
          : undefined,
      fuelType:
        appliedFuelTypes.size > 0
          ? Array.from(appliedFuelTypes).join(",")
          : undefined,
      maxPrice: undefined,
    });
  };

  return {
    searchInput,
    setSearchInput,
    appliedSearch,
    rentalTypeSelect,
    setRentalTypeSelect,
    appliedRentalType,
    selectedTransmissions,
    appliedTransmissions,
    selectedFuelTypes,
    appliedFuelTypes,
    priceMax,
    setPriceMax,
    appliedMaxPrice,
    updateUrl,
    handlePerbarui,
    handleReset,
    toggleTransmission,
    toggleFuelType,
    removeSearchFilter,
    removeRentalTypeFilter,
    removeTransmissionFilter,
    removeFuelTypeFilter,
    removePriceFilter,
  };
}

// ========== CARS LIST STATE (untuk halaman list mobil) ==========

export const CARS_LIST_PAGE_SIZE = 9;

export function useCarsListState() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [fuelType, setFuelType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [rentalType, setRentalType] = useState<string>("all");
  const [transmission, setTransmission] = useState<string>("all");
  const [carToDelete, setCarToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const { data, isLoading } = useCarsQuery({
    page,
    pageSize: CARS_LIST_PAGE_SIZE,
    ...(search && { search }),
    ...(fuelType && fuelType !== "all" && { fuel_type: fuelType }),
    ...(status && status !== "all" && { status }),
    ...(rentalType && rentalType !== "all" && { rental_type: rentalType }),
    ...(transmission && transmission !== "all" && { transmission }),
  });

  const cars = data?.data ?? [];
  const pagination = data?.pagination;
  const deleteMutation = useDeleteCarMutation();

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setFuelType("all");
    setStatus("all");
    setRentalType("all");
    setTransmission("all");
    setPage(1);
  };

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

  const hasActiveFilters =
    !!search ||
    fuelType !== "all" ||
    status !== "all" ||
    rentalType !== "all" ||
    transmission !== "all";

  return {
    page,
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
  };
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

// ========== LOOKUP: TRANSMISSIONS, FUEL TYPES, FACILITIES ==========

const LOOKUP_KEY_BASE = ["lookups"] as const;

export const lookupKeys = {
  all: LOOKUP_KEY_BASE,
  transmissions: [...LOOKUP_KEY_BASE, "transmissions"] as const,
  fuelTypes: [...LOOKUP_KEY_BASE, "fuelTypes"] as const,
  facilities: [...LOOKUP_KEY_BASE, "facilities"] as const,
  colors: [...LOOKUP_KEY_BASE, "colors"] as const,
};

async function fetchTransmissions(): Promise<Transmission[]> {
  const data = await fetcher<Transmission[]>(
    API_CONFIG.ENDPOINTS.transmissions.base,
  );
  return Array.isArray(data) ? data : [];
}

async function fetchFuelTypes(): Promise<FuelType[]> {
  const data = await fetcher<FuelType[]>(API_CONFIG.ENDPOINTS.fuelTypes.base);
  return Array.isArray(data) ? data : [];
}

async function fetchFacilities(): Promise<Facility[]> {
  const data = await fetcher<Facility[]>(API_CONFIG.ENDPOINTS.facilities.base);
  return Array.isArray(data) ? data : [];
}

async function fetchColors(): Promise<Color[]> {
  const data = await fetcher<Color[]>(API_CONFIG.ENDPOINTS.colors.base);
  return Array.isArray(data) ? data : [];
}

export function useTransmissionsQuery() {
  return useQuery({
    queryKey: lookupKeys.transmissions,
    queryFn: fetchTransmissions,
  });
}

export function useFuelTypesQuery() {
  return useQuery({
    queryKey: lookupKeys.fuelTypes,
    queryFn: fetchFuelTypes,
  });
}

export function useFacilitiesQuery() {
  return useQuery({
    queryKey: lookupKeys.facilities,
    queryFn: fetchFacilities,
  });
}

export function useColorsQuery() {
  return useQuery({
    queryKey: lookupKeys.colors,
    queryFn: fetchColors,
  });
}

// Transmissions mutations
async function createTransmission(payload: {
  name: string;
}): Promise<Transmission> {
  return fetcher<Transmission>(API_CONFIG.ENDPOINTS.transmissions.base, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateTransmission(
  id: string,
  payload: { name: string },
): Promise<Transmission> {
  return fetcher<Transmission>(API_CONFIG.ENDPOINTS.transmissions.byId(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

async function deleteTransmission(id: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.transmissions.byId(id), {
    method: "DELETE",
  });
}

export function useCreateTransmissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.transmissions });
      toast.success("Transmisi berhasil ditambahkan");
    },
    onError: (err) => toast.error(err.message || "Gagal menambah transmisi"),
  });
}

export function useUpdateTransmissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateTransmission(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.transmissions });
      toast.success("Transmisi berhasil diperbarui");
    },
    onError: (err) => toast.error(err.message || "Gagal memperbarui transmisi"),
  });
}

export function useDeleteTransmissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.transmissions });
      toast.success("Transmisi berhasil dihapus");
    },
    onError: (err) => toast.error(err.message || "Gagal menghapus transmisi"),
  });
}

// Fuel types mutations
async function createFuelType(payload: { name: string }): Promise<FuelType> {
  return fetcher<FuelType>(API_CONFIG.ENDPOINTS.fuelTypes.base, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateFuelType(
  id: string,
  payload: { name: string },
): Promise<FuelType> {
  return fetcher<FuelType>(API_CONFIG.ENDPOINTS.fuelTypes.byId(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

async function deleteFuelType(id: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.fuelTypes.byId(id), { method: "DELETE" });
}

export function useCreateFuelTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFuelType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.fuelTypes });
      toast.success("Bahan bakar berhasil ditambahkan");
    },
    onError: (err) => toast.error(err.message || "Gagal menambah bahan bakar"),
  });
}

export function useUpdateFuelTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateFuelType(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.fuelTypes });
      toast.success("Bahan bakar berhasil diperbarui");
    },
    onError: (err) =>
      toast.error(err.message || "Gagal memperbarui bahan bakar"),
  });
}

export function useDeleteFuelTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFuelType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.fuelTypes });
      toast.success("Bahan bakar berhasil dihapus");
    },
    onError: (err) => toast.error(err.message || "Gagal menghapus bahan bakar"),
  });
}

// Facilities mutations
async function createFacility(payload: { name: string }): Promise<Facility> {
  return fetcher<Facility>(API_CONFIG.ENDPOINTS.facilities.base, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateFacility(
  id: string,
  payload: { name: string },
): Promise<Facility> {
  return fetcher<Facility>(API_CONFIG.ENDPOINTS.facilities.byId(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

async function deleteFacility(id: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.facilities.byId(id), { method: "DELETE" });
}

export function useCreateFacilityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.facilities });
      toast.success("Fasilitas berhasil ditambahkan");
    },
    onError: (err) => toast.error(err.message || "Gagal menambah fasilitas"),
  });
}

export function useUpdateFacilityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateFacility(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.facilities });
      toast.success("Fasilitas berhasil diperbarui");
    },
    onError: (err) => toast.error(err.message || "Gagal memperbarui fasilitas"),
  });
}

export function useDeleteFacilityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.facilities });
      toast.success("Fasilitas berhasil dihapus");
    },
    onError: (err) => toast.error(err.message || "Gagal menghapus fasilitas"),
  });
}

// Colors mutations
async function createColor(payload: { name: string }): Promise<Color> {
  return fetcher<Color>(API_CONFIG.ENDPOINTS.colors.base, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function updateColor(
  id: string,
  payload: { name: string },
): Promise<Color> {
  return fetcher<Color>(API_CONFIG.ENDPOINTS.colors.byId(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

async function deleteColor(id: string): Promise<void> {
  await fetcher(API_CONFIG.ENDPOINTS.colors.byId(id), { method: "DELETE" });
}

export function useCreateColorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.colors });
      toast.success("Warna berhasil ditambahkan");
    },
    onError: (err) => toast.error(err.message || "Gagal menambah warna"),
  });
}

export function useUpdateColorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateColor(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.colors });
      toast.success("Warna berhasil diperbarui");
    },
    onError: (err) => toast.error(err.message || "Gagal memperbarui warna"),
  });
}

export function useDeleteColorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lookupKeys.colors });
      toast.success("Warna berhasil dihapus");
    },
    onError: (err) => toast.error(err.message || "Gagal menghapus warna"),
  });
}

//==================== Pages: Cars List ====================//
