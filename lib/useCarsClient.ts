"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  CARS_PUBLIC_PAGE_SIZE,
  fetchCarsWithFilters,
} from "@/lib/useCars";

export function useInfiniteCarsQuery(params?: {
  search?: string;
  rental_type?: string;
  transmission?: string;
  fuel_type?: string;
  max_price?: number;
  initialData?: CarsListResponse;
}) {
  const { initialData, ...queryParams } = params ?? {};
  return useInfiniteQuery({
    queryKey: ["cars", "infinite", queryParams] as const,
    queryFn: ({ pageParam }) =>
      fetchCarsWithFilters({
        page: pageParam,
        pageSize: CARS_PUBLIC_PAGE_SIZE,
        ...(queryParams.search && { search: queryParams.search }),
        ...(queryParams.rental_type && {
          rental_type: queryParams.rental_type,
        }),
        ...(queryParams.transmission && {
          transmission: queryParams.transmission,
        }),
        ...(queryParams.fuel_type && { fuel_type: queryParams.fuel_type }),
        ...(queryParams.max_price != null &&
          queryParams.max_price > 0 && {
            max_price: queryParams.max_price,
          }),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextPage
        : undefined,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
  });
}
