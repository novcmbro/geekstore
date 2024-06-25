import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, signOut } from "firebase/auth"
import classNames from "classnames"
import { usePopup } from "../contexts"
import { localLogin } from "../firebase"
import { NavButton } from "../types"
import { Logo } from "./Logo"
import "../styles/header.css"

export const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth = getAuth()
  const { openPopup } = usePopup()

  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false)
  const [shouldRenderSearchBarAlert, setShouldRenderSearchBarAlert] = useState<boolean>(false)

  const initialNavButtonRoute: NavButton = {}
  const [navButtonRoute, setNavButtonRoute] = useState(initialNavButtonRoute)

  useEffect(() => {
    if (shouldRenderSearchBarAlert) {
      const removeSearchBarAlert = setTimeout(() => {
        setShouldRenderSearchBarAlert(false)
      }, 3000)

      return () => clearTimeout(removeSearchBarAlert)
    }
  }, [shouldRenderSearchBarAlert])

  useEffect(() => {
    const handleNavButtonRoutes = () => {
      if (pathname === "/") {
        setNavButtonRoute({
          name: !localLogin.isAdminLogged ? t("routes.login") : t("routes.admin-menu"),
          to: !localLogin.isAdminLogged ? "/login" : "/products"
        })
        return
      }
  
      if (pathname === "/products") {
        setNavButtonRoute({
          name: t("logout.title"),
          action: () => openPopup({
            type: "warning",
            message: t("logout.confirmation"),
            okButton: {
              action: () => signOut(auth)
                .then(() => {
                  localLogin.logout()
                  navigate("/")
                  openPopup({ type: "success", message: t("logout.success") })
                })
                .catch(() => openPopup({ type: "error", message: t("logout.error") }))
            }
          })
        })
        return
      }
  
      if (pathname === "/add-product" || pathname.includes("/edit-product")) {
        setNavButtonRoute({
          name: t("routes.admin-menu"),
          to: "/products"
        })
        return
      }
  
      setNavButtonRoute(initialNavButtonRoute)
    }

    handleNavButtonRoutes()

    return () => handleNavButtonRoutes()
  }, [pathname])

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen)
    setShouldRenderSearchBarAlert(true)
  }

  return (
    <header className={classNames("header", { "search-bar-is-open": isSearchBarOpen })}>
      <nav className="container">
        <Logo />
        <form className="search-form" aria-labelledby="search-field-label">
          <label id="search-field-label" htmlFor="search-field" className="sr-only">
            {t("search.form.label")}
          </label>
          <input id="search-field" name="search" type="text" placeholder={t("search.form.placeholder")} className="search-field" />
          <button type="submit" className="search-submit-button" aria-label={t("search.form.button")}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="magnifying-glass-icon" aria-label={t("search.icon")} role="presentation">
              <path d="M15.5001 14.5H14.7101L14.4301 14.23C15.6301 12.83 16.2501 10.92 15.9101 8.89002C15.4401 6.11002 13.1201 3.89002 10.3201 3.55002C6.09014 3.03002 2.53014 6.59001 3.05014 10.82C3.39014 13.62 5.61014 15.94 8.39014 16.41C10.4201 16.75 12.3301 16.13 13.7301 14.93L14.0001 15.21V16L18.2501 20.25C18.6601 20.66 19.3301 20.66 19.7401 20.25C20.1501 19.84 20.1501 19.17 19.7401 18.76L15.5001 14.5ZM9.50014 14.5C7.01014 14.5 5.00014 12.49 5.00014 10C5.00014 7.51002 7.01014 5.50002 9.50014 5.50002C11.9901 5.50002 14.0001 7.51002 14.0001 10C14.0001 12.49 11.9901 14.5 9.50014 14.5Z" />
            </svg>
          </button>
        </form>
        {navButtonRoute.name ? (
          navButtonRoute.to ? (
            <Link to={navButtonRoute.to} className="button-outlined" role="button">
              {navButtonRoute.name}
            </Link>
          ) : (
            <button onClick={navButtonRoute.action} className="button-outlined button-danger">
              {navButtonRoute.name}
            </button>
          )
        ) : null}
        <button type="button" onClick={toggleSearchBar} className="search-bar-toggler-button" aria-label={t(`search.${!isSearchBarOpen ? "open" : "close"}.action`)}>
          {!isSearchBarOpen ? (
            <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label={t("search.icon")} role="presentation">
              <path d="M15.5001 14.5H14.7101L14.4301 14.23C15.6301 12.83 16.2501 10.92 15.9101 8.89002C15.4401 6.11002 13.1201 3.89002 10.3201 3.55002C6.09014 3.03002 2.53014 6.59001 3.05014 10.82C3.39014 13.62 5.61014 15.94 8.39014 16.41C10.4201 16.75 12.3301 16.13 13.7301 14.93L14.0001 15.21V16L18.2501 20.25C18.6601 20.66 19.3301 20.66 19.7401 20.25C20.1501 19.84 20.1501 19.17 19.7401 18.76L15.5001 14.5ZM9.50014 14.5C7.01014 14.5 5.00014 12.49 5.00014 10C5.00014 7.51002 7.01014 5.50002 9.50014 5.50002C11.9901 5.50002 14.0001 7.51002 14.0001 10C14.0001 12.49 11.9901 14.5 9.50014 14.5Z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label={t("search.close.icon")} role="presentation">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" />
            </svg>
          )}
        </button>
        {shouldRenderSearchBarAlert ? (
          <p className="sr-only" role="alert">
            {t(`search.${isSearchBarOpen ? "open" : "close"}.alert`)}
          </p>
        ) : null}
      </nav>
    </header>
  )
}
