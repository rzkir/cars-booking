import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jid: string }> },
) {
  const { jid } = await params;
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

  const url = `${baseUrl.replace(/\/+$/, "")}/messages/${encodeURIComponent(jid)}`;

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal menghubungi WhatsApp bot";
    return NextResponse.json({ error: message, url }, { status: 502 });
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : { raw: await res.text() };

  return NextResponse.json(data, { status: res.status });
}
