export type CartItem = {
  id: string;
  title: string;
  price: number; // GBP
  image: string;
  quantity: number;
};

const CART_KEY = "cart";

function notifyCartUpdated() {
  // lets React pages re-render when cart changes
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);

  if (existing) existing.quantity += quantity;
  else cart.push({ ...item, quantity });

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartUpdated();
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  notifyCartUpdated();
}
