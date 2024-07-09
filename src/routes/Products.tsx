import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { ProductsList, ProductsListHeader, ProductsListItem } from "../components/Products"

export const Products = () => {
  const { t } = useTranslation()
  const { isLoading, productsList, restoreDefaultProducts } = useProducts()

  return (
    <>
      <ProductsListHeader title={t("products.all-products")}>
        <Link to="/add-product" className="button-filled">{t("routes.add-product")}</Link>
      </ProductsListHeader>
      {isLoading ? (
        <p className="product-alert-message">{t("products.loading")}</p>
      ) : (
        <>
          {productsList.length > 0 ? (
            <ProductsList aria-label={t("products.all-products")}>
              {productsList.map((product, i) =>
                <ProductsListItem key={i} product={product} isAdminMenu />
              )}
            </ProductsList>
          ) : (
            <p className="product-alert-message">{t("products.empty")}</p>
          )}
          <button onClick={restoreDefaultProducts} className="button-filled button-danger restore-products-button"  aria-haspopup="dialog" aria-controls="popup-container">
            {t("products.restore-products")}
          </button>
        </>
      )}
    </>
  )
}
