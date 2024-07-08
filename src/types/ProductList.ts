import { Product } from "./Products"

export type ProductListItemProps = {
  product: Product
  isAdminMenu?: boolean
}

export type ProductListHeaderProps = {
  title: string
  children?: React.ReactElement | null
}
