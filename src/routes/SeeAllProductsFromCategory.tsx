import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem } from "../components/Products"
import { NotFound } from "./NotFound"

export const SeeAllProductsFromCategory = () => {
  const { category } = useParams<{ category: string }>()
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()

  const [productsFromCategory, setProductsFromCategory] = useState([] as Product[])

  useEffect(() => {
    if (category && !!productsList.length) {
      const productsFromCategoryArray = []

      for (const product of productsList) {
        if (product.category.toLowerCase().replace(" ", "-") === category) {
          productsFromCategoryArray.push(product)
        }
      }

      if (!!productsFromCategoryArray.length) {
        setProductsFromCategory(productsFromCategoryArray)
      }
    }
  }, [category, productsList])

  return (
    isLoading ? (
      <p className="product-alert-message">{t("products.loading")}</p>
    ) : (
      !!!productsFromCategory.length ? (
        <NotFound />
      ) : (
        <>
          <ProductsListHeader title={productsFromCategory[0].category} />
          <ProductsList>
            {productsFromCategory.map((product, i) =>
              <ProductsListItem key={i} product={product} />
            )}
          </ProductsList>
        </>
      )
    )
  )
}
