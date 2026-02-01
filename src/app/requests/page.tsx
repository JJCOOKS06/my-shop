import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requests | Regarm.uk",
};

"use client";

import { useState } from "react";
import { useAppSettings } from "../components/AppSettingsProvider";
import { T } from "../lib/lang";

export default function RequestsPage() {
  const { lang } = useAppSettings();

  const [name, setName] = useState("");
  const [itemName, setItemName] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    setStatus(T.requests.sending[lang]);

    const r = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, itemName, details, contact }),
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

    if (rJson?.emailed) setStatus("Request sent ✅ (email sent)");
    else setStatus(`Request sent ✅ (email NOT sent): ${rJson?.note ?? "Unknown"}`);
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{T.requests.title[lang]}</h1>
      <p className="mt-2 text-gray-600">{T.requests.subtitle[lang]}</p>

      <div className="mt-6 space-y-4 rounded-xl border p-4">
        <label className="block text-sm">
          {T.requests.name[lang]}
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          {T.requests.item[lang]}
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          {T.requests.details[lang]}
          <textarea
            className="mt-1 w-full rounded-md border p-2"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          {T.requests.contact[lang]}
          <input
            className="mt-1 w-full rounded-md border p-2"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>

        <button onClick={submit} className="w-full rounded-lg bg-black px-4 py-2 text-white">
          {T.requests.submit[lang]}
        </button>

        {status && <p className="text-sm text-gray-700">{status}</p>}
      </div>
    </main>
  );
}
