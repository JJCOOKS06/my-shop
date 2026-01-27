"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";
import { useAppSettings } from "./AppSettingsProvider";
import { T, type Lang } from "../lib/lang";
import type { Currency } from "../lib/currency";

const LANGS: { code: Lang; label: string }[] = [
  { code: "ENG", label: "🇬🇧 ENG" },
  { code: "FRA", label: "🇫🇷 FRA" },
  { code: "ARA", label: "🇸🇦 ARA" },
];

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "GBP", label: "🇬🇧 GBP" },
  { code: "EUR", label: "🇪🇺 EUR" },
];

export default function Navbar() {
  const { lang, setLang, currency, setCurrency } = useAppSettings();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCart = () =>
      setCount(getCart().reduce((sum, i: any) => sum + (i.quantity ?? i.qty ?? 0), 0));

    updateCart();
    window.addEventListener("cart:updated", updateCart);
    window.addEventListener("cart:changed", updateCart);
    return () => {
      window.removeEventListener("cart:updated", updateCart);
      window.removeEventListener("cart:changed", updateCart);
    };
  }, []);

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 p-4">
        <Link href="/" className="text-lg font-semibold">
          {T.brand[lang]}
        </Link>

        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-md border p-2 text-sm"
            aria-label="Language"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-md border p-2 text-sm"
            aria-label="Currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:underline">
              {T.nav.home[lang]}
            </Link>
            <Link href="/products" className="hover:underline">
              {T.nav.products[lang]}
            </Link>
            <Link href="/requests" className="hover:underline">
              {T.nav.requests[lang]}
            </Link>
            <Link href="/cart" className="hover:underline">
              {T.nav.cart[lang]}
              {count > 0 ? ` (${count})` : ""}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
