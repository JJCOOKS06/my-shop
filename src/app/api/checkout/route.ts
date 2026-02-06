import Stripe from "stripe";
import { NextResponse } from "next/server";

type CartItem = {
  id: string;
  title: string;
  price: number; // GBP
  image: string;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as { items?: CartItem[] };
    const items = body?.items ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const safeItems = items
      .map((i) => ({
        ...i,
        quantity: Math.max(0, Math.min(20, Math.floor(Number(i.quantity) || 0))),
        price: Math.max(0, Number(i.price) || 0),
      }))
      .filter((i) => i.quantity > 0 && i.price > 0);

    if (safeItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ✅ No apiVersion here = no type mismatch issues
    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      line_items: safeItems.map((i) => ({
        quantity: i.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: Math.max(1, Math.round(i.price * 100)),
          product_data: {
            name: i.title,
            images: i.image ? [i.image] : undefined,
          },
        },
      })),
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Checkout error" },
      { status: 500 }
    );
  }
}
