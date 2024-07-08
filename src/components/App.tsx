import { useEffect } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { routes } from "../routes"
import { firebaseApp } from "../firebase"
import { Contexts } from "../contexts"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Popup } from "./Popup"
import "../i18n"
import "../styles/reset.css"
import "../styles/index.css"
import "../styles/container.css"
import "../styles/sr-only.css"
import "../styles/typography.css"
import "../styles/link.css"
import "../styles/button.css"
import "../styles/popup.css"
import "../styles/products-list.css"

export const App = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  firebaseApp()

  useEffect(() => {
    const initialDocumentTitle = document.title
    const setDocumentTitle = (routeName: string) => document.title = `${initialDocumentTitle} | ${t(`routes.${routeName}`)}`

    if (pathname === "/") {
      setDocumentTitle("home")
    } else {
      const routesList = routes.routes[0].children
  
      if (routesList) {
        for (const route of routesList) {
          if (pathname !== "/" && (route.path && pathname.includes(route.path.split("/")[0]))) {
            setDocumentTitle(route.id)
            break
          }
        }
      }
    }

    if (document.title === initialDocumentTitle) {
      setDocumentTitle("not-found")
    }

    return () => { document.title = initialDocumentTitle }
  }, [pathname])

  return (
    <Contexts>
      <>
        <Header />
        <main {...pathname !== "/" ? { className: "container" } : null}>
          <Outlet />
        </main>
        <Footer />
        <Popup />
        <ScrollRestoration />
      </>
    </Contexts>
  )
}
