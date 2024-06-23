import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { usePopup } from "../contexts"
import { ContactUs, NavLinks } from "../types"
import { Logo } from "./Logo"
import { Field } from "./Field"
import { languagesNames } from "../i18n"
import "../styles/footer.css"

export const Footer = () => {
  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const { handleSubmit, control, getValues } = useForm<ContactUs>({
    defaultValues: {
      "contact-name": "",
      "contact-message": ""
    },
    mode: "onBlur"
  })
  const { openPopup } = usePopup()

  const [languageName, setLanguageName] = useState<string>("")

  useEffect(() => {
    const unmountLanguageAlert = setTimeout(() => {
      setLanguageName("")
    }, 3000)
  
    return () => clearTimeout(unmountLanguageAlert)
  }, [languageName])

  const handleLanguageChange = (languageCode: string, languageName: string) => {
    if (language !== languageCode) {
      changeLanguage(languageCode)
      setLanguageName(languageName)
    }
  }

  const navLinks: NavLinks = [
    {
      route: "/",
      translation: t("routes.about-us")
    },
    {
      route: "/",
      translation: t("routes.privacy-policy")
    },
    {
      route: "/",
      translation: t("routes.loyalty-program")
    },
    {
      route: "/",
      translation: t("routes.our-stores")
    },
    {
      route: "/",
      translation: t("routes.franchise-opportunities")
    },
    {
      route: "/",
      translation: t("routes.advertise-here")
    },
  ]

  return (
    <footer className="footer">
      <div className="container nav-container">
        <nav className="nav-links">
          <Logo />
          <ul className="nav-links-list">
            {navLinks.map((navLink, i) => (
              <li key={i} className="nav-links-list-item">
                <Link to={navLink.route} className="nav-links-link">{navLink.translation}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <form onSubmit={handleSubmit(() => openPopup({ type: "success", message: t("contact-us.success", { name: getValues("contact-name") }) }))} className="contact-us-form" aria-labelledby="contact-us-title" aria-haspopup="dialog" aria-controls="popup-container">
          <h2 id="contact-us-title" className="typography-title">{t("contact-us.title")}</h2>
          <Field
            control={control}
            name="contact-name"
            rules={{
              required: t("form-errors.required", { name: t("contact-us.name") }),
              minLength: {
                value: 3,
                message: t("form-errors.too-short", { name: t("contact-us.name"), charNumber: 3 })
              },
              maxLength: {
                value: 100,
                message: t("form-errors.too-long", { name: t("contact-us.name"), charNumber: 100 })
              }
            }}
            label={t("contact-us.name")}
          />
          <Field
            control={control}
            name="contact-message"
            rules={{
              required: t("form-errors.required", { name: t("contact-us.message") }),
              minLength: {
                value: 10,
                message: t("form-errors.too-short", { name: t("contact-us.message"), charNumber: 10 })
              },
              maxLength: {
                value: 1000,
                message: t("form-errors.too-long", { name: t("contact-us.message"), charNumber: 1000 })
              }
            }}
            label={t("contact-us.write-your-message")}
            textarea
          />
          <button type="submit" className="button-filled">{t("contact-us.submit")}</button>
        </form>
      </div>
      <ul className="container language-list">
        {Object.entries(languagesNames).map(([languageCode, languageName]) =>
          <li key={languageCode} className="language-list-item">
            <button type="button" onClick={() => handleLanguageChange(languageCode, languageName)} className={classNames("language-button", { "current-language-button": language === languageCode })} aria-label={t("language.change", { name: languageName })}>
              {languageName}
            </button>
          </li>
        )}
      </ul>
      {languageName ? (
        <p className="sr-only" role="alert">{t("language.change-success", { name: languageName })}</p>
      ) : null}
      <div className="credits">
        <p className="container">
          {t("credits") + " "}
          <a href="https://github.com/novcmbro" target="_blank" rel="noopener noreferrer" className="external-link" aria-label="GitHub">
            Novcmbro
          </a>
          <span className="credits-year">{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  )
}
