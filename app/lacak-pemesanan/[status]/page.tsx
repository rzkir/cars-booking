import type { Metadata } from "next";
import { Suspense } from "react";

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
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center">Memuat...</div>}>
      <LacakPemesananDetail idOrStatus={status} />
    </Suspense>
  );
}
