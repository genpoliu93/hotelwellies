import { en } from "./en"
import { ja } from "./ja"
import { zh } from "./zh"

export type Locale = "en" | "ja" | "zh"

type TranslationObject = {
  [key: string]: string | TranslationObject
}

type Translations = {
  [key in Locale]: TranslationObject
}

export const translations: Translations = {
  en,
  ja,
  zh,
}
