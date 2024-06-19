import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { StyledContainer, StyledFooter, StyledForm, StyledLink } from "../styles"
import { NavLinks } from "../types"
import { Logo } from "./Logo"

export const Footer = () => {
  const { t } = useTranslation()

  const navLinks: NavLinks = [
    {
      route: "/",
      translation: t("nav-links.about-us")
    },
    {
      route: "/",
      translation: t("nav-links.privacy-policy")
    },
    {
      route: "/",
      translation: t("nav-links.loyalty-program")
    },
    {
      route: "/",
      translation: t("nav-links.our-stores")
    },
    {
      route: "/",
      translation: t("nav-links.franchise-opportunities")
    },
    {
      route: "/",
      translation: t("nav-links.advertise-here")
    },
  ]

  return (
    <StyledFooter>
      <StyledContainer>
        <nav>
          <Logo />
          <ul>
            {navLinks.map((navLink, i) => (
              <li key={i}>
                <StyledLink as={Link} to={navLink.route}>{navLink.translation}</StyledLink>
              </li>
            ))}
          </ul>
        </nav>
        <StyledForm aria-labelledby="contact-us-title">
          <h2 id="contact-us-title">{t("contact-us.title")}</h2>
        </StyledForm>
      </StyledContainer>
      <div className="credits">
        <StyledContainer as="p">
          {t("credits") + " "}
          <StyledLink href="https://github.com/novcmbro" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Novcmbro</StyledLink>
          <span className="year">{new Date().getFullYear()}</span>
        </StyledContainer>
      </div>
    </StyledFooter>
  )
}
