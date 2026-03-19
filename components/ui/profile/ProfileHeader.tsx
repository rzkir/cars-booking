"use client";

import { usePathname } from "next/navigation";

import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfileHeader({
  user,
  isVerified,
}: {
  user: Accounts;
  isVerified?: boolean | null;
}) {
  const pathname = usePathname();
  const variant = pathname === "/profile/edit-profile" ? "edit" : "default";

  return <ProfileCard user={user} variant={variant} isVerified={isVerified} />;
}
