import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useProducts } from "../contexts"
import { Product, ProductSearchValue } from "../types"
import { ProductsList, ProductsListHeader, ProductsListItem, ProductsListState } from "../components/Products"

export const SearchedProducts = () => {
  const { search } = useParams<ProductSearchValue>()
  const { t } = useTranslation()
  const { productsList } = useProducts()

  const [searchResults, setSearchResults] = useState([] as Product[])

  useEffect(() => {
    if (search && !!productsList.length) {
      const searchResultsArray = [] as typeof searchResults
      const productKeysToIgnoreOnSearch: (keyof typeof searchResults[number])[] = ["docId", "image"]
      
      for (const product of productsList) {
        for (const [productKey, productValue] of Object.entries(product)) {
          const hasSearchResults = productValue.toString().toLowerCase().includes(search.toLowerCase())

          if (!productKeysToIgnoreOnSearch.includes(productKey as typeof productKeysToIgnoreOnSearch[number]) && hasSearchResults && !searchResultsArray.includes(product)) {
            searchResultsArray.push(product)
          }
        }
      }

      setSearchResults(!!searchResultsArray.length ? searchResultsArray : [])
    }
  }, [search, productsList])

  return (
    <>
      <ProductsListHeader title={t("search.results", { search: search })} />
      <ProductsListState areProductsNotFound={!searchResults.length}>
        <ProductsList aria-label={t("search.results", { search: search })}>
          {searchResults.map((product, i) =>
            <ProductsListItem key={i} product={product} />
          )}
        </ProductsList>
      </ProductsListState>
    </>
  )
}
