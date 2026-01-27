export type Lang = "ENG" | "FRA" | "ARA";

const KEY = "lang";

export function getLang(): Lang {
  if (typeof window === "undefined") return "ENG";
  return (localStorage.getItem(KEY) as Lang) || "ENG";
}

export function setLang(lang: Lang) {
  localStorage.setItem(KEY, lang);
  window.dispatchEvent(new Event("lang:updated"));
}

export const TEXT = {
  title: {
    ENG: "My Clothing Store 👕",
    FRA: "Ma Boutique de Vêtements 👕",
    ARA: "متجر الملابس 👕",
  },
  tagline: {
    ENG: "Discover everyday essentials designed for comfort and style.",
    FRA: "Découvrez des essentiels du quotidien alliant confort et style.",
    ARA: "اكتشف أساسيات يومية مصممة للراحة والأناقة.",
  },
  shop: {
    ENG: "Shop Products",
    FRA: "Voir les produits",
    ARA: "تسوق المنتجات",
  },
  products: {
    ENG: "Products",
    FRA: "Produits",
    ARA: "المنتجات",
  },
};
