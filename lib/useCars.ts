import { cache } from "react";

import { API_CONFIG } from "@/hooks/config";

import { apiFetch } from "@/hooks/apiFetch";

export const CARS_PUBLIC_PAGE_SIZE = 12;

function buildCarsUrl(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  rental_type?: string;
}): string {
  const hasFilter = params?.search || params?.rental_type;
  const base = hasFilter
    ? API_CONFIG.ENDPOINTS.cars.search
    : API_CONFIG.ENDPOINTS.cars.base;
  const q = new URLSearchParams();
  if (params?.search) q.set("q", params.search);
  if (params?.rental_type) q.set("rental_type", params.rental_type);
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.pageSize != null) q.set("page_size", String(params.pageSize));
  const query = q.toString();
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
  }): Promise<CarsSearchResponse> => {
    try {
      const page = opts?.page ?? 1;
      const pageSize = opts?.pageSize ?? CARS_PUBLIC_PAGE_SIZE;
      const url = buildCarsUrl({
        page,
        pageSize,
        search: opts?.search,
        rental_type: opts?.rental_type,
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
}): Promise<CarsListResponse> {
  try {
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? CARS_PUBLIC_PAGE_SIZE;
    const url = buildCarsUrl({
      page,
      pageSize,
      search: params?.search,
      rental_type: params?.rental_type,
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
