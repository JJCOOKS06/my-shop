"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCart,
  clearCart,
  removeFromCart,
  setCartItemQuantity,
  type CartItem,
} from "../lib/cart";
import { useAppSettings } from "../components/AppSettingsProvider";
import { T } from "../lib/lang";
import { formatPriceGBP } from "../lib/currency";

export default function CartPage() {
  const { lang, currency } = useAppSettings();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadingPay, setLoadingPay] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setCart(getCart());
    update();

    // keep in sync with your existing cart events
    window.addEventListener("cart:updated", update);
    window.addEventListener("cart:changed", update);
    return () => {
      window.removeEventListener("cart:updated", update);
      window.removeEventListener("cart:changed", update);
    };
  }, []);

  const totalGBP = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  function setQty(item: CartItem, nextQty: number) {
    setCartItemQuantity(
      { id: item.id, title: item.title, price: item.price, image: item.image },
      nextQty
    );
  }

  async function payNow() {
    setStatus(null);
    setLoadingPay(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data?.error ?? "Checkout failed");
        setLoadingPay(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setStatus("Checkout failed: missing Stripe URL");
      setLoadingPay(false);
    } catch (e: any) {
      setStatus(e?.message ?? "Checkout error");
      setLoadingPay(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">{T.cart.title[lang]}</h1>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-600">{T.cart.empty[lang]}</p>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded object-cover"
                />

                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatPriceGBP(item.price, currency)} {T.cart.each[lang]}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      className="rounded-md border px-3 py-2"
                      onClick={() => setQty(item, item.quantity - 1)}
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={item.quantity}
                      onChange={(e) => setQty(item, Number(e.target.value))}
                      className="w-20 rounded-md border p-2 text-center"
                    />

                    <button
                      className="rounded-md border px-3 py-2"
                      onClick={() => setQty(item, item.quantity + 1)}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 rounded-md border px-3 py-2"
                    >
                      {T.cart.remove[lang]}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">{T.cart.itemTotal[lang]}</div>
                  <div className="font-medium">
                    {formatPriceGBP(item.price * item.quantity, currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{T.cart.total[lang]}</div>
              <div className="text-2xl font-bold">{formatPriceGBP(totalGBP, currency)}</div>
            </div>

            {status && <p className="mt-3 text-sm text-red-600">{status}</p>}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={payNow}
                disabled={loadingPay}
                className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
              >
                {loadingPay ? "Redirecting..." : "Pay with card"}
              </button>

              <button
                onClick={() => clearCart()}
                className="rounded-lg border px-4 py-2"
              >
                {T.cart.clear[lang]}
              </button>

              <Link className="rounded-lg border px-4 py-2" href="/products">
                Continue shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
