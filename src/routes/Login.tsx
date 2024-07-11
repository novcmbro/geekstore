import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { initialLoginValues, login } from "../utils"
import { Field } from "../components"
import "../styles/login.css"

export const Login = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { handleSubmit, control, setError } = useForm({ defaultValues: initialLoginValues, mode: "onBlur" })
  
  return (
    <form onSubmit={handleSubmit(data => login(data, navigate, setError))} className="login-form" aria-labelledby="login-title">
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
