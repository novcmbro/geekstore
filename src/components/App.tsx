import { Outlet, useLocation } from "react-router-dom"
import { firebaseAnalytics, firebaseApp } from "../firebase"
import { PopupProvider, ProductsProvider } from "../contexts"
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
import "../styles/field.css"
import "../styles/popup.css"

export const App = () => {
  const { pathname } = useLocation()
  firebaseApp()
  firebaseAnalytics()

  return (
    <PopupProvider>
      <ProductsProvider>
        <>
          <Header />
          <main {...pathname !== "/" ? { className: "container" } : null}>
            <Outlet />
          </main>
          <Footer />
          <Popup />
        </>
      </ProductsProvider>
    </PopupProvider>
  )
}
