"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLastOrder, type OrderSnapshot } from "../lib/order";
import { useAppSettings } from "../components/AppSettingsProvider";
import { formatPriceGBP } from "../lib/currency";

export default function SuccessPage() {
  const { currency } = useAppSettings();
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    const update = () => setOrder(getLastOrder());
    update();
    window.addEventListener("order:updated", update);
    return () => window.removeEventListener("order:updated", update);
  }, []);

  const totalGBP =
    order?.items.reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Order confirmed ✅</h1>
      <p className="mt-2 text-gray-600">
        Thanks! If you need help, email{" "}
        <a className="underline" href="mailto:info@regarm.uk">
          info@regarm.uk
        </a>
        .
      </p>

      {!order || order.items.length === 0 ? (
        <div className="mt-6 rounded-xl border p-4">
          <p className="text-gray-700">No order details found.</p>
          <p className="mt-2 text-sm text-gray-600">
            This page will show a summary after checkout (we’ll wire it in on the Stripe step).
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border p-4">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 w-14 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatPriceGBP(item.price, currency)} × {item.quantity}
                  </div>
                </div>
                <div className="font-medium">
                  {formatPriceGBP(item.price * item.quantity, currency)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="font-medium">Total</div>
            <div className="font-bold">{formatPriceGBP(totalGBP, currency)}</div>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg border px-4 py-2" href="/products">
          Continue shopping
        </Link>
        <Link className="rounded-lg bg-black px-4 py-2 text-white" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}
