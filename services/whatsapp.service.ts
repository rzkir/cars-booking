import { API_CONFIG } from "@/hooks/config";
import { formatDate } from "@/hooks/format-idr";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { useEffect } from "react";

export type WhatsappScheduleLastResult = {
  sent?: number;
  error?: string;
} | null;

export type WhatsappReminderSettings = {
  hours_before_end?: number;
};

export type WhatsappMessageBookingLike = {
  customer_profiles?: { full_name?: string | null; phone?: string | null } | null;
  cars?: { name?: string | null } | null;
  start_date?: unknown;
  end_date?: unknown;
};

export const WHATSAPP_QUERY_KEYS = {
  reminderSettings: ["whatsappBot", "reminderSettings"] as const,
  upcomingHours: ["whatsappBot", "schedule", "upcomingHours"] as const,
  upcomingHoursTouched: [
    "whatsappBot",
    "schedule",
    "upcomingHoursTouched",
  ] as const,
  lastResult: ["whatsappBot", "schedule", "lastResult"] as const,
  sendDialogOpen: ["whatsappBot", "send", "dialogOpen"] as const,
  sendTo: ["whatsappBot", "send", "to"] as const,
  sendText: ["whatsappBot", "send", "text"] as const,
  sendSending: ["whatsappBot", "send", "sending"] as const,
  sendError: ["whatsappBot", "send", "error"] as const,
  sendSuccess: ["whatsappBot", "send", "success"] as const,
} as const;

function clampHours(value: number): number {
  return Math.min(Math.max(Math.round(value), 1), 168);
}

export function toWhatsappTo(raw?: string | null) {
  const v = (raw ?? "").trim();
  if (!v) return "";
  // If already a WA JID, keep it.
  if (v.includes("@")) return v;
  // Keep only digits, drop leading +, spaces, dashes.
  const digits = v.replace(/[^\d]/g, "");
  return digits || v;
}

function toIso(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "number") return new Date(v).toISOString();
  // support common { seconds } timestamp shapes
  const maybeSeconds = (v as { seconds?: unknown } | null)?.seconds;
  if (typeof maybeSeconds === "number")
    return new Date(maybeSeconds * 1000).toISOString();
  return null;
}

export function buildDefaultWhatsappReminderMessage(booking: WhatsappMessageBookingLike) {
  const name = booking.customer_profiles?.full_name ?? "Customer";
  const car = booking.cars?.name ?? "armada";
  const startIso = toIso(booking.start_date);
  const endIso = toIso(booking.end_date);
  const start = startIso ? formatDate(startIso) : "-";
  const end = endIso ? formatDate(endIso) : "-";
  return `Halo ${name},\n\nIni pengingat terkait booking ${car}.\nPeriode sewa: ${start} - ${end}.\n\nTerima kasih.`;
}

export function useWhatsappScheduleState() {
  const queryClient = useQueryClient();

  const { data: upcomingHours = 24 } = useQuery<number>({
    queryKey: WHATSAPP_QUERY_KEYS.upcomingHours,
    queryFn: () => 24,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: 24,
  });

  const { data: upcomingHoursTouched = false } = useQuery<boolean>({
    queryKey: WHATSAPP_QUERY_KEYS.upcomingHoursTouched,
    queryFn: () => false,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: false,
  });

  const { data: lastResult = null } = useQuery<WhatsappScheduleLastResult>({
    queryKey: WHATSAPP_QUERY_KEYS.lastResult,
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: null,
  });

  function setUpcomingHours(next: number) {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.upcomingHoursTouched, true);
    queryClient.setQueryData(
      WHATSAPP_QUERY_KEYS.upcomingHours,
      clampHours(next),
    );
  }

  function clearLastResult() {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.lastResult, null);
  }

  return {
    upcomingHours,
    setUpcomingHours,
    upcomingHoursTouched,
    lastResult,
    clearLastResult,
  };
}

