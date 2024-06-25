import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { ProductsByCategory } from "../types"
import "../styles/banner.css"

export const Home = () => {
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()

  const [productsByCategory, setProductsByCategory] = useState({} as ProductsByCategory)
  const [bannerButtonCategory, setBannerButtonCategory] = useState("")

  useEffect(() => {
    if (productsList) {
      setProductsByCategory(Object.groupBy(productsList, ({ category }: typeof productsList[number]) => category))
    }
  }, [productsList])

  useEffect(() => {
    if (productsByCategory) {
      const productsCategories = Object.keys(productsByCategory)
      setBannerButtonCategory(productsCategories[productsCategories.length - 2])
    }
  }, [productsByCategory])

  return (
    isLoading ? (
      <p className="product-alert-message container">{t("products.loading")}</p>
    ) : (
      <>
        <div className="banner">
          <div className="container">
            <h2 className="typography-title-lg">{t("home-banner.title")}</h2>
            <p>{t("home-banner.description")}</p>
            <Link to={`#${bannerButtonCategory}`} className="button-filled">{t("home-banner.button", { name: bannerButtonCategory })}</Link>
          </div>
        </div>
        <section className="container">
          {Object.entries(productsByCategory).map(([category, products], i) =>
            <div key={i} className="product-category-row">
              <div className="products-list-header">
                <h2 id="products-title" className="typography-title-md">{category}</h2>
                {products.length > 6 ? (
                  <Link to={`/see-all/${category.toLowerCase().replace(" ", "-")}`} className="route-link">
                    {`${t("routes.see-all")} 🡪`}
                  </Link>
                ) : null}
              </div>
              <ol className="products-list" aria-labelledby="products-title">
                {products.map((product, i) => i <= 5 ? (
                  <li key={product.id} className="product-list-item" aria-label={product.name}>
                    <img src={product.image} alt={product.name} className="product-image" role="img" loading="lazy" />
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                    <Link to={`/product/${product.id}`} className="route-link see-product-link">{t("routes.see-product")}</Link>
                  </li>
                ) : null)}
              </ol>
            </div>
          )}
        </section>
      </>
    )
  )
}
