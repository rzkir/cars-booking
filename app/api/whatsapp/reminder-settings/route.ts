import { NextResponse } from "next/server";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";

    const res = await fetch(API_CONFIG.ENDPOINTS.whatsappReminderSettings.me, {
      method: "GET",
      credentials: "include",
      headers: {
        ...getCarsApiHeaders({
          "Content-Type": "application/json",
        }),
        ...(cookie ? { cookie } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Gagal mengambil pengaturan reminder";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const cookie = req.headers.get("cookie") ?? "";

    const res = await fetch(API_CONFIG.ENDPOINTS.whatsappReminderSettings.me, {
      method: "PUT",
      credentials: "include",
      headers: {
        ...getCarsApiHeaders({
          "Content-Type": "application/json",
        }),
        ...(cookie ? { cookie } : {}),
      },
      body: JSON.stringify(body ?? {}),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Gagal menyimpan pengaturan reminder";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

