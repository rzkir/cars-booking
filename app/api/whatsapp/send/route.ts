import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL;
}

export async function POST(req: Request) {
  const baseUrl = getBotBaseUrl();
  const body = await req.json().catch(() => null);

  if (!baseUrl) {
    return NextResponse.json(
      {
        error:
          "Bot base URL belum diset. Isi NEXT_PUBLIC_WS_URL mis. http://localhost:3001",
      },
      { status: 500 },
    );
  }

  if (!body?.to || !body?.text) {
    return NextResponse.json(
      { error: "Field to dan text wajib diisi" },
      { status: 400 },
    );
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/send`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
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
