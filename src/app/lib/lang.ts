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

/**
 * NOTE:
 * Brand name (Regarm.uk) is NOT translated.
 * Only descriptive text is translated.
 */
export const T = {
  brand: {
    ENG: "Regarm.uk",
    FRA: "Regarm.uk",
    ARA: "Regarm.uk",
  },

  nav: {
    home: { ENG: "Home", FRA: "Accueil", ARA: "الرئيسية" },
    products: { ENG: "Products", FRA: "Produits", ARA: "المنتجات" },
    requests: { ENG: "Requests", FRA: "Demandes", ARA: "الطلبات" },
    cart: { ENG: "Cart", FRA: "Panier", ARA: "السلة" },
  },

  home: {
    title: {
      ENG: "Regarm.uk",
      FRA: "Regarm.uk",
      ARA: "Regarm.uk",
    },
    tagline: {
      ENG: "All your favourite products, at a fraction of the price.",
      FRA: "Tous vos produits préférés, à une fraction du prix.",
      ARA: "كل منتجاتك المفضلة، بجزء من السعر.",
    },
    shop: {
      ENG: "Shop Products",
      FRA: "Voir les produits",
      ARA: "تسوق المنتجات",
    },
  },

  products: {
    title: { ENG: "Products", FRA: "Produits", ARA: "المنتجات" },
    notInCart: { ENG: "Not in cart", FRA: "Pas dans le panier", ARA: "غير مضاف" },
    inCart: { ENG: "In cart", FRA: "Dans le panier", ARA: "مضاف" },
  },

  cart: {
    title: { ENG: "Cart", FRA: "Panier", ARA: "السلة" },
    empty: {
      ENG: "Your cart is empty.",
      FRA: "Votre panier est vide.",
      ARA: "سلتك فارغة.",
    },
    itemTotal: { ENG: "Item total", FRA: "Total", ARA: "إجمالي المنتج" },
    total: { ENG: "Total", FRA: "Total", ARA: "الإجمالي" },
    clear: { ENG: "Clear cart", FRA: "Vider le panier", ARA: "تفريغ السلة" },
    remove: { ENG: "Remove", FRA: "Supprimer", ARA: "حذف" },
    each: { ENG: "each", FRA: "chacun", ARA: "للقطعة" },
  },

  requests: {
    title: { ENG: "Requests", FRA: "Demandes", ARA: "الطلبات" },
    subtitle: {
      ENG: "Request an item and we’ll try to get it for you.",
      FRA: "Demandez un article et nous essaierons de l’obtenir pour vous.",
      ARA: "اطلب منتجًا وسنحاول توفيره لك.",
    },
    name: { ENG: "Your name", FRA: "Votre nom", ARA: "اسمك" },
    item: { ENG: "Item name", FRA: "Nom de l'article", ARA: "اسم المنتج" },
    details: {
      ENG: "Details (colour, size, etc.)",
      FRA: "Détails (couleur, taille…)",
      ARA: "تفاصيل (اللون، المقاس…)",
    },
    contact: {
      ENG: "Contact info (email or phone)",
      FRA: "Contact (email ou téléphone)",
      ARA: "معلومات التواصل (إيميل أو رقم)",
    },
    submit: { ENG: "Submit request", FRA: "Envoyer la demande", ARA: "إرسال الطلب" },
    sending: { ENG: "Sending request...", FRA: "Envoi en cours...", ARA: "جارٍ الإرسال..." },
  },
};
