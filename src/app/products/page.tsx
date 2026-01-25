"use client";

import { useMemo, useState } from "react";
import { products } from "../data/products";
import { addToCart } from "../lib/cart";

export default function ProductsPage() {
  const initialQty = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, 1])),
    []
  );
  const [qty, setQty] = useState<Record<string, number>>(initialQty);
  const [addedId, setAddedId] = useState<string | null>(null);

  function setProductQty(id: string, value: number) {
    const v = Number.isFinite(value) ? value : 1;
    setQty((q) => ({ ...q, [id]: Math.max(1, Math.min(20, v)) }));
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              className="h-56 w-full rounded-lg object-cover"
            />

            <h2 className="mt-3 font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600">£{p.price.toFixed(2)}</p>

            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm text-gray-600">
                Qty
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={qty[p.id] ?? 1}
                  onChange={(e) => setProductQty(p.id, Number(e.target.value))}
                  className="ml-2 w-20 rounded-md border p-2"
                />
              </label>

              <button
                onClick={() => {
                  addToCart(
                    { id: p.id, title: p.title, price: p.price, image: p.image },
                    qty[p.id] ?? 1
                  );
                  setAddedId(p.id);
                  setTimeout(() => setAddedId(null), 900);
                }}
                className="flex-1 rounded-lg bg-black px-4 py-2 text-white"
              >
                Add to cart
              </button>
            </div>

            {addedId === p.id && (
              <p className="mt-2 text-sm text-green-700">Added ✅</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

