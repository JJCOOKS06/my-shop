
export async function GET() {
  const res = await fetch(
    "https://api.frankfurter.dev/v1/latest?base=GBP&symbols=EUR",
    { next: { revalidate: 60 * 60 * 12 } } // 12 hours
  );

  if (!res.ok) return Response.json({ ok: false }, { status: 500 });

  const data = await res.json();
  return Response.json({
    ok: true,
    date: data.date,
    base: data.base,
    rates: data.rates,
  });
}
