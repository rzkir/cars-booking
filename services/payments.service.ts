"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import { getPaymentSuccessMessage } from "@/hooks/template-message";

async function sendPaymentSuccessWhatsApp(
  payment: PaymentWithBooking,
  bookingIdFallback?: string,
) {
  // Midtrans sync endpoint kadang tidak mengembalikan relasi booking/customer.
  // Jadi kita ambil dari response jika ada, kalau tidak ada kita fetch booking by id.
  const bookingFromPayment = (
    payment as PaymentWithBooking & {
      booking?: BookingWithRelations | null;
      customer_profiles?: BookingWithRelations["customer_profiles"] | null;
      bookings?: PaymentWithBooking["bookings"] | null;
    }
  ).booking;

  const paymentCustomerProfiles = (
    payment as PaymentWithBooking & {
      customer_profiles?: BookingWithRelations["customer_profiles"] | null;
    }
  ).customer_profiles;

  const bookingId =
    bookingFromPayment?.id ??
    payment.booking_id ??
    (
      payment as PaymentWithBooking & {
        bookings?: PaymentWithBooking["bookings"] | null;
      }
    ).bookings?.id ??
    bookingIdFallback;
  if (!bookingId) return;

  let booking: BookingWithRelations | null = bookingFromPayment ?? null;
  if (!booking) {
    try {
      booking = await fetcher<BookingWithRelations>(
        API_CONFIG.ENDPOINTS.bookings.byId(bookingId),
      );
    } catch {
      booking = null;
    }
  }

  const phone =
    booking?.customer_profiles?.phone ?? paymentCustomerProfiles?.phone ?? null;
  if (!phone) return;

  const trackingUrl =
    typeof window !== "undefined"
      ? new URL(
          `/lacak-pemesanan/${bookingId}`,
          window.location.origin,
        ).toString()
      : `/lacak-pemesanan/${bookingId}`;

  const text = getPaymentSuccessMessage({
    payment,
    booking,
    bookingId,
    trackingUrl,
  });

  try {
    await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone, text }),
    });
  } catch (error) {
    console.error("Gagal mengirim WhatsApp pembayaran:", error);
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

export const paymentsKeys = {
  all: ["payments"] as const,
  byBooking: (bookingId: string) =>
    [...paymentsKeys.all, "booking", bookingId] as const,
  detail: (id: string) => [...paymentsKeys.all, "detail", id] as const,
};

export interface CreateSnapResponse {
  token: string;
  redirect_url: string | null;
  payment_id: string;
  client_key: string;
}

async function createSnapToken(bookingId: string): Promise<CreateSnapResponse> {
  return fetcher<CreateSnapResponse>(
    API_CONFIG.ENDPOINTS.payments.createSnap(bookingId),
    { method: "POST" },
  );
}

async function fetchPaymentsByBooking(bookingId: string): Promise<Payment[]> {
  const data = await fetcher<{ data: Payment[] }>(
    API_CONFIG.ENDPOINTS.payments.byBooking(bookingId),
  );
  return Array.isArray(data?.data) ? data.data : [];
}

async function fetchPaymentById(id: string): Promise<PaymentWithBooking> {
  return fetcher<PaymentWithBooking>(API_CONFIG.ENDPOINTS.payments.byId(id));
}

export interface SyncPaymentResponse {
  status: "paid" | "unpaid" | "failed";
  midtrans_status: string | null;
  payment: PaymentWithBooking | Record<string, unknown>;
}

async function syncPaymentStatus(
  paymentId: string,
): Promise<SyncPaymentResponse> {
  return fetcher<SyncPaymentResponse>(
    API_CONFIG.ENDPOINTS.payments.sync(paymentId),
    { method: "POST" },
  );
}

async function fetchPayments(): Promise<Payment[]> {
  const data = await fetcher<{ data: Payment[] }>(
    `${API_CONFIG.ENDPOINTS.base}/api/payments`,
  );
  return Array.isArray(data?.data) ? data.data : [];
}

export function useSyncPaymentMutation(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => syncPaymentStatus(paymentId),
    onSuccess: (data) => {
      if (data?.status === "paid" && data?.payment) {
        void sendPaymentSuccessWhatsApp(
          data.payment as PaymentWithBooking,
          bookingId,
        );
      }
      queryClient.invalidateQueries({
        queryKey: paymentsKeys.byBooking(bookingId),
      });
    },
  });
}

export function usePaymentsQuery() {
  return useQuery({
    queryKey: paymentsKeys.all,
    queryFn: () => fetchPayments(),
  });
}

export function useCreateSnapMutation(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createSnapToken(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentsKeys.byBooking(bookingId),
      });
    },
    onError: (err) => {
      toast.error(err.message || "Gagal membuat token pembayaran");
    },
  });
}

export function usePaymentsByBookingQuery(
  bookingId: string | null,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: paymentsKeys.byBooking(bookingId ?? ""),
    queryFn: () => fetchPaymentsByBooking(bookingId!),
    enabled: !!bookingId && options?.enabled !== false,
  });
}

export function usePaymentQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: paymentsKeys.detail(id ?? ""),
    queryFn: () => fetchPaymentById(id!),
    enabled: !!id && options?.enabled !== false,
  });
}
