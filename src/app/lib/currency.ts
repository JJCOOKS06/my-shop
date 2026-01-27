export type Currency = "GBP" | "EUR";

const KEY = "currency";

const RATES: Record<Currency, number> = {
  GBP: 1,
  EUR: 1.17, // simple fixed rate for now
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

export function formatPrice(gbpPrice: number): string {
  const currency = getCurrency();
  const converted = gbpPrice * RATES[currency];
  return `${SYMBOL[currency]}${converted.toFixed(2)}`;
}
