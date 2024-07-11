import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { usePopup } from "../contexts"
import { changeLanguage, contactUsInitialValues, languagesNames } from "../utils"
import { Logo } from "./Logo"
import { Field } from "./Field"
import "../styles/footer.css"

export const Footer = () => {
  const { t, i18n: { language } } = useTranslation()
  const { handleSubmit, control, getValues } = useForm({ defaultValues: contactUsInitialValues, mode: "onBlur" })
  const { openPopup } = usePopup()

  const [languageChangeAlert, setLanguageChangeAlert] = useState(false)

  const navRoutes = ["about-us", "privacy-policy", "loyalty-program", "our-stores", "franchise-opportunities", "advertise-here"]

  return (
    <footer>
      <div className="container nav-container">
        <nav className="nav-links">
          <Logo />
          <ul className="nav-links-list">
            {navRoutes.map((route, i) =>
              <li key={i} className="nav-links-list-item">
                <Link to={`/${route}`} className="nav-links-link">{t(`routes.${route}`)}</Link>
              </li>
            )}
          </ul>
        </nav>
        <form onSubmit={handleSubmit(() => openPopup({ type: "success", message: t("contact-us.success", { name: getValues("contact-name") }) }))} className="contact-us-form" aria-labelledby="contact-us-title" aria-haspopup="dialog" aria-controls="popup-container">
          <h2 id="contact-us-title" className="typography-title">{t("contact-us.title")}</h2>
          <Field
            control={control}
            name="contact-name"
            rules={{
              required: t("form-errors.required", { fieldName: t("contact-us.name") }),
              minLength: {
                value: 3,
                message: t("form-errors.too-short", { fieldName: t("contact-us.name"), charNumber: 3 })
              },
              maxLength: {
                value: 100,
                message: t("form-errors.too-long", { fieldName: t("contact-us.name"), charNumber: 100 })
              }
            }}
            label={t("contact-us.name")}
          />
          <Field
            control={control}
            name="contact-message"
            rules={{
              required: t("form-errors.required", { fieldName: t("contact-us.message") }),
              minLength: {
                value: 10,
                message: t("form-errors.too-short", { fieldName: t("contact-us.message"), charNumber: 10 })
              },
              maxLength: {
                value: 1000,
                message: t("form-errors.too-long", { fieldName: t("contact-us.message"), charNumber: 1000 })
              }
            }}
            label={t("contact-us.write-your-message")}
            textarea
          />
          <button type="submit" className="button-filled">{t("contact-us.submit")}</button>
        </form>
      </div>
      <ul className="container language-list">
        {Object.entries(languagesNames).map(([languageCode, languageName], i) =>
          <li key={i} className="language-list-item">
            <button type="button" onClick={() => changeLanguage(languageCode, setLanguageChangeAlert)} className={classNames("language-button", { "current-language-button": language === languageCode })} aria-label={t("language.change", { name: languageName })}>
              {languageName}
            </button>
          </li>
        )}
      </ul>
      {languageChangeAlert ? (
        <p className="sr-only" role="alert">
          {t("language.change-success", { name: languagesNames[language as keyof typeof languagesNames] })}
        </p>
      ) : null}
      <div className="credits">
        <p className="container">
          {t("credits") + " "}
          <a href="https://github.com/novcmbro" target="_blank" rel="noopener noreferrer" className="external-link" aria-label="GitHub">
            Novcmbro
          </a>
          <span className="credits-year">2024</span>
        </p>
      </div>
    </footer>
  )
}
