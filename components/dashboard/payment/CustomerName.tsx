"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useBookingQuery } from "@/services/bookings.service";

type CustomerNameProps = {
  bookingId: string;
};

export function CustomerName({ bookingId }: CustomerNameProps) {
  const { data, isLoading, isError } = useBookingQuery(bookingId);

  const name = data?.customer_profiles?.full_name ?? null;

  if (isLoading) return <Skeleton className="h-4 w-24" />;
  if (isError) return <span className="text-muted-foreground">-</span>;
  if (!name) return <span className="text-muted-foreground">-</span>;

  return <span className="font-medium">{name}</span>;
}

