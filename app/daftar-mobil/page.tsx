import { Fragment } from "react";

import CarsLayout from "@/components/cars/CarsLayout";

import { fetchCars, fetchCarsSearch } from "@/lib/useCars";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const rentalType =
    params.rental_type === "self_drive" || params.rental_type === "with_driver"
      ? params.rental_type
      : undefined;

  const hasFilter = !!q || !!rentalType;
  const initialCarsData = hasFilter
    ? await fetchCarsSearch({
        page: 1,
        pageSize: 12,
        search: q || undefined,
        rental_type: rentalType,
      })
    : await fetchCars({
        page: 1,
        pageSize: 12,
      });

  return (
    <Fragment>
      <CarsLayout
        initialCarsData={initialCarsData}
        initialSearch={q || undefined}
        initialRentalType={rentalType}
      />
    </Fragment>
  );
}
