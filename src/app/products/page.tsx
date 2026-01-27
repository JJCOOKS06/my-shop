"use client";

import { useMemo, useState } from "react";
import { products } from "../data/products";
import { setCartItemQuantity } from "../lib/cart";

export default function ProductsPage() {
  const initialQty = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, 0])),
    []
  );

  const [qty, setQty] = useState<Record<string, number>>(initialQty);
  const [updatedId, setUpdatedId] = useState<string | null>(null);

  function setQtyForProduct(productId: string, nextQty: number) {
    const safe = Math.max(0, Math.min(20, Math.floor(nextQty)));

    setQty((q) => ({ ...q, [productId]: safe }));

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItemQuantity(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      safe
    );

    setUpdatedId(productId);
    setTimeout(() => setUpdatedId(null), 800);
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Products</h1>

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
              <p className="text-sm text-gray-600">£{p.price.toFixed(2)}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  className="rounded-md border px-3 py-2"
                  onClick={() => setQtyForProduct(p.id, currentQty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="number"
                  min={0}
                  max={20}
                  value={currentQty}
                  onChange={(e) => setQtyForProduct(p.id, Number(e.target.value))}
                  className="w-20 rounded-md border p-2 text-center"
                />

                <button
                  className="rounded-md border px-3 py-2"
                  onClick={() => setQtyForProduct(p.id, currentQty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>

                <span className="ml-2 text-sm text-gray-600">
                  {currentQty === 0 ? "Not in cart" : "In cart"}
                </span>
              </div>

              {updatedId === p.id && (
                <p className="mt-2 text-sm text-green-700">
                  {currentQty === 0 ? "Removed 🗑️" : "Updated ✅"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
