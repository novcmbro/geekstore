import { Dispatch, SetStateAction } from "react"
import { redirect } from "react-router-dom"
import i18next from "i18next"
import { getAuth, signOut } from "firebase/auth"
import { NavButton, PopupContextValue } from "../types"

export const setNavButton = (
  pathname: string,
  setNavButtonRoute: Dispatch<SetStateAction<NavButton>>,
  openPopup: PopupContextValue["openPopup"]
) => {
  const auth = getAuth()
  const isUserLogged = !!localStorage.getItem("novcmbro_geekstore_auth")
  
  if (pathname === "/" && !isUserLogged) {
    setNavButtonRoute({ name: i18next.t("routes.login"), to: "/login" })
    return
  }

  if (pathname === "/products") {
    setNavButtonRoute({
      name: i18next.t("logout.title"),
      action: () => openPopup({
        type: "warning",
        message: i18next.t("logout.confirmation"),
        okButton: { action: () =>
          signOut(auth)
            .then(() => {
              localStorage.removeItem("novcmbro_geekstore_auth")
              redirect("/")
              openPopup({ type: "success", message: i18next.t("logout.success") })
            })
            .catch(() => openPopup({ type: "error", message: i18next.t("logout.error") }))
        }
      })
    })
    return
  }

  if (pathname === "/" && isUserLogged || pathname === "/add-product" || pathname.includes("edit-product")) {
    setNavButtonRoute({ name: i18next.t("routes.admin-menu"), to: "/products" })
    return
  }

  setNavButtonRoute({})
}
