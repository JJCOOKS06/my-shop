"use client";

import { useEffect, useState } from "react";
import { useAppSettings } from "../components/AppSettingsProvider";
import { formatPriceGBP } from "../lib/currency";
import { T } from "../lib/lang";
import { setCartItemQuantity } from "../lib/cart";

type SheetProduct = {
  id: string;
  active: string | boolean | number;
  title_eng: string;
  title_fra: string;
  title_ara: string;
  price_gbp: string | number;
  image: string;
};

function isActive(v: SheetProduct["active"]) {
  return v === true || v === "TRUE" || v === "true" || v === 1 || v === "1";
}

export default function ProductsPage() {
  const { lang, currency } = useAppSettings();

  const [products, setProducts] = useState<SheetProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts((data?.products ?? []) as SheetProduct[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function getTitle(p: SheetProduct) {
    if (lang === "FRA") return p.title_fra;
    if (lang === "ARA") return p.title_ara;
    return p.title_eng;
  }

  function updateQty(p: SheetProduct, nextQty: number) {
    const safe = Math.max(0, Math.min(20, Math.floor(nextQty)));
    setQty((q) => ({ ...q, [p.id]: safe }));

    setCartItemQuantity(
      {
        id: p.id,
        title: getTitle(p),
        price: Number(p.price_gbp),
        image: p.image,
      },
      safe
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">{T.products.title[lang]}</h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products
          .filter((p) => isActive(p.active))
          .map((p) => {
            const title = getTitle(p);
            const price = Number(p.price_gbp);
            const currentQty = qty[p.id] ?? 0;

            return (
              <div key={p.id} className="rounded-xl border p-4 flex flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={title}
                  className="h-48 w-full rounded object-cover"
                />

                <h2 className="mt-3 font-semibold">{title}</h2>

                <p className="mt-1 text-gray-600">
                  {formatPriceGBP(price, currency)}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    className="rounded-md border px-3 py-2"
                    onClick={() => updateQty(p, currentQty - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={currentQty}
                    onChange={(e) => updateQty(p, Number(e.target.value))}
                    className="w-20 rounded-md border p-2 text-center"
                  />

                  <button
                    className="rounded-md border px-3 py-2"
                    onClick={() => updateQty(p, currentQty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                  <span className="ml-2 text-sm text-gray-600">
                    {currentQty === 0
                      ? T.products.notInCart[lang]
                      : T.products.inCart[lang]}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
