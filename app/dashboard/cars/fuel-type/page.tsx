export const metadata = {
  title: "Bahan Bakar | Dashboard",
  description: "Kelola tipe bahan bakar mobil.",
};

import CarsFuelType from "@/components/dashboard/cars/fuel-type/CarsFuelType";

export default function FuelTypePage() {
  return <CarsFuelType />;
}
