import { NavigateFunction } from "react-router-dom"

const localStorageLoginKey = "novcmbro_geekstore_login"

export const localLogin = {
  loginAndGoToProducts: (navigate: NavigateFunction) => {
    localStorage.setItem(localStorageLoginKey, "true")
    navigate("/products")
  },
  logoutAndGoHome: (navigate: NavigateFunction) => {
    localStorage.removeItem(localStorageLoginKey)
    navigate("/")
  },
  isAdminLogged: !!localStorage.getItem(localStorageLoginKey)
}
