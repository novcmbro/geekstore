import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem, ProductsListState } from "../components/Products"

export const SeeAllProductsFromCategory = () => {
  const { category } = useParams<{ category: string }>()
  const { productsList } = useProducts()

  const [productsFromCategory, setProductsFromCategory] = useState([] as Product[])

  useEffect(() => {
    if (category && !!productsList.length) {
      const productsFromCategoryArray = [] as typeof productsFromCategory

      for (const product of productsList) {
        if (product.category === category) {
          productsFromCategoryArray.push(product)
        }
      }
      
      if (!!productsFromCategoryArray.length) {
        setProductsFromCategory(productsFromCategoryArray)
      }
    }
  }, [category, productsList])

  return (
    <>
      <ProductsListHeader title={category!} />
      <ProductsListState areProductsNotFound={!productsFromCategory.length}>
        <ProductsList>
          {productsFromCategory.map((product, i) =>
            <ProductsListItem key={i} product={product} />
          )}
        </ProductsList>
      </ProductsListState>
    </>
  )
}
