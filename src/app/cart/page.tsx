"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart, type CartItem } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const update = () => setCart(getCart());
    update();

    window.addEventListener("cart:updated", update);
    return () => window.removeEventListener("cart:updated", update);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Cart</h1>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    £{item.price.toFixed(2)} × {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="font-medium">Total: £{total.toFixed(2)}</div>

            <button
              onClick={() => {
                clearCart();
                // cart will update instantly due to the event listener
              }}
              className="rounded-lg border px-4 py-2"
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
