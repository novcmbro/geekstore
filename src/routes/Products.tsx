import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { ProductsList, ProductsListHeader, ProductsListItem, ProductsListState } from "../components/Products"

export const Products = () => {
  const { t } = useTranslation()
  const { productsList, restoreDefaultProducts } = useProducts()

  return (
    <>
      <ProductsListHeader title={t("products.all-products")}>
        <Link to="/add-product" className="button-filled">{t("routes.add-product")}</Link>
      </ProductsListHeader>
      <ProductsListState>
        <ProductsList aria-label={t("products.all-products")}>
          {productsList.map((product, i) =>
            <ProductsListItem key={i} product={product} />
          )}
        </ProductsList>
      </ProductsListState>
      <button onClick={restoreDefaultProducts} className="button-filled button-danger restore-products-button"  aria-haspopup="dialog" aria-controls="popup-container">
        {t("products.restore-products")}
      </button>
    </>
  )
}
