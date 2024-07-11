import { NavigateFunction } from "react-router-dom"
import { UseFormSetError } from "react-hook-form"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Auth, PopupContextValue } from "../types"
import { t } from "i18next"

export const initialLoginValues: Auth = {
  email: "",
  password: ""
}

export const localStorageAuthKey = "novcmbro_geekstore_auth"

export const login = (data: Auth, navigate: NavigateFunction, setError: UseFormSetError<Auth>) => {
  const auth = getAuth()
    
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      localStorage.setItem(localStorageAuthKey, "true")
      navigate("/products")
    })
    .catch((error) => {
      const errorCodes = ["invalid-credential", "user-not-found", "user-disabled", "too-many-requests", "network-request-failed"]

      for (let errorCode of errorCodes) {
        if (error.code.includes(errorCode)) {
          setError(
            error.code.includes("password") ? "password" : "email",
            { type: "value", message: t(`login.${errorCode}`) }
          )
          break
        }
      }
    })
}

export const logout = (navigate: NavigateFunction, openPopup: PopupContextValue["openPopup"]) => {
  const auth = getAuth()
  
  signOut(auth)
    .then(() => {
      localStorage.removeItem(localStorageAuthKey)
      navigate("/")
      openPopup({ type: "success", message: t("logout.success") })
    })
    .catch(() => openPopup({ type: "error", message: t("logout.error") }))
}

export const persistLocalStorageAuthKeyIfLogged = (auth: ReturnType<typeof getAuth>, pathname: string, navigate: NavigateFunction) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && !localStorage.getItem(localStorageAuthKey)) {
      localStorage.setItem(localStorageAuthKey, "true")

      if (localStorage.getItem(localStorageAuthKey)) {
        pathname === "/login" ? navigate("/products") : window.location.reload()
      }
      return
    }
  })

  return () => unsubscribe()
}
