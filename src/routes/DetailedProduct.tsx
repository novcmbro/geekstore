import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem } from "../components/Products"
import { NotFound } from "./NotFound"
import "../styles/detailed-product.css"

export const DetailedProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()

  const [detailedProduct, setDetailedProduct] = useState({} as Product)
  const [similarProducts, setSimilarProducts] = useState([] as Product[])
  const [productNotFound, setProductNotFound] = useState<boolean>(true)

  useEffect(() => {
    if (id && !!productsList.length) {
      const similarProductsArray = []
      const maxLengthForSimilarProducts = 6
      const isSimilarProductsNotFull = similarProductsArray.length < maxLengthForSimilarProducts

      for (const product of productsList) {
        if (product.id === parseInt(id)) {
          setDetailedProduct(product)
          setProductNotFound(false)
        } else if (isSimilarProductsNotFull && product.category === detailedProduct.category) {
          similarProductsArray.push(product)
        }
      }

      if (isSimilarProductsNotFull && detailedProduct.category) {
        for (const product of productsList) {
          if (similarProductsArray.length >= maxLengthForSimilarProducts) {
            break
          } else if (product.category !== detailedProduct.category) {
            similarProductsArray.push(product)
          }
        }
      }

      if (!!similarProductsArray.length) {
        setSimilarProducts(similarProductsArray)
      }
    }
  }, [id, productsList, detailedProduct])

  return (
    isLoading ? (
      <p className="product-alert-message container">{t("products.loading")}</p>
    ) : (
      productNotFound ? (
        <NotFound />
      ) : (
        <>
          <section className="product-details" aria-label={detailedProduct.name}>
            <img src={detailedProduct.image} alt={detailedProduct.name} className="product-details-image" role="img" loading="lazy" />
            <div className="product-details-info">
              <h2 className="typography-title-lg">{detailedProduct.name}</h2>
              <span className="product-price">{detailedProduct.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
              <p>{detailedProduct.description}</p>
            </div>
          </section>
          {!!similarProducts.length ? (
            <section className="products-row" aria-label={t("products.similar-products")}>
              <ProductsListHeader title={t("products.similar-products")} />
              <ProductsList aria-label={t("products.similar-products")}>
                {similarProducts.map((product, i) =>
                  <ProductsListItem key={i} product={product} />
                )}
              </ProductsList>
            </section>
          ) : null}
        </>
      )
    )
  )
}
