export const runtime = "nodejs";

import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    // Debug: confirm token is visible at runtime
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    if (!hasToken) {
      return Response.json(
        {
          error:
            "BLOB_READ_WRITE_TOKEN is missing at runtime (Vercel function can't see it). Redeploy after setting env var, and ensure this route runs on Node.",
        },
        { status: 500 }
      );
    }

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

