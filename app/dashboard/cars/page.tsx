export const metadata = {
  title: "Daftar Mobil | Dashboard",
  description: "Kelola dan lihat daftar mobil pada dashboard pemesanan mobil.",
};

import CarsLayout from "@/components/dashboard/cars/CarsLayout";

export default function page() {
  return <CarsLayout />;
}
