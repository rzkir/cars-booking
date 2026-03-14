"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

async function sendBookingConfirmedWhatsApp(booking: BookingWithRelations) {
  const phone = booking.customer_profiles?.phone;
  if (!phone) return;

  const carName = booking.cars?.name ?? "mobil";
  const customerName = booking.customer_profiles?.full_name;
  const greeting = customerName ? `Halo ${customerName},` : "Halo,";
  const paymentUrl =
    typeof window !== "undefined"
      ? new URL(`/booking/${booking.id}`, window.location.origin).toString()
      : `/booking/${booking.id}`;

  const text = `${greeting}
Booking kamu telah *DIKONFIRMASI* ✅

📄 Rincian Booking
- ID Booking   : ${booking.id}
- Status       : ${booking.status}
- Tipe Rental  : ${booking.rental_type?.replace("_", " ")}

🚗 Mobil
- Nama         : ${carName}
- Warna        : ${
    booking.colors?.name ??
    (booking.color_id ? booking.color_id : "Tidak ada informasi warna")
  }

📅 Periode
- Mulai        : ${booking.start_date}
- Selesai      : ${booking.end_date}${
    booking.total_days
      ? `
- Total Hari   : ${booking.total_days} hari`
      : ""
  }

💰 Pembayaran
- Total Harga  : Rp ${booking.total_price.toLocaleString("id-ID")}

Silakan selesaikan pembayaran di tautan berikut:
${paymentUrl}

📝 Catatan
${booking.notes?.trim() ? booking.notes : "-"} 

Terima kasih telah menggunakan layanan kami 🚗`;

  try {
    await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone, text }),
    });
  } catch (error) {
    console.error("Gagal mengirim WhatsApp konfirmasi booking:", error);
  }
}

async function fetcher<T>(
  url: string,
  options?: RequestInit & { method?: string; body?: string },
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: getCarsApiHeaders({
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string>),
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Terjadi kesalahan");
  return data;
}

export const bookingsKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingsKeys.all, "list"] as const,
  list: (params?: {
    role?: "customer" | "owner";
    status?: string;
    page?: number;
    pageSize?: number;
  }) => [...bookingsKeys.lists(), params] as const,
  details: () => [...bookingsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingsKeys.details(), id] as const,
};

export const BOOKING_STATUS_OPTIONS = [
  { value: "pending", label: "Menunggu" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "ongoing", label: "Berlangsung" },
  { value: "done", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
] as const;

interface BookingsListResponse {
  data: BookingWithRelations[];
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

async function fetchBookings(params?: {
  role?: "customer" | "owner";
  status?: string;
  page?: number;
  pageSize?: number;
}): Promise<BookingsListResponse> {
  const q = new URLSearchParams();
  if (params?.role) q.set("role", params.role);
  if (params?.status) q.set("status", params.status);
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.pageSize != null) q.set("page_size", String(params.pageSize));
  const url = q.toString()
    ? `${API_CONFIG.ENDPOINTS.bookings.base}?${q}`
    : API_CONFIG.ENDPOINTS.bookings.base;
  return fetcher<BookingsListResponse>(url);
}

async function fetchBookingById(id: string): Promise<BookingWithRelations> {
  return fetcher<BookingWithRelations>(API_CONFIG.ENDPOINTS.bookings.byId(id));
}

async function createBooking(
  input: CreateBookingInput,
): Promise<BookingWithRelations> {
  return fetcher<BookingWithRelations>(API_CONFIG.ENDPOINTS.bookings.base, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

async function updateBooking(
  id: string,
  input: UpdateBookingInput,
): Promise<BookingWithRelations> {
  return fetcher<BookingWithRelations>(API_CONFIG.ENDPOINTS.bookings.byId(id), {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function useBookingsQuery(params?: {
  role?: "customer" | "owner";
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: bookingsKeys.list(params),
    queryFn: () => fetchBookings(params),
  });
}

export function useBookingQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: bookingsKeys.detail(id ?? ""),
    queryFn: () => fetchBookingById(id!),
    enabled: !!id && options?.enabled !== false,
  });
}

export function useCreateBookingMutation(
  opts?: UseMutationOptions<BookingWithRelations, Error, CreateBookingInput>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.detail(data.id) });
      toast.success("Booking berhasil dibuat");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal membuat booking");
    },
    ...opts,
  });
}

export function useUpdateBookingMutation(
  opts?: UseMutationOptions<
    BookingWithRelations,
    Error,
    { id: string; input: UpdateBookingInput }
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => updateBooking(id, input),
    onSuccess: (data, variables) => {
      if (variables?.input?.status === "confirmed") {
        void sendBookingConfirmedWhatsApp(data);
      }
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.detail(data.id) });
      toast.success("Booking berhasil diperbarui");
    },
    onError: (err) => {
      toast.error(err.message || "Gagal memperbarui booking");
    },
    ...opts,
  });
}
