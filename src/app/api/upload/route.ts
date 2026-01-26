export const runtime = "nodejs";

import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const blob = await put(file.name, file, { access: "public" });

    return Response.json({ url: blob.url }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: err?.message ?? "Upload failed" },
      { status: 500 }
    );
  }
}
