import { useEffect } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { firebaseApp } from "../firebase"
import { Contexts } from "../contexts"
import { setDocumentTitleByRouteName } from "../utils"
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

export const App = () => {
  const { pathname } = useLocation()
  firebaseApp()

  useEffect(() => setDocumentTitleByRouteName(pathname), [pathname])

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
