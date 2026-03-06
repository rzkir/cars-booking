import { cache } from "react";

import { API_CONFIG } from "@/hooks/config";

import { apiFetch } from "@/hooks/apiFetch";

export const fetchCars = cache(async (): Promise<CarsListResponse> => {
  try {
    const data = await apiFetch<CarsListResponse>(
      API_CONFIG.ENDPOINTS.cars.base,
      {
        revalidate: 3600,
        tags: ["cars"],
      },
    );

    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching cars:", error);
    }
    return {
      data: [],
      pagination: {
        currentPage: 1,
        hasPrevPage: false,
        prevPage: null,
        hasNextPage: false,
        nextPage: null,
        totalPages: 0,
      },
    };
  }
});
