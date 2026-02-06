import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // avoid caching

function parseCsv(csv: string) {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] ?? ""));
    return row;
  });
}

export async function GET() {
  try {
    const url = process.env.GOOGLE_SHEET_CSV_URL;

    if (!url) {
      return NextResponse.json(
        { error: "Missing GOOGLE_SHEET_CSV_URL (check .env.local and restart dev server)" },
        { status: 500 }
      );
    }

    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    if (text.includes("<html") || text.includes("<!doctype html")) {
      return NextResponse.json(
        { error: "Google returned HTML (not CSV). Re-publish sheet to web as CSV." },
        { status: 500 }
      );
    }

    const products = parseCsv(text);

    return NextResponse.json({
      products,
      debug: {
        usingUrlStartsWith: url.slice(0, 40) + "...",
        rows: products.length,
        firstRow: products[0] ?? null,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to load sheet" },
      { status: 500 }
    );
  }
}
