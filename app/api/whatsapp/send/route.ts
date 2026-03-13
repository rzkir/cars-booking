import { NextResponse } from "next/server";

function getBotBaseUrl() {
  return process.env.NEXT_PUBLIC_WS_URL;
}

export async function POST(req: Request) {
  const baseUrl = getBotBaseUrl();
  const body = await req.json().catch(() => null);

  if (!body?.to || !body?.text) {
    return NextResponse.json(
      { error: "Field to dan text wajib diisi" },
      { status: 400 },
    );
  }

  const res = await fetch(`${baseUrl}/send`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : { raw: await res.text() };

  return NextResponse.json(data, { status: res.status });
}
