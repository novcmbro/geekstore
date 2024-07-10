import { Dispatch, SetStateAction } from "react"
import i18next from "i18next"

export const languagesNames = {
  en: "English",
  pt: "Português"
}

export const changeLanguage = (languageCode: string, setLanguageChangeAlert: Dispatch<SetStateAction<boolean>>) => {
  if (i18next.language === languageCode) {
    return
  }
  
  i18next.changeLanguage(languageCode)
  setLanguageChangeAlert(true)
  
  const unmountLanguageAlert = setTimeout(() => {
    setLanguageChangeAlert(false)
  }, 3000)
  
  return () => clearTimeout(unmountLanguageAlert)
}
