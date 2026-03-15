import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL;
}

export async function POST(req: Request) {
  const baseUrl = getBotBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      {
        error:
          "Bot base URL belum diset. Isi NEXT_PUBLIC_WS_URL mis. http://localhost:3001",
      },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const upcomingHours =
    typeof body?.upcomingHours === "number" && !Number.isNaN(body.upcomingHours)
      ? body.upcomingHours
      : undefined;

  const url = new URL(`${baseUrl.replace(/\/+$/, "")}/schedule`);
  if (upcomingHours != null) {
    url.searchParams.set("upcoming_hours", String(upcomingHours));
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "POST",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal menghubungi WhatsApp bot";
    return NextResponse.json(
      { error: message, url: url.toString() },
      { status: 502 },
    );
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : { raw: await res.text() };

  return NextResponse.json(data, { status: res.status });
}

