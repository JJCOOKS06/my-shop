import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  return NextResponse.json({ ok: true, received: body.slice(0, 50) });
}

export async function GET() {
  return NextResponse.json({ ok: true, note: "Webhook endpoint. Use POST." });
}
