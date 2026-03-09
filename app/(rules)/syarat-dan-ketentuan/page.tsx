import type { Metadata } from "next";

import SDK from "@/components/rules/syarat-dan-ketentuan/SDK";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - DriveEase Indonesia",
  description:
    "Dokumen syarat dan ketentuan resmi penggunaan layanan DriveEase Indonesia. Harap baca dengan seksama sebelum menggunakan platform kami.",
};

export default function page() {
  return <SDK />;
}
