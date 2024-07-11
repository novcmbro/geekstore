import { useEffect } from "react"
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom"
import { initializeFirebaseApp } from "../firebase"
import { getAuth } from "firebase/auth"
import { Contexts } from "../contexts"
import { persistLocalStorageAuthKeyIfLogged, setDocumentTitleByRouteName } from "../utils"
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
  const navigate = useNavigate()
  const auth = getAuth()
  initializeFirebaseApp()

  useEffect(() => setDocumentTitleByRouteName(pathname), [pathname])
  useEffect(() => persistLocalStorageAuthKeyIfLogged(auth, pathname, navigate), [auth, pathname])

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
