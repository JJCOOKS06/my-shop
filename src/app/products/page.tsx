"use client";

import { useState } from "react";
import { products } from "../data/products";
import { setCartItemQuantity } from "../lib/cart";
import { useAppSettings } from "../components/AppSettingsProvider";
import { T } from "../lib/lang";
import { formatPriceGBP } from "../lib/currency";

export default function ProductsPage() {
  const { lang, currency } = useAppSettings();
  const [qty, setQty] = useState<Record<string, number>>({});

  function updateQty(productId: string, nextQty: number) {
    const safe = Math.max(0, Math.min(20, nextQty));
    setQty((q) => ({ ...q, [productId]: safe }));

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItemQuantity(
      { id: product.id, title: product.title, price: product.price, image: product.image },
      safe
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">{T.products.title[lang]}</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const currentQty = qty[p.id] ?? 0;

          return (
            <div key={p.id} className="rounded-xl border p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.title}
                className="h-56 w-full rounded-lg object-cover"
              />

              <h2 className="mt-3 font-medium">{p.title}</h2>
              <p className="text-sm text-gray-600">{formatPriceGBP(p.price, currency)}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  className="rounded-md border px-3 py-2"
                  onClick={() => updateQty(p.id, currentQty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="number"
                  min={0}
                  max={20}
                  value={currentQty}
                  onChange={(e) => updateQty(p.id, Number(e.target.value))}
                  className="w-20 rounded-md border p-2 text-center"
                />

                <button
                  className="rounded-md border px-3 py-2"
                  onClick={() => updateQty(p.id, currentQty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>

                <span className="ml-2 text-sm text-gray-600">
                  {currentQty === 0 ? T.products.notInCart[lang] : T.products.inCart[lang]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
