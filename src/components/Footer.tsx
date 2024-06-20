import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { ContactUs, NavLinks } from "../types"
import { Logo } from "./Logo"
import { Field } from "./Field"
import { languagesNames } from "../i18n"
import "../styles/footer.css"

export const Footer = () => {
  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const { handleSubmit, control } = useForm<ContactUs>({
    defaultValues: {
      name: "",
      message: ""
    },
    mode: "onBlur"
  })

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
        <form onSubmit={handleSubmit((data) => console.log(data))} className="contact-us-form" aria-labelledby="contact-us-title">
          <h2 id="contact-us-title" className="typography-title">{t("contact-us.title")}</h2>
          <Field
            control={control}
            name="name"
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
            name="message"
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
            <button type="button" onClick={() => language !== languageCode ? changeLanguage(languageCode) : undefined} className={classNames("language-button", { "current-language-button": language === languageCode })}>
              {languageName}
            </button>
          </li>
        )}
      </ul>
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
