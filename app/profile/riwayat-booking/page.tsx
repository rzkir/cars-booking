import type { Metadata } from "next";

import RiwayatBooking from "@/components/profile/riwayat-booking/RiwayatBooking";

export const metadata: Metadata = {
  title: "Riwayat Booking - DriveEase Indonesia",
  description:
    "Lihat ringkasan profil dan riwayat penyewaan mobil Anda di DriveEase Indonesia.",
};

export default function Page() {
  return <RiwayatBooking />;
}
