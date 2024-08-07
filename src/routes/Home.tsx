import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { routesBasePath } from "../utils"
import { ProductsByCategory } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem, ProductsListState } from "../components/Products"
import "../styles/banner.css"

export const Home = () => {
  const { t } = useTranslation()
  const { productsList } = useProducts()

  const [productsByCategory, setProductsByCategory] = useState({} as ProductsByCategory)
  const [bannerButtonCategory, setBannerButtonCategory] = useState("")

  useEffect(() => {
    if (!!productsList.length) {
      setProductsByCategory(
        productsList.reduce<{ [key: string]: typeof productsList }>((acc, product) => {
          const { category } = product
          acc[category] = [...(acc[category] || []), product]
          return acc
        }, {})
      )
    }
  }, [productsList])
  
  useEffect(() => {
    const productsCategories = Object.keys(productsByCategory)

    if (!!productsCategories.length) {
      const initialBannerButtonCategory = "Consoles"
      const initialOrNewBannerButtonCategory = productsByCategory[initialBannerButtonCategory] ? initialBannerButtonCategory : productsCategories[productsCategories.length - 1]
      setBannerButtonCategory(initialOrNewBannerButtonCategory)
    }
  }, [productsByCategory])

  return (
    <ProductsListState>
      <>
        {bannerButtonCategory ? (
          <div className="banner">
            <div className="container">
              <h2 className="typography-title-lg">
                {t("home-banner.title", { month: t(`home-banner.months.${new Date().getMonth()}`) })}
                </h2>
              <p>{t("home-banner.description")}</p>
              <Link to={`#${bannerButtonCategory}`} className="button-filled">
                {t("home-banner.button", { category: bannerButtonCategory })}
              </Link>
            </div>
          </div>
        ) : null}
        <div className="container home-container">
          {Object.entries(productsByCategory).map(([category, products], i) =>
            <section key={i} id={category} className="products-row" aria-label={category}>
              <ProductsListHeader title={category}>
                <Link to={`${routesBasePath}/see-all/${category}`} className="route-link see-all-link">{`${t("routes.see-all")}`}</Link>
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
    </ProductsListState>
  )
}
