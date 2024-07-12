import { useEffect } from "react"
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom"
import { initializeFirebaseApp } from "../firebase"
import { getAuth } from "firebase/auth"
import { Contexts } from "../contexts"
import { useRoute } from "../hooks"
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
  const navigate = useNavigate()
  const auth = getAuth()
  const route = useRoute()
  
  initializeFirebaseApp()

  useEffect(() => setDocumentTitleByRouteName(route), [route])
  useEffect(() => persistLocalStorageAuthKeyIfLogged(auth, route.isLoginRoute, navigate), [auth, route])

  return (
    <Contexts>
      <>
        <Header />
        <main className="container">
          <Outlet />
        </main>
        <Footer />
        <Popup />
        <ScrollRestoration />
      </>
    </Contexts>
  )
}
