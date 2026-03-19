import type { ReactNode } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

import ProfileHeader from "@/components/ui/profile/ProfileHeader";

import { getSession } from "@/hooks/get-session";
import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import ProfileNavTabs from "@/components/ui/profile/ProfileNavTabs";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const user = await getSession();
  if (!user) {
    return {
      title: "Profile - DriveEase Indonesia",
      description: "Kelola profil dan pengaturan akun di DriveEase Indonesia",
    };
  }
  return {
    title: `${user.name} - DriveEase Indonesia`,
    description: `Kelola profil dan pengaturan akun ${user.name} di DriveEase Indonesia`,
  };
}

async function getCustomerProfileIsVerified(): Promise<boolean | null> {
  const apiUrl = API_CONFIG.ENDPOINTS.customerProfiles.me;
  if (!apiUrl?.trim()) return null;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
        ...getCarsApiHeaders(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json().catch(() => null)) as
      | { is_verified?: unknown }
      | null;

    return typeof data?.is_verified === "boolean" ? data.is_verified : null;
  } catch {
    return null;
  }
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const user = await getSession();

  if (!user) {
    redirect("/signin");
  }

  const isVerified = await getCustomerProfileIsVerified();

  return (
    <main className="flex-1 py-10 px-4 md:px-6 bg-[#fcfcfc] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 p-4 bg-gray-100 rounded-lg w-fit">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-500">
              Back to Home
            </span>
          </Link>
        </div>
        <ProfileHeader user={user} isVerified={isVerified} />
        <ProfileNavTabs />
        {children}
      </div>
    </main>
  );
}
