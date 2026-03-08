import { Fragment } from "react";

import CarsLayout from "@/components/cars/CarsLayout";

import {
  fetchCars,
  fetchCarsSearch,
  fetchTransmissions,
  fetchFuelTypes,
} from "@/lib/useCars";

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
  const transmission =
    typeof params.transmission === "string" ? params.transmission.trim() : "";
  const fuelType =
    typeof params.fuel_type === "string" ? params.fuel_type.trim() : "";
  const maxPriceParam = params.max_price;
  const maxPrice =
    typeof maxPriceParam === "string" && maxPriceParam
      ? Math.max(0, parseInt(maxPriceParam, 10) || 0)
      : undefined;

  const transmissions = await fetchTransmissions();
  const fuelTypes = await fetchFuelTypes();

  const hasFilter =
    !!q ||
    !!rentalType ||
    !!transmission ||
    !!fuelType ||
    (maxPrice != null && maxPrice > 0);

  const initialCarsData = hasFilter
    ? await fetchCarsSearch({
        page: 1,
        pageSize: 12,
        search: q || undefined,
        rental_type: rentalType,
        transmission: transmission || undefined,
        fuel_type: fuelType || undefined,
        max_price: maxPrice,
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
        initialTransmission={transmission || undefined}
        initialFuelType={fuelType || undefined}
        initialMaxPrice={maxPrice}
        initialTransmissions={transmissions}
        initialFuelTypes={fuelTypes}
      />
    </Fragment>
  );
}
