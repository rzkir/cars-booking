import type { Metadata } from "next";

import LacakPemesananDetail from "@/components/lacak-pemesanan/LacakPemesananDetail";

export const metadata: Metadata = {
  title: "Invoice & Status Booking - Space Digitalia",
  description:
    "Lihat detail invoice dan status terbaru pemesanan sewa mobil Anda.",
};

type PageProps = {
  params: Promise<{ status: string }>;
};

export default async function Page({ params }: PageProps) {
  const { status } = await params;
  return <LacakPemesananDetail idOrStatus={status} />;
}
