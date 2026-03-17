import BookingsTransactiont from "@/components/bookings/BookingsTransactiont";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import { cookies } from "next/headers";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function fetchBookingForMetadata(id: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(API_CONFIG.ENDPOINTS.bookings.byId(id), {
    method: "GET",
    cache: "no-store",
    headers: getCarsApiHeaders({
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    }),
  });

  if (!res.ok) return null;
  return (await res.json().catch(() => null)) as {
    id: string;
    customer_profiles?: { full_name: string } | null;
    cars?: { name: string } | null;
  } | null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const booking = await fetchBookingForMetadata(id);

  const customerName = booking?.customer_profiles?.full_name ?? null;
  const carName = booking?.cars?.name ?? null;

  const titleParts = [
    "Pembayaran Booking",
    customerName ? `- ${customerName}` : null,
    carName ? `(${carName})` : null,
  ].filter(Boolean);

  return {
    title: titleParts.length
      ? titleParts.join(" ")
      : `Pembayaran Booking - ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <BookingsTransactiont bookingId={id} />;
}
