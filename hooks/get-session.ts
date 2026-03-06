import { cookies } from "next/headers";

import { API_CONFIG } from "@/hooks/config";

/** Normalisasi role: hanya "admin" (case-insensitive) = admin, selain itu customer */
function normalizeRole(role: unknown): "admin" | "customer" {
  return String(role ?? "").toLowerCase() === "admin" ? "admin" : "customer";
}

function accountToUser(
  account: Record<string, unknown> | null,
): Accounts | null {
  if (!account || !account.id) return null;
  const role = normalizeRole(account.role);
  return {
    id: String(account.id),
    name: String(account.name ?? ""),
    email: String(account.email ?? ""),
    phone: String(account.phone ?? ""),
    role: role as UserRole,
    created_at: String(account.created_at ?? ""),
    updated_at: String(account.updated_at ?? ""),
  };
}

/**
 * Ambil session user di server (SSR). Dipanggil dari layout agar client tidak perlu GET /api/auth/session.
 */
export async function getSession(): Promise<Accounts | null> {
  const apiUrl = API_CONFIG.ENDPOINTS.session;
  if (!apiUrl?.trim()) return null;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) return null;

    const data = (await res.json()) as {
      error?: unknown;
      account?: Record<string, unknown> | null;
      user?: Record<string, unknown> | null;
    };

    if (data.error) return null;

    return accountToUser(data.account ?? data.user ?? null);
  } catch {
    return null;
  }
}
