import type { Metadata } from "next";

import CrudCars from "@/components/dashboard/cars/crud/CarsForm";

import { API_CONFIG, getCarsApiHeaders } from "@/lib/config";

async function getCarName(id: string): Promise<string | null> {
  try {
    const res = await fetch(API_CONFIG.ENDPOINTS.cars.byId(id), {
      credentials: "include",
      headers: getCarsApiHeaders(),
    });

    if (!res.ok) return null;

    const data = (await res.json().catch(() => null)) as {
      name?: string;
    } | null;
    return data?.name ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (id === "new") {
    return {
      title: "Tambah Mobil | Dashboard",
      description: "Tambah mobil baru ke daftar mobil pada dashboard.",
    };
  }

  const carName = await getCarName(id);

  return {
    title: carName ? `Edit ${carName} | Dashboard` : "Detail Mobil | Dashboard",
    description: carName
      ? `Kelola dan edit data mobil ${carName} pada dashboard pemesanan mobil.`
      : "Kelola dan lihat detail mobil pada dashboard pemesanan mobil.",
  };
}

export default function Page() {
  return <CrudCars />;
}
