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

export const T = {
  brand: {
    ENG: "My Clothing Store",
    FRA: "Ma Boutique",
    ARA: "متجر الملابس",
  },
  nav: {
    home: { ENG: "Home", FRA: "Accueil", ARA: "الرئيسية" },
    products: { ENG: "Products", FRA: "Produits", ARA: "المنتجات" },
    // ✅ FIXED: French was accidentally Arabic before
    requests: { ENG: "Requests", FRA: "Demandes", ARA: "الطلبات" },
    cart: { ENG: "Cart", FRA: "Panier", ARA: "السلة" },
  },

  home: {
    title: { ENG: "My Clothing Store 👕", FRA: "Ma Boutique 👕", ARA: "متجر الملابس 👕" },
    tagline: {
      ENG: "Discover everyday essentials designed for comfort and style.",
      FRA: "Découvrez des essentiels du quotidien alliant confort et style.",
      ARA: "اكتشف أساسيات يومية مصممة للراحة والأناقة.",
    },
    shop: { ENG: "Shop Products", FRA: "Voir les produits", ARA: "تسوق المنتجات" },
  },

  products: {
    title: { ENG: "Products", FRA: "Produits", ARA: "المنتجات" },
    notInCart: { ENG: "Not in cart", FRA: "Pas dans le panier", ARA: "غير مضاف" },
    inCart: { ENG: "In cart", FRA: "Dans le panier", ARA: "مضاف" },
  },

  cart: {
    title: { ENG: "Cart", FRA: "Panier", ARA: "السلة" },
    empty: { ENG: "Your cart is empty.", FRA: "Votre panier est vide.", ARA: "سلتك فارغة." },
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
