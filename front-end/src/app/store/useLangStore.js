import {create} from 'zustand';

export const useLangStore = create((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
}))