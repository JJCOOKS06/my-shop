"use client";

import { useEffect } from "react";
import { getLang } from "../lib/lang";

export default function LangDirSync() {
  useEffect(() => {
    const apply = () => {
      const lang = getLang();
      document.documentElement.lang = lang === "FRA" ? "fr" : lang === "ARA" ? "ar" : "en";
      document.documentElement.dir = lang === "ARA" ? "rtl" : "ltr";
    };

    apply();
    window.addEventListener("lang:updated", apply);
    return () => window.removeEventListener("lang:updated", apply);
  }, []);

  return null;
}
