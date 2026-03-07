"use client";

import { usePathname } from "next/navigation";

import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfileHeader({ user }: { user: Accounts }) {
  const pathname = usePathname();
  const variant = pathname === "/profile/edit-profile" ? "edit" : "default";

  return <ProfileCard user={user} variant={variant} />;
}
