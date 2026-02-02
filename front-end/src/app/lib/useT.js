"use client"
import { useLangStore } from "../store/useLangStore";
import en from "../../../locales/en.json";
import ar from "../../../locales/ar.json";

export default function useT() {
  const lang = useLangStore((s) => s.lang) || "en";
  const dict = lang === "en" ? en : ar;
  return (key, fallback) => {
    if (!key) return fallback ?? "";
    const value = key.split('.').reduce((o, k) => (o ? o[k] : undefined), dict);
    return value ?? fallback ?? key;
  };
}
