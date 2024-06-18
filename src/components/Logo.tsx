import { useTranslation } from "react-i18next"
import { StyledLogo } from "../styles"
import GeekStoreLogo from "../img/geekstore-logo.svg"

export const Logo = () => {
  const { t } = useTranslation()

  return (
    <StyledLogo to="/">
      <img src={GeekStoreLogo} alt={t("logo")} role="img" />
    </StyledLogo>
  )
}
