import type { Metadata } from "next";

import CarsDetails from "@/components/cars/details/CarsDetails";

import { fetchCarsDetails } from "@/lib/useCars";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const car = await fetchCarsDetails(resolvedParams.slug);

  const name = car.name;
  const description = car.description ?? undefined;

  return {
    title: name ? `Detail Mobil ${name}` : "Detail Mobil",
    description: description
      ? `Detail informasi mobil ${name ?? ""}`.trim()
      : "Detail informasi mobil",
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const car = await fetchCarsDetails(resolvedParams.slug);

  return <CarsDetails car={car} />;
}
