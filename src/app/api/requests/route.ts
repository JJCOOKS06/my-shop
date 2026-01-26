export const runtime = "nodejs";

import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const itemName = String(body?.itemName ?? "").trim();
    const details = String(body?.details ?? "").trim();
    const contact = String(body?.contact ?? "").trim();
    const imageUrl = body?.imageUrl ? String(body.imageUrl) : null;

    if (!name || !itemName || !contact) {
      return Response.json(
        { ok: false, error: "Missing required fields: name, itemName, contact" },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.REQUESTS_TO_EMAIL;

    // If env vars aren’t set yet, don’t crash — just log it
    if (!resendKey || !toEmail) {
      console.log("NEW REQUEST (email not configured):", {
        name,
        itemName,
        details,
        contact,
        imageUrl,
      });
      return Response.json({ ok: true, emailed: false });
    }

    const resend = new Resend(resendKey);

    const subject = `New Request: ${itemName} (from ${name})`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
        <h2>New Request</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Item:</b> ${escapeHtml(itemName)}</p>
        <p><b>Details:</b><br/>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
        <p><b>Contact:</b> ${escapeHtml(contact)}</p>
        ${
          imageUrl
            ? `<p><b>Image URL:</b> <a href="${imageUrl}">${imageUrl}</a></p>
               <img src="${imageUrl}" style="max-width:480px;border-radius:12px;border:1px solid #ddd" />`
            : "<p><b>Image:</b> (none)</p>"
        }
      </div>
    `;

    // Note: this default sender works for testing. Later we can verify your domain and change it.
    await resend.emails.send({
      from: "My Shop <onboarding@resend.dev>",
      to: toEmail,
      subject,
      html,
    });

    return Response.json({ ok: true, emailed: true });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err?.message ?? "Request failed" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
