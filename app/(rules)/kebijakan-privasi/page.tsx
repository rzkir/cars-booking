import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - DriveEase Indonesia",
  description:
    "Kebijakan privasi resmi DriveEase Indonesia terkait pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.",
};

import KP from "@/components/rules/kebijakan-privasi/KP";

export default function page() {
  return <KP />;
}
