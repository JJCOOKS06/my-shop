export async function POST(req: Request) {
  const data = await req.json();
  console.log("NEW REQUEST:", data);
  return Response.json({ ok: true });
}
