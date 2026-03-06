import { Fragment } from "react";

import CarsLayout from "@/components/cars/CarsLayout";

import { fetchCars } from "@/lib/useCars";

export default async function Page() {
  const { data: cars } = await fetchCars();
  return (
    <Fragment>
      <CarsLayout cars={cars} />
    </Fragment>
  );
}
