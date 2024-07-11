import { ProductsListProps } from "../../types"

export const ProductsList = (props: ProductsListProps) => {
  return (
    <ol className="products-list" {...props} />
  )
}
