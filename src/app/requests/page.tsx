"use client";

import { useMemo, useState } from "react";

export default function RequestsPage() {
  const [name, setName] = useState("");
  const [itemName, setItemName] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  async function submit() {
    setStatus("Uploading image...");

    let imageUrl: string | null = null;

    if (file) {
      const form = new FormData();
      form.append("file", file);

      const up = await fetch("/api/upload", { method: "POST", body: form });

      let upJson: any = null;
      try {
        upJson = await up.json();
      } catch {
        upJson = null;
      }

      if (!up.ok) {
        setStatus(
          `Image upload failed ❌: ${upJson?.error ?? "Server error (non‑JSON)"}`
        );
        return;
      }

      imageUrl = upJson?.url ?? null;
    }

    setStatus("Sending request...");

    const r = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, itemName, details, contact, imageUrl }),
    });

    let rJson: any = null;
    try {
      rJson = await r.json();
    } catch {
      rJson = null;
    }

    if (!r.ok) {
      setStatus(`Request failed ❌: ${rJson?.error ?? "Server error"}`);
      return;
    }

    setStatus(rJson?.emailed ? "Request sent ✅ (email sent)" : "Request sent ✅");
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Requests</h1>
      <p className="mt-2 text-gray-600">
        Request an item and we’ll try to get it for you.
      </p>

      <div className="mt-6 space-y-4 rounded-xl border p-4">
        <label className="block text-sm">
          Your name
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          Item name
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          Details (colour, size, etc.)
          <textarea
            className="mt-1 w-full rounded-md border p-2"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          Contact info (email or phone)
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          Upload an image (optional)
          <input
            className="mt-1 w-full"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-lg border object-cover"
          />
        )}

        <button
          onClick={submit}
          className="w-full rounded-lg bg-black px-4 py-2 text-white"
        >
          Submit request
        </button>

        {status && <p className="text-sm text-gray-700">{status}</p>}
      </div>
    </main>
  );
}
