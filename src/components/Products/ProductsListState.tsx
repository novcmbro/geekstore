import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { useProducts } from "../../contexts"
import { ProductsListStateProps } from "../../types"

export const ProductsListState = ({ isProductNotFound, areProductsNotFound, children }: ProductsListStateProps) => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()

  return (
    isLoading ? (
      <p className={classNames("product-alert-message", { "container": pathname === "/" })} role="alert">
        {t("products.loading")}
      </p>
    ) : isProductNotFound ? (
      <p className="product-alert-message" role="alert">
        {t("products.not-found")}
      </p>
    ) : (!!!productsList.length || areProductsNotFound) ? (
      <p className={classNames("product-alert-message", { "container": pathname === "/" })} role="alert">
        {t("products.empty")}
      </p>
    ) : children
  )
}
