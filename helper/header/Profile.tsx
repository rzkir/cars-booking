"use client";

import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

export default function Profile() {
  const { user, userRole, signOut } = useAuth();

  if (!user) return null;

  const isAdmin = userRole === "admin";
  const profileHref = isAdmin ? "/dashboard" : "/profile";
  const profileLabel = isAdmin ? "Dashboard" : "Profil Saya";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="header-profile-trigger"
          variant="ghost"
          className="flex items-center gap-2 rounded-full px-2 py-6 bg-[#ff9500] text-white hover:bg-[#ff9500]/90 hover:text-white"
        >
          <Avatar className="h-8 w-8 rounded-full border border-white">
            <AvatarFallback className="rounded-full bg-[#ff9500] text-xs font-medium text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[120px] truncate font-medium sm:inline">
            {user.name}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={profileHref} className="flex items-center gap-2">
              {isAdmin ? (
                <LayoutDashboard className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
              {profileLabel}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onSelect={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
