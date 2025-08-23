import { translations } from "./translations";

type Lang = keyof typeof translations;

export let currentLang: Lang = "en";

export function setLang(lang: Lang) {
  currentLang = lang;
}

export function getLangFromURL(url: URL) {
  const [_, lang] = url.pathname.split("/");

  if (lang in translations) return lang as keyof typeof translations;

  return currentLang;
}

export function t(path: string): string {
  const parts = path.split(".");
  let result: any = translations[currentLang];

  for (const part of parts) {
    result = result?.[part];
    if (!result) break;
  }

  return result ?? path;
}
