import { NavigateFunction } from "react-router-dom"

const localStorageLoginKey = "novcmbro_geekstore_login"

export const localLogin = {
  logAndGoHome: (navigate: NavigateFunction) => {
    localStorage.setItem(localStorageLoginKey, "true")
    navigate("/")
  },
  logout: () => localStorage.removeItem(localStorageLoginKey),
  isAdminLogged: !!localStorage.getItem(localStorageLoginKey)
}
