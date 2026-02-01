export type OrderItem = {
  id: string;
  title: string;
  price: number; // GBP base
  image: string;
  quantity: number;
};

export type OrderSnapshot = {
  createdAt: number;
  items: OrderItem[];
};

const KEY = "last_order_v1";

export function saveLastOrder(items: OrderItem[]) {
  if (typeof window === "undefined") return;
  const snapshot: OrderSnapshot = { createdAt: Date.now(), items };
  localStorage.setItem(KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new Event("order:updated"));
}

export function getLastOrder(): OrderSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderSnapshot) : null;
  } catch {
    return null;
  }
}

export function clearLastOrder() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("order:updated"));
}
