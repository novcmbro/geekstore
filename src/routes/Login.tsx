import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { LoginData } from "../types"
import { Field } from "../components"
import "../styles/login.css"

export const Login = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { handleSubmit, control, setError } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onBlur"
  })

  const login = (data: LoginData) => {
    const auth = getAuth()
    
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        localStorage.setItem("novcmbro_geekstore_auth", "true")
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
  
  return (
    <form onSubmit={handleSubmit(login)} className="login-form" aria-labelledby="login-title">
      <h2 id="login-title" className="typography-title-md">{t("login.title")}</h2>
      <Field
        control={control}
        name="email"
        rules={{
          required: t("form-errors.required", { name: "Email" }),
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: t("form-errors.pattern", { name: "Email" })
              .replace(/./g, (char) => char.toLowerCase())
              .replace(/^\w/, (firstLetter) => firstLetter.toUpperCase())
          },
          maxLength: {
            value: 120,
            message: t("form-errors.too-long", { name: "Email", charNumber: 120 })
          }
        }}
        label={t("login.write-your-email")}
      />
      <Field
        control={control}
        name="password"
        type="password"
        rules={{
          required: t("form-errors.required", { name: t("login.password") }),
          minLength: {
            value: 6,
            message: t("form-errors.too-short", { name: t("login.password"), charNumber: 6 })
          },
          maxLength: {
            value: 15,
            message: t("form-errors.too-long", { name: t("login.password"), charNumber: 15 })
          }
        }}
        label={t("login.write-your-password")}
      />
      <button type="submit" className="button-filled button-full-width">{t("login.submit")}</button>
    </form>
  )
}
