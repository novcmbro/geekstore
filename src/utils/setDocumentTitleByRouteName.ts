import i18next from "i18next"

export const setDocumentTitleByRouteName = (pathname: string) => {
  const initialDocumentTitle = "GeekStore"
  let routeNameTranslationKey = ""

  switch (pathname) {
    case "/":
      routeNameTranslationKey = "home"
      break
    
    case "/login":
      routeNameTranslationKey = "login"
      break
    
    case "/products":
      routeNameTranslationKey = "admin-menu"
      break
    
    case "/add-product":
      routeNameTranslationKey = "add-product"
      break
    
    default:
      break
  }

  if (pathname.includes("product/")) {
    routeNameTranslationKey = "product-details"
  }

  if (pathname.includes("see-all")) {
    routeNameTranslationKey = "see-all"
  }

  if (pathname.includes("edit-product")) {
    routeNameTranslationKey = "edit-product"
  }

  if (!!!routeNameTranslationKey) {
    routeNameTranslationKey = "not-found"
  }

  document.title += ` | ${i18next.t(`routes.${routeNameTranslationKey}`)}`

  const setDocumentTitleOnTranslationChange = () => {
    if (document.title !== initialDocumentTitle) {
      document.title = initialDocumentTitle
    }
    setDocumentTitleByRouteName(pathname)
  }

  i18next.on("languageChanged", setDocumentTitleOnTranslationChange)

  return () => {
    document.title = initialDocumentTitle
    i18next.off("languageChanged", () => setDocumentTitleOnTranslationChange)
  }
}
