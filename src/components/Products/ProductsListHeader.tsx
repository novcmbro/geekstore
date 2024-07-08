import { ProductListHeaderProps } from "../../types"

export const ProductsListHeader = ({ title, children }: ProductListHeaderProps) => {
  return (
    <div className="products-list-header">
      <h2 className="typography-title-md">{title}</h2>
      {children}
    </div>
  )
}
