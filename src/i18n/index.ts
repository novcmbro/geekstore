import i18n, { t } from "i18next"
import { initReactI18next } from "react-i18next"
import { LanguagesNames } from "../types"
import enUS from "./locales/en-us.json"
import ptBR from "./locales/pt-br.json"

const localStorageLanguageKey = "novcmbro_geekstore_language"
const localStorageLanguage = localStorage.getItem(localStorageLanguageKey)
const navigatorLanguage = navigator.language.split("-")[0]
!localStorageLanguage ? localStorage.setItem(localStorageLanguageKey, navigatorLanguage) : undefined

i18n.use(initReactI18next).init({
  resources: { en: enUS, pt: ptBR },
  lng: localStorageLanguage || navigatorLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false }
})

i18n.on("languageChanged", (language) => {
  localStorage.setItem(localStorageLanguageKey, language)
  document.documentElement.lang = language
  document.querySelectorAll<HTMLMetaElement>("[name='description']").forEach((description) => description.content = t("description"))
})

export const languagesNames: LanguagesNames = {
  en: "English",
  pt: "Português"
}
