"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  CARS_PUBLIC_PAGE_SIZE,
  fetchCarsWithFilters,
} from "@/lib/useCars";

export function useInfiniteCarsQuery(params?: {
  search?: string;
  rental_type?: string;
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
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.nextPage
        : undefined,
    initialData:
      initialData &&
      !queryParams.search &&
      !queryParams.rental_type
        ? {
            pages: [initialData],
            pageParams: [1],
          }
        : undefined,
  });
}
