export type Lang = "ENG" | "FRA" | "ARA";
const KEY = "lang";

function notify() {
  window.dispatchEvent(new Event("lang:updated"));
}

export function getLang(): Lang {
  if (typeof window === "undefined") return "ENG";
  return (localStorage.getItem(KEY) as Lang) || "ENG";
}

export function setLang(lang: Lang) {
  localStorage.setItem(KEY, lang);
  notify();
}
