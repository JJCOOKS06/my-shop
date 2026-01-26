export const runtime = "nodejs";

import { put } from "@vercel/blob";

export async function GET() {
  // Safe debug endpoint (does NOT expose the token)
  return Response.json(
    {
      ok: true,
      route: "/api/upload",
      runtime: "nodejs",
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      note: "If hasBlobToken is false, Vercel isn't providing env vars to this deployment.",
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    if (!hasToken) {
      return Response.json(
        {
          error:
            "BLOB_READ_WRITE_TOKEN is missing at runtime. Check Vercel env vars (Production) and Redeploy.",
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
