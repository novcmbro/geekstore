import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { ProductsByCategory } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem } from "../components/Products"
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
          <div className="container home-container">
            {Object.entries(productsByCategory).map(([category, products], i) =>
              <section id={category} key={i} className="products-row" aria-label={category}>
                <ProductsListHeader title={category}>
                  {products.length > 4 ? (
                    <Link to={`/see-all/${category.toLowerCase().replace(" ", "-")}`} className="route-link">
                      {`${t("routes.see-all")} 🡪`}
                    </Link>
                  ) : null}
                </ProductsListHeader>
                <ProductsList aria-label={category}>
                  {products.map((product, i) => i <= 5 ? (
                    <ProductsListItem key={i} product={product} />
                  ) : null)}
                </ProductsList>
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
