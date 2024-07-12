import i18next from "i18next"
import { UseRoute } from "../types"

export const setDocumentTitleByRouteName = (isRoute: UseRoute) => {
  const initialDocumentTitle = "GeekStore"
  let routeNameTranslationKey = ""

  for (const [routeKey, isCurrentRoute] of Object.entries(isRoute)) {
    if (isCurrentRoute) {
      routeNameTranslationKey = routeKey
        .replace("is", "")
        .replace("Route", "")
        .replace(/[A-Z]/g, match => "-" + match.toLowerCase()).replace(/^[-]/, "").toLowerCase()
      break
    }
  }

  if (!!!routeNameTranslationKey) {
    routeNameTranslationKey = "not-found"
  }

  document.title += ` | ${i18next.t(`routes.${routeNameTranslationKey}`)}`

  const setDocumentTitleOnTranslationChange = () => {
    if (document.title !== initialDocumentTitle) {
      document.title = initialDocumentTitle
    }
    setDocumentTitleByRouteName(isRoute)
  }

  i18next.on("languageChanged", setDocumentTitleOnTranslationChange)

  return () => {
    document.title = initialDocumentTitle
    i18next.off("languageChanged", setDocumentTitleOnTranslationChange)
  }
}
