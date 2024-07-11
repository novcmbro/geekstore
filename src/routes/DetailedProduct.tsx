import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem, ProductsListState } from "../components/Products"
import "../styles/detailed-product.css"

export const DetailedProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { productsList } = useProducts()

  const [detailedProduct, setDetailedProduct] = useState({} as Product)
  const [similarProducts, setSimilarProducts] = useState([] as Product[])

  useEffect(() => {
    if (id && !!productsList.length) {
      const similarProductsArray = []
      const maxLengthForSimilarProducts = 6
      const isSimilarProductsNotFull = similarProductsArray.length < maxLengthForSimilarProducts

      for (const product of productsList) {
        if (product.id === parseInt(id)) {
          setDetailedProduct(product)
        } else if (isSimilarProductsNotFull && product.category === detailedProduct.category) {
          similarProductsArray.push(product)
        }
      }

      if (isSimilarProductsNotFull) {
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
    <>
      <ProductsListState isProductNotFound={!Object.keys(detailedProduct).length}>
        <section className="product-details" aria-label={detailedProduct.name}>
          <img src={detailedProduct.image} alt={detailedProduct.name} className="product-details-image" role="img" loading="lazy" />
          <div className="product-details-info">
            <h2 className="typography-title-lg">{detailedProduct.name}</h2>
            <span className="product-price">{detailedProduct.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
            <p>{detailedProduct.description}</p>
          </div>
        </section>
      </ProductsListState>
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
}
