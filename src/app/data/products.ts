export type Product = {
  id: string;
  title: string;
  price: number; // in GBP
  image: string;
};

export const products: Product[] = [
  {
    id: "tee",
    title: "Classic T‑Shirt",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1520975958225-85bd7c0f0a99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hoodie",
    title: "Hoodie",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1520975869010-4d6f996fabd8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "joggers",
    title: "Joggers",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c0ea56f?auto=format&fit=crop&w=1200&q=80",
  },
];
