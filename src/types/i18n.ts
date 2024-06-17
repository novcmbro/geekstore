type Languages = {
  en: "English"
  pt: "Português"
}

export type LanguagesNames = {
  [K in keyof Languages]: Languages[K]
}
