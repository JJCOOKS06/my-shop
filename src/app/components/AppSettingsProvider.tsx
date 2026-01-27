"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "../lib/lang";
import type { Currency } from "../lib/currency";
import { getLang as readLang, setLang as writeLang } from "../lib/lang";
import { getCurrency as readCurrency, setCurrency as writeCurrency } from "../lib/currency";

type AppSettings = {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const Ctx = createContext<AppSettings | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ENG");
  const [currency, setCurrencyState] = useState<Currency>("GBP");

  useEffect(() => {
    setLangState(readLang());
    setCurrencyState(readCurrency());

    const onLang = () => setLangState(readLang());
    const onCur = () => setCurrencyState(readCurrency());

    window.addEventListener("lang:updated", onLang);
    window.addEventListener("currency:updated", onCur);

    return () => {
      window.removeEventListener("lang:updated", onLang);
      window.removeEventListener("currency:updated", onCur);
    };
  }, []);

  const value = useMemo<AppSettings>(
    () => ({
      lang,
      setLang: (l) => {
        writeLang(l); // triggers lang:updated
        setLangState(l); // instant UI update
      },
      currency,
      setCurrency: (c) => {
        writeCurrency(c); // triggers currency:updated
        setCurrencyState(c); // instant UI update
      },
    }),
    [lang, currency]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppSettings must be used inside AppSettingsProvider");
  return v;
}
