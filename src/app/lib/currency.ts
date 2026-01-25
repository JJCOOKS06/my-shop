export type Currency = "GBP" | "EUR";
const KEY = "currency";

function notify() {
  window.dispatchEvent(new Event("currency:updated"));
}

export function getCurrency(): Currency {
  if (typeof window === "undefined") return "GBP";
  return (localStorage.getItem(KEY) as Currency) || "GBP";
}

export function setCurrency(cur: Currency) {
  localStorage.setItem(KEY, cur);
  notify();
}

export async function getGbpToEurRate(): Promise<{ rate: number; date: string } | null> {
  const res = await fetch("/api/rates");
  const data = await res.json();
  if (!data?.ok) return null;
  return { rate: data.rates.EUR, date: data.date };
}

export function formatMoney(amount: number, currency: Currency) {
  const symbol = currency === "GBP" ? "£" : "€";
  return `${symbol}${amount.toFixed(2)}`;
}
