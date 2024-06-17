import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import GeekStoreLogo from "../img/geekstore-logo.svg"

export const Logo = () => {
  const { t } = useTranslation()

  return (
    <Link to="/">
      <img src={GeekStoreLogo} alt={t("logo")} role="img" />
    </Link>
  )
}
