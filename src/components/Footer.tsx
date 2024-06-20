import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { NavLinks } from "../types"
import { Logo } from "./Logo"
import { Field } from "./Field"
import { languagesNames } from "../i18n"
import "../styles/footer.css"

export const Footer = () => {
  const { t, i18n: { changeLanguage, language } } = useTranslation()

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
        <form className="contact-us-form" aria-labelledby="contact-us-title">
          <h2 id="contact-us-title" className="typography-title">{t("contact-us.title")}</h2>
          <Field />
          <Field />
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
