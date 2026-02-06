"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Payment cancelled</h1>
      <p className="mt-2 text-gray-600">No worries — you can try again.</p>

      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg bg-black px-4 py-2 text-white" href="/cart">
          Back to cart
        </Link>
        <Link className="rounded-lg border px-4 py-2" href="/products">
          Browse products
        </Link>
      </div>
    </main>
  );
}
