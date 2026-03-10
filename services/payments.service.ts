"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

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

async function fetchPaymentsByBooking(
  bookingId: string,
): Promise<Payment[]> {
  const data = await fetcher<{ data: Payment[] }>(
    API_CONFIG.ENDPOINTS.payments.byBooking(bookingId),
  );
  return Array.isArray(data?.data) ? data.data : [];
}

async function fetchPaymentById(id: string): Promise<PaymentWithBooking> {
  return fetcher<PaymentWithBooking>(API_CONFIG.ENDPOINTS.payments.byId(id));
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
