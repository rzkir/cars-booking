import { cache } from "react";

import { API_CONFIG } from "@/hooks/config";

import { apiFetch } from "@/hooks/apiFetch";

export const CARS_PUBLIC_PAGE_SIZE = 12;

function buildCarsUrl(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  rental_type?: string;
  transmission?: string;
  fuel_type?: string;
  max_price?: number;
}): string {
  const hasFilter =
    !!params?.search ||
    !!params?.rental_type ||
    !!params?.transmission ||
    !!params?.fuel_type ||
    (params?.max_price != null && params.max_price > 0);
  const base = hasFilter
    ? API_CONFIG.ENDPOINTS.cars.search
    : API_CONFIG.ENDPOINTS.cars.base;
  const urlParams = new URLSearchParams();
  if (params?.search) urlParams.set("q", params.search);
  if (params?.rental_type) urlParams.set("rental_type", params.rental_type);
  if (params?.transmission) urlParams.set("transmission", params.transmission);
  if (params?.fuel_type) urlParams.set("fuel_type", params.fuel_type);
  if (params?.max_price != null && params.max_price > 0)
    urlParams.set("max_price", String(params.max_price));
  if (params?.page != null) urlParams.set("page", String(params.page));
  if (params?.pageSize != null)
    urlParams.set("page_size", String(params.pageSize));
  const query = urlParams.toString();
  return query ? `${base}?${query}` : base;
}

export const fetchCars = cache(
  async (opts?: {
    page?: number;
    pageSize?: number;
  }): Promise<CarsListResponse> => {
    try {
      const page = opts?.page ?? 1;
      const pageSize = opts?.pageSize ?? CARS_PUBLIC_PAGE_SIZE;
      const url = buildCarsUrl({ page, pageSize });
      const data = await apiFetch<CarsListResponse>(url, {
        revalidate: 3600,
        tags: ["cars"],
      });

      return data;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching cars:", error);
      }
      return {
        data: [],
        pagination: {
          currentPage: opts?.page ?? 1,
          hasPrevPage: false,
          prevPage: null,
          hasNextPage: false,
          nextPage: null,
          totalPages: 0,
        },
      };
    }
  },
);

export const fetchCarsSearch = cache(
  async (opts?: {
    page?: number;
    pageSize?: number;
    search?: string;
    rental_type?: string;
    transmission?: string;
    fuel_type?: string;
    max_price?: number;
  }): Promise<CarsSearchResponse> => {
    try {
      const page = opts?.page ?? 1;
      const pageSize = opts?.pageSize ?? CARS_PUBLIC_PAGE_SIZE;
      const url = buildCarsUrl({
        page,
        pageSize,
        search: opts?.search,
        rental_type: opts?.rental_type,
        transmission: opts?.transmission,
        fuel_type: opts?.fuel_type,
        max_price: opts?.max_price,
      });
      const data = await apiFetch<CarsSearchResponse>(url, {
        revalidate: 3600,
        tags: ["cars"],
      });

      return data;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching cars search:", error);
      }
      return {
        data: [],
        pagination: {
          currentPage: opts?.page ?? 1,
          hasPrevPage: false,
          prevPage: null,
          hasNextPage: false,
          nextPage: null,
          totalPages: 0,
        },
      };
    }
  },
);

export async function fetchCarsWithFilters(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  rental_type?: string;
  transmission?: string;
  fuel_type?: string;
  max_price?: number;
}): Promise<CarsListResponse> {
  try {
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? CARS_PUBLIC_PAGE_SIZE;
    const url = buildCarsUrl({
      page,
      pageSize,
      search: params?.search,
      rental_type: params?.rental_type,
      transmission: params?.transmission,
      fuel_type: params?.fuel_type,
      max_price: params?.max_price,
    });
    const data = await apiFetch<CarsListResponse>(url, {
      revalidate: 3600,
      tags: ["cars"],
    });
    if (!data || !Array.isArray(data.data)) {
      return {
        data: [],
        pagination: {
          currentPage: page,
          hasPrevPage: false,
          prevPage: null,
          hasNextPage: false,
          nextPage: null,
          totalPages: 0,
        },
      };
    }
    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching cars:", error);
    }
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
}

export async function fetchTransmissions(): Promise<Transmission[]> {
  try {
    const url = API_CONFIG.ENDPOINTS.transmissions.base;
    const data = await apiFetch<Transmission[]>(url, {
      revalidate: 3600,
      tags: ["transmissions"],
    });
    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching transmissions:", error);
    }
    return [];
  }
}

export async function fetchFuelTypes(): Promise<FuelType[]> {
  try {
    const url = API_CONFIG.ENDPOINTS.fuelTypes.base;
    const data = await apiFetch<FuelType[]>(url, {
      revalidate: 3600,
      tags: ["fuelTypes"],
    });
    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching fuel types:", error);
    }
    return [];
  }
}

export const fetchCarsDetails = async (
  slug: string,
): Promise<CarDetails> => {
  try {
    const data = await apiFetch<CarDetails>(
      `${API_CONFIG.ENDPOINTS.cars.bySlug(slug)}`,
      {
        tags: ["cars"],
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching cars by slug:", error);
    // Check if it's a 404 error
    if (
      error instanceof Error &&
      (error as { status?: number }).status === 404
    ) {
      throw new Error(`Cars with slug "${slug}" not found`);
    }
    throw error;
  }
};
