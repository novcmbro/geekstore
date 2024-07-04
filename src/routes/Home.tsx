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
    if (productsList.length > 0 && productsByCategory) {
      const productsCategories = Object.keys(productsByCategory)
      const oneOfTheTwoLastCategories = productsCategories.includes("Consoles") ? "Consoles" : productsCategories[productsCategories.length - 1]
      setBannerButtonCategory(oneOfTheTwoLastCategories)
    }
  }, [productsList, productsByCategory])

  return (
    isLoading ? (
      <p className="product-alert-message container">{t("products.loading")}</p>
    ) : (
      productsList.length > 0 ? (
        <>
          {bannerButtonCategory ? (
            <div className="banner">
              <div className="container">
                <h2 className="typography-title-lg">{t("home-banner.title")}</h2>
                <p>{t("home-banner.description")}</p>
                <a href={`#${bannerButtonCategory}`} className="button-filled">{t("home-banner.button", { name: bannerButtonCategory })}</a>
              </div>
            </div>
          ) : null}
          <div className="container">
            {Object.entries(productsByCategory).map(([category, products], i) =>
              <section id={category} key={i} className="product-category-row" aria-label={category}>
                <div className="products-list-header">
                  <h2 className="typography-title-md">{category}</h2>
                  {products.length > 4 ? (
                    <Link to={`/see-all/${category.toLowerCase().replace(" ", "-")}`} className="route-link">
                      {`${t("routes.see-all")} 🡪`}
                    </Link>
                  ) : null}
                </div>
                <ol className="products-list" aria-label={category}>
                  {products.map((product, i) => i <= 5 ? (
                    <li key={product.id} className="product-list-item" aria-label={product.name}>
                      <img src={product.image} alt={product.name} className="product-image" role="img" loading="lazy" />
                      <span className="product-name">{product.name}</span>
                      <span className="product-price">{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                      <Link to={`/product/${product.id}`} className="route-link see-product-link">{t("routes.see-product")}</Link>
                    </li>
                  ) : null)}
                </ol>
              </section>
            )}
          </div>
        </>
      ) : (
        <p className="product-alert-message container">{t("products.empty")}</p>
      )
    )
  )
}
