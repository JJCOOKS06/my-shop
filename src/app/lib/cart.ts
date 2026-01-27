export type CartItem = {
  id: string;
  title: string;
  price: number; // GBP
  image: string;
  quantity: number;
};

const CART_KEY = "cart";

function notifyCartUpdated() {
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartUpdated();
}

export function setCartItemQuantity(
  item: Omit<CartItem, "quantity">,
  quantity: number
) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);

  // Quantity 0 → remove
  if (quantity <= 0) {
    const filtered = cart.filter((c) => c.id !== item.id);
    saveCart(filtered);
    return;
  }

  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  notifyCartUpdated();
}
