"use client";

import * as React from "react";

import {
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  SquareTerminal,
  Car,
  MessageSquare,
  Calendar,
  CreditCard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavProjects } from "@/components/nav-projects";

import { NavSecondary } from "@/components/nav-secondary";

import { NavUser } from "@/components/nav-user";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Cars",
      url: "/dashboard/cars",
      icon: Car,
      items: [
        {
          title: "List Cars",
          url: "/dashboard/cars",
        },
        {
          title: "Cars Colors",
          url: "/dashboard/cars/colors",
        },
        {
          title: "Cars Transmisi",
          url: "/dashboard/cars/transmisi",
        },
        {
          title: "Cars Fuel Type",
          url: "/dashboard/cars/fuel-type",
        },
        {
          title: "Cars Facilities",
          url: "/dashboard/cars/facilities",
        },
      ],
    },
    {
      title: "WhatsApp",
      url: "/dashboard/whatsapp",
      icon: MessageSquare,
      items: [
        {
          title: "Get Started",
          url: "/dashboard/whatsapp",
        },
        {
          title: "Devices",
          url: "/dashboard/whatsapp/devices",
        },
        {
          title: "Inbox",
          url: "/dashboard/whatsapp/inbox",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: Calendar,
      items: [
        {
          title: "All Bookings",
          url: "/dashboard/bookings",
        },
        {
          title: "My Bookings",
          url: "/dashboard/bookings/my-bookings",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: CreditCard,
      items: [
        {
          title: "All Payments",
          url: "/dashboard/payments",
        },
        {
          title: "My Bookings",
          url: "/dashboard/bookings/my-bookings",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">DriveEase</span>
                  <span className="truncate text-xs">DriveEase</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
