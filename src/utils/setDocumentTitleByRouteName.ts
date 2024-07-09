import i18next from "i18next"

export const setDocumentTitleByRouteName = (pathname: string) => {
  const initialDocumentTitle = document.title
  const setTitle = (routeNameTranslationKey: string) => {
    document.title += ` | ${i18next.t(`routes.${routeNameTranslationKey}`)}`
  }

  switch (pathname) {
    case "/":
      setTitle("home")
      break
    
    case "/login":
      setTitle("login")
      break
    
    case "/products":
      setTitle("admin-menu")
      break
    
    case "/add-product":
      setTitle("add-product")
      break
  
    default:
      break
  }

  if (pathname.includes("product/")) {
    setTitle("product-details")
  }

  if (pathname.includes("see-all")) {
    setTitle("see-all")
  }

  if (pathname.includes("edit-product")) {
    setTitle("edit-product")
  }

  if (document.title === initialDocumentTitle) {
    setTitle("not-found")
  }

  return () => { document.title = initialDocumentTitle }
}
