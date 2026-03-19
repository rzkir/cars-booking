"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import { getPaymentSuccessMessage } from "@/hooks/template-message";

import { useBookingQuery } from "@/services/bookings.service";

import {
  useLocationsQuery,
  useProfileQuery,
} from "@/services/accounts.service";

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
  me: ["payments", "me"] as const,
  byBooking: (bookingId: string) =>
    [...paymentsKeys.all, "booking", bookingId] as const,
  detail: (id: string) => [...paymentsKeys.all, "detail", id] as const,
};

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

async function fetchMyPayments(): Promise<PaymentWithBooking[]> {
  const data = await fetcher<{ data: PaymentWithBooking[] }>(
    API_CONFIG.ENDPOINTS.payments.me,
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

export function useMyPaymentsQuery() {
  return useQuery({
    queryKey: paymentsKeys.me,
    queryFn: () => fetchMyPayments(),
  });
}

export const PAYMENT_STATUS_META: Record<
  Exclude<PaymentStatusFilter, "all">,
  { label: string; pill: string }
> = {
  paid: {
    label: "Dibayar",
    pill: "bg-emerald-50 text-emerald-700",
  },
  unpaid: {
    label: "Menunggu",
    pill: "bg-orange-50 text-orange-700",
  },
  failed: {
    label: "Gagal",
    pill: "bg-red-50 text-red-700",
  },
};

function getPaymentDate(payment: Payment): number {
  return new Date(payment.paid_at ?? payment.created_at).getTime();
}

export function useRiwayatTransactionState() {
  const listQuery = useMyPaymentsQuery();
  const allPayments = useMemo(() => listQuery.data ?? [], [listQuery.data]);

  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("Terbaru");

  const filteredSortedPayments = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = allPayments.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      if (!matchesStatus) return false;

      if (!term) return true;
      const combined = `${p.id} ${p.booking_id}`.toLowerCase();
      return combined.includes(term);
    });

    return filtered.sort((a, b) => {
      const da = getPaymentDate(a);
      const db = getPaymentDate(b);
      return sort === "Terbaru" ? db - da : da - db;
    });
  }, [allPayments, search, sort, statusFilter]);

  const isLoading = listQuery.isLoading && allPayments.length === 0;

  const totalAmount = useMemo(() => {
    return filteredSortedPayments.reduce((sum, p) => {
      const totalPrice =
        (p as PaymentWithBooking).bookings?.total_price ?? p.amount ?? 0;
      return sum + (typeof totalPrice === "number" ? totalPrice : 0);
    }, 0);
  }, [filteredSortedPayments]);

  const totalCount = filteredSortedPayments.length;

  const statusLabel =
    statusFilter === "all"
      ? "Semua status"
      : PAYMENT_STATUS_META[statusFilter].label;

  return {
    listQuery,
    filteredSortedPayments,
    isLoading,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sort,
    setSort,
    totalAmount,
    totalCount,
    statusLabel,
  };
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

const SNAP_SANDBOX_URL = "https://app.sandbox.midtrans.com/snap/snap.js";

export function useBookingsTransactionState(bookingId: string) {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [selectedGeo, setSelectedGeo] = useState<GeoLocationSelection | null>(
    null,
  );

  const snapMutation = useCreateSnapMutation(bookingId);
  const syncMutation = useSyncPaymentMutation(bookingId);
  const bookingQuery = useBookingQuery(bookingId);
  const profileQuery = useProfileQuery();
  const locationsQuery = useLocationsQuery();

  const hasHandledPaid = useRef(false);
  const hasInitLocation = useRef(false);

  useEffect(() => {
    if (
      !snapMutation.data &&
      !snapMutation.isPending &&
      !snapMutation.isSuccess
    ) {
      snapMutation.mutate();
    }
  }, [snapMutation]);

  // Jika status payment sudah "paid", arahkan ke halaman lacak-pemesanan.
  useEffect(() => {
    const paymentStatus = syncMutation.data?.status;
    if (paymentStatus !== "paid" || hasHandledPaid.current) return;
    hasHandledPaid.current = true;

    const statusPath = `/lacak-pemesanan/${bookingId}?payment=success`;
    router.push(statusPath);
  }, [syncMutation.data?.status, bookingId, router]);

  // Ambil lokasi default dari customer_locations untuk dijadikan pilihan awal peta.
  useEffect(() => {
    if (hasInitLocation.current) return;
    if (locationsQuery.isLoading) return;

    const locs = locationsQuery.data ?? [];
    const defaultLoc = locs.find((l) => l.is_default) ?? locs[0];
    if (!defaultLoc) {
      hasInitLocation.current = true;
      return;
    }

    queueMicrotask(() => {
      setSelectedGeo({
        address: defaultLoc.address,
        latitude: defaultLoc.latitude,
        longitude: defaultLoc.longitude,
      });
    });

    hasInitLocation.current = true;
  }, [locationsQuery.data, locationsQuery.isLoading]);

  const handleOpenSnap = () => {
    const snapData = snapMutation.data;
    if (!snapData?.token || !snapData?.client_key) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-midtrans-snap="true"]',
    );

    const openSnap = () => {
      (
        window as Window &
          typeof globalThis & {
            snap: {
              pay: (
                token: string,
                options?: {
                  onSuccess?: (result: unknown) => void;
                  onPending?: (result: unknown) => void;
                  onError?: (result: unknown) => void;
                  onClose?: () => void;
                },
              ) => void;
            };
          }
      ).snap?.pay(snapData.token, {
        onSuccess: () => {
          if (snapData.payment_id) {
            syncMutation.mutate(snapData.payment_id);
          }
        },
      });
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = SNAP_SANDBOX_URL;
      script.setAttribute("data-client-key", snapData.client_key);
      script.setAttribute("data-midtrans-snap", "true");
      script.onload = openSnap;
      document.body.appendChild(script);
    } else {
      if (!existingScript.getAttribute("data-client-key")) {
        existingScript.setAttribute("data-client-key", snapData.client_key);
      }
      openSnap();
    }
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return {
    copied,
    selectedGeo,
    setSelectedGeo,
    handleCopyId,
    handleOpenSnap,
    snapMutation,
    syncMutation,
    bookingQuery,
    profileQuery,
    locationsQuery,
  };
}
