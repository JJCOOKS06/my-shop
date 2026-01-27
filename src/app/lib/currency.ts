export type Currency = "GBP" | "EUR";

const KEY = "currency";

// simple fixed rates for now (you can update later)
const RATES: Record<Currency, number> = {
  GBP: 1,
  EUR: 1.17,
};

const SYMBOL: Record<Currency, string> = {
  GBP: "£",
  EUR: "€",
};

export function getCurrency(): Currency {
  if (typeof window === "undefined") return "GBP";
  return (localStorage.getItem(KEY) as Currency) || "GBP";
}

export function setCurrency(c: Currency) {
  localStorage.setItem(KEY, c);
  window.dispatchEvent(new Event("currency:updated"));
}

export function formatPriceGBP(gbp: number, currency: Currency): string {
  const converted = gbp * RATES[currency];
  return `${SYMBOL[currency]}${converted.toFixed(2)}`;
}
