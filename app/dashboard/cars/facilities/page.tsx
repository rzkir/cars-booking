export const metadata = {
  title: "Fasilitas | Dashboard",
  description: "Kelola fasilitas mobil.",
};

import CarsFacilities from "@/components/dashboard/cars/facilities/CarsFacilities";

export default function FacilitiesPage() {
  return <CarsFacilities />;
}
