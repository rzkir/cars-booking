import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL;
}

function normalizeQrDataUrl(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!s) return null;
  if (s.startsWith("data:image/")) return s;
  // Common pattern: raw base64 without prefix
  if (/^[A-Za-z0-9+/=]+$/.test(s) && s.length > 100) {
    return `data:image/png;base64,${s}`;
  }
  // Some bots return a direct image URL; Next/Image can render it unoptimized.
  if (/^https?:\/\//i.test(s)) return s;
  return null;
}

export async function GET() {
  const baseUrl = getBotBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      {
        error:
          "Bot base URL belum diset. Isi NEXT_PUBLIC_WS_URL mis. http://localhost:3001",
        qrDataUrl: null,
      },
      { status: 500 },
    );
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/qr`;

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal menghubungi WhatsApp bot";
    return NextResponse.json(
      { error: message, qrDataUrl: null, url },
      { status: 502 },
    );
  }

  const contentType = res.headers.get("content-type") || "";
  const data: unknown = contentType.includes("application/json")
    ? await res.json()
    : { raw: await res.text() };

  // Normalize bot responses into what the FE expects.
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const qrCandidate =
      obj.qrDataUrl ??
      obj.qr_data_url ??
      obj.qrDataURL ??
      obj.qr ??
      obj.dataUrl ??
      obj.data_url ??
      obj.image ??
      obj.imageDataUrl;

    const qrDataUrl = normalizeQrDataUrl(qrCandidate);

    const error =
      typeof obj.error === "string"
        ? obj.error
        : !res.ok
          ? `Gagal ambil QR (status ${res.status})`
          : undefined;

    return NextResponse.json(
      {
        whatsappConnected:
          typeof obj.whatsappConnected === "boolean"
            ? obj.whatsappConnected
            : undefined,
        qrDataUrl,
        error,
      },
      { status: res.status },
    );
  }

  return NextResponse.json(
    {
      error: !res.ok ? `Gagal ambil QR (status ${res.status})` : undefined,
      qrDataUrl: null,
      raw: data,
    },
    { status: res.status },
  );
}
