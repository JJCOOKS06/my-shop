"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Payment successful ✅</h1>
      <p className="mt-2 text-gray-600">
        Thank you! We’ll process your order.
      </p>

      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg bg-black px-4 py-2 text-white" href="/products">
          Continue shopping
        </Link>
        <Link className="rounded-lg border px-4 py-2" href="/cart">
          Back to cart
        </Link>
      </div>
    </main>
  );
}
