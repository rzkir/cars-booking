"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function ProfileNavTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/profile", label: "Profil" },
    { href: "/profile/riwayat-booking", label: "Riwayat Booking" },
    { href: "/profile/edit-profile", label: "Edit Profil" },
    { href: "/profile/pengaturan", label: "Pengaturan" },
  ];

  return (
    <nav aria-label="Navigasi profil" className="border-b border-gray-100 mb-12">
      <div className="flex gap-10 overflow-x-auto pb-px scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors ${
                isActive
                  ? "text-[#FF9500] border-b-2 border-[#FF9500]"
                  : "text-gray-300 hover:text-gray-500"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
