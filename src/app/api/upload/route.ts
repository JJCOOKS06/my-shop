export const runtime = "nodejs";

import { put } from "@vercel/blob";

export async function GET() {
  return Response.json(
    {
      ok: true,
      route: "/api/upload",
      runtime: "nodejs",
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return Response.json(
        { error: "BLOB_READ_WRITE_TOKEN missing in this deployment" },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      token, // <- force token explicitly
    });

    return Response.json({ url: blob.url }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: err?.message ?? "Upload failed" },
      { status: 500 }
    );
  }
}
