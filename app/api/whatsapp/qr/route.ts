import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return (
    process.env.BOT_BASE_URL ||
    process.env.NEXT_PUBLIC_WS_URL ||
    "http://localhost:3001"
  );
}

export async function GET() {
  const baseUrl = getBotBaseUrl();
  const res = await fetch(`${baseUrl}/qr`, { cache: "no-store" });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : { raw: await res.text() };

  return NextResponse.json(data, { status: res.status });
}

