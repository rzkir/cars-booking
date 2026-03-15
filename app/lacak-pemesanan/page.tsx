import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacak Booking - DriveEase Indonesia",
  description:
    "Pantau status penyewaan armada Anda dengan memasukkan ID Booking atau Nomor Invoice.",
};

import LacakPemesanan from "@/components/lacak-pemesanan/LacakPemesanan";

export default function Page() {
  return <LacakPemesanan />;
}
