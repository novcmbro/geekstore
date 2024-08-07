import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { useProducts } from "../../contexts"
import { useRoute } from "../../hooks"
import { ProductsListStateProps } from "../../types"

export const ProductsListState = ({ isProductNotFound, areProductsNotFound, children }: ProductsListStateProps) => {
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()
  const { isHomeRoute } = useRoute()

  return (
    isLoading ? (
      <p className={classNames("product-alert-message", { "container": isHomeRoute })} role="alert">
        {t("products.loading")}
      </p>
    ) : isProductNotFound ? (
      <p className="product-alert-message" role="alert">
        {t("products.not-found")}
      </p>
    ) : (!!!productsList.length || areProductsNotFound) ? (
      <p className={classNames("product-alert-message", { "container": isHomeRoute })} role="alert">
        {t("products.empty")}
      </p>
    ) : children
  )
}
