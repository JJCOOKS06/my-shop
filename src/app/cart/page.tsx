"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const update = () => setCart(getCart());
    update();

    window.addEventListener("cart:updated", update);
    window.addEventListener("cart:changed", update);
    return () => {
      window.removeEventListener("cart:updated", update);
      window.removeEventListener("cart:changed", update);
    };
  }, []);

  const totalGBP = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function setQty(item: CartItem, nextQty: number) {
    setCartItemQuantity(
      { id: item.id, title: item.title, price: item.price, image: item.image },
      nextQty
    );
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

          <div className="mt-6 flex items-center justify-between">
            <div className="font-medium">
              {T.cart.total[lang]}: {formatPriceGBP(totalGBP, currency)}
            </div>

            <button onClick={() => clearCart()} className="rounded-lg border px-4 py-2">
              {T.cart.clear[lang]}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
