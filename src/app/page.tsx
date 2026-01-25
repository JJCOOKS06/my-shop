import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        My Clothing Store 👕
      </h1>

      <p className="mt-4 text-gray-600">
        Discover everyday essentials designed for comfort and style.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        Shop Products
      </Link>
    </main>
  );
}
