"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLang, TEXT, type Lang } from "./lib/lang";

export default function Home() {
  const [lang, setLang] = useState<Lang>("ENG");

  useEffect(() => {
    const update = () => setLang(getLang());
    update();
    window.addEventListener("lang:updated", update);
    return () => window.removeEventListener("lang:updated", update);
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">{TEXT.title[lang]}</h1>

      <p className="mt-4 text-gray-600">{TEXT.tagline[lang]}</p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        {TEXT.shop[lang]}
      </Link>
    </main>
  );
}
