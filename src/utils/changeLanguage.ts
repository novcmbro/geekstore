import i18next from "i18next"
import { unmountSrOnlyAlert } from "./unmountSrOnlyAlert"

export const languagesNames = {
  en: "English",
  pt: "Português"
}

export const changeLanguage = (languageCode: string, setLanguageChangeAlert: Parameters<typeof unmountSrOnlyAlert>[0]) => {
  if (i18next.language === languageCode) {
    return
  }
  
  i18next.changeLanguage(languageCode)
  setLanguageChangeAlert(true)
  unmountSrOnlyAlert(setLanguageChangeAlert)
}
