import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    if (!secretKey || !webhookSecret) {
      return NextResponse.json({ error: "Missing STRIPE env vars" }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);

    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      // For now just confirm it's working:
      console.log("✅ checkout.session.completed", session.id, session.customer_details?.email);
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Webhook error" }, { status: 400 });
  }
}

// Optional so visiting in browser doesn't confuse you
export async function GET() {
  return NextResponse.json({ ok: true, note: "Stripe webhooks use POST" });
}