export function useWhatsappSendMessageState() {
  const queryClient = useQueryClient();

  const { data: isSendDialogOpen = false } = useQuery<boolean>({
    queryKey: WHATSAPP_QUERY_KEYS.sendDialogOpen,
    queryFn: () => false,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: false,
  });

  const { data: sendTo = "" } = useQuery<string>({
    queryKey: WHATSAPP_QUERY_KEYS.sendTo,
    queryFn: () => "",
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: "",
  });

  const { data: sendText = "" } = useQuery<string>({
    queryKey: WHATSAPP_QUERY_KEYS.sendText,
    queryFn: () => "",
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: "",
  });

  const { data: sending = false } = useQuery<boolean>({
    queryKey: WHATSAPP_QUERY_KEYS.sendSending,
    queryFn: () => false,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: false,
  });

  const { data: sendError = null } = useQuery<string | null>({
    queryKey: WHATSAPP_QUERY_KEYS.sendError,
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: null,
  });

  const { data: sendSuccess = null } = useQuery<string | null>({
    queryKey: WHATSAPP_QUERY_KEYS.sendSuccess,
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: null,
  });

  function setIsSendDialogOpen(open: boolean) {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendDialogOpen, open);
    if (!open) {
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendError, null);
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendSuccess, null);
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendSending, false);
    }
  }

  function setSendTo(next: string) {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendTo, next);
  }

  function setSendText(next: string) {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendText, next);
  }

  function clearSendStatus() {
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendError, null);
    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendSuccess, null);
  }

  async function sendMessage() {
    const to = (sendTo ?? "").trim();
    const text = (sendText ?? "").trim();
    clearSendStatus();
    if (!to || !text) return;
    if (sending) return;

    queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendSending, true);
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, text }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        queryClient.setQueryData(
          WHATSAPP_QUERY_KEYS.sendError,
          data?.error || "Gagal mengirim pesan",
        );
        return;
      }

      queryClient.setQueryData(
        WHATSAPP_QUERY_KEYS.sendSuccess,
        "Pesan berhasil dikirim.",
      );
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendText, "");
    } catch (e: unknown) {
      queryClient.setQueryData(
        WHATSAPP_QUERY_KEYS.sendError,
        e instanceof Error ? e.message : "Gagal mengirim pesan",
      );
    } finally {
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.sendSending, false);
    }
  }

  return {
    isSendDialogOpen,
    setIsSendDialogOpen,
    sendTo,
    setSendTo,
    sendText,
    setSendText,
    sending,
    sendError,
    sendSuccess,
    clearSendStatus,
    sendMessage,
  };
}

export function useWhatsappReminderSettingsQuery() {
  return useQuery<WhatsappReminderSettings>({
    queryKey: WHATSAPP_QUERY_KEYS.reminderSettings,
    queryFn: async () => {
      const res = await fetch(
        API_CONFIG.ENDPOINTS.whatsappReminderSettings.me,
        {
          method: "GET",
          cache: "no-store",
          headers: API_CONFIG.SECRET
            ? { "X-API-Secret": API_CONFIG.SECRET }
            : undefined,
          credentials: "include",
        },
      );
      const data = (await res.json()) as WhatsappReminderSettings;
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
}

export function useWhatsappReminderSettingsSyncToUpcomingHours() {
  const queryClient = useQueryClient();
  const reminderSettingsQuery = useWhatsappReminderSettingsQuery();
  const { upcomingHoursTouched } = useWhatsappScheduleState();

  useEffect(() => {
    if (upcomingHoursTouched) return;
    if (typeof reminderSettingsQuery.data?.hours_before_end !== "number")
      return;
    queryClient.setQueryData(
      WHATSAPP_QUERY_KEYS.upcomingHours,
      clampHours(reminderSettingsQuery.data.hours_before_end),
    );
  }, [
    queryClient,
    reminderSettingsQuery.data?.hours_before_end,
    upcomingHoursTouched,
  ]);

  return reminderSettingsQuery;
}

export function useWhatsappSaveReminderSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hoursBeforeEnd: number) => {
      const res = await fetch(
        API_CONFIG.ENDPOINTS.whatsappReminderSettings.me,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(API_CONFIG.SECRET ? { "X-API-Secret": API_CONFIG.SECRET } : {}),
          },
          credentials: "include",
          body: JSON.stringify({ hours_before_end: hoursBeforeEnd }),
        },
      );
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "Gagal menyimpan pengaturan");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WHATSAPP_QUERY_KEYS.reminderSettings as unknown as QueryKey,
      });
    },
  });
}

export function useWhatsappRunScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hours: number) => {
      const res = await fetch(API_CONFIG.ENDPOINTS.whatsappBot.schedule, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upcomingHours: hours }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        sent?: number;
        error?: string;
      };

      if (!res.ok) {
        return {
          sent: data?.sent ?? 0,
          error: data?.error || "Gagal menjalankan bot schedule",
        } satisfies Exclude<WhatsappScheduleLastResult, null>;
      }

      return { sent: data?.sent ?? 0, error: data?.error } satisfies Exclude<
        WhatsappScheduleLastResult,
        null
      >;
    },
    onMutate: () => {
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.lastResult, null);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.lastResult, result);
    },
    onError: (e) => {
      const message =
        e instanceof Error ? e.message : "Gagal menjalankan bot schedule";
      queryClient.setQueryData(WHATSAPP_QUERY_KEYS.lastResult, {
        sent: 0,
        error: message,
      });
    },
  });
}
