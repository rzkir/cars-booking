import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import type { Metadata } from "next";

import ProfileHeader from "@/components/ui/profile/ProfileHeader";

import { getSession } from "@/hooks/get-session";

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

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const user = await getSession();

  if (!user) {
    redirect("/signin");
  }

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
        <ProfileHeader user={user} />
        <ProfileNavTabs />
        {children}
      </div>
    </main>
  );
}
