"use client";

import Link from "next/link";
import { useAppSettings } from "./components/AppSettingsProvider";
import { T } from "./lib/lang";

export default function Home() {
  const { lang } = useAppSettings();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">{T.home.title[lang]}</h1>
      <p className="mt-4 text-gray-600">{T.home.tagline[lang]}</p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        {T.home.shop[lang]}
      </Link>
    </main>
  );
}
