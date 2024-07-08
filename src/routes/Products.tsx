import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"

export const Products = () => {
  const { t } = useTranslation()
  const { isLoading, productsList, deleteProduct, restoreDefaultProducts } = useProducts()

  return (
    <>
      <div className="products-list-header">
        <h2 id="products-title" className="typography-title-md">{t("products.title")}</h2>
        <Link to="/add-product" className="button-filled">{t("routes.add-product")}</Link>
      </div>
      {isLoading ? (
        <p className="product-alert-message">{t("products.loading")}</p>
      ) : (
        <>
          {productsList.length > 0 ? (
            <ol className="products-list" aria-labelledby="products-title">
              {productsList.map(product =>
                <li key={product.id} className="product-list-item" aria-label={product.name}>
                  <div className="button-container">
                    <button type="button" onClick={() => deleteProduct(product.docId, product.name)} aria-label={`${t("products.delete")} ${product.name}`} aria-haspopup="dialog" aria-controls="popup-container">
                      <svg width="18" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon" role="presentation">
                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" />
                      </svg>
                    </button>
                    <Link to={`/edit-product/${product.id}`} aria-label={`${t("products.edit")} ${product.name}`}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon" role="presentation">
                        <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.289998C14.98 -0.100002 14.35 -0.100002 13.96 0.289998L12.13 2.12L15.88 5.87L17.71 4.04Z" />
                      </svg>
                    </Link>
                  </div>
                  <img src={product.image} alt={product.name} className="product-image" role="img" loading="lazy" />
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                  <span className="product-id">{`#${product.id.toLocaleString("en-US", { minimumIntegerDigits: 7, useGrouping: false })}`}</span>
                </li>
              )}
            </ol>
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
