import { UseFormSetValue, UseFormWatch } from "react-hook-form"

export interface Product {
  docId?: string
  id: number
  image: string
  category: string
  name: string
  price: number
  description?: string
}

export type ProductsByCategory = {
  [category: string]: Omit<Product, "docId">[]
}

export type ProductsContextValue = {
  initialProductFormValues: ProductFormValues
  isLoading: boolean
  productsList: Product[]
  addProduct: (product: ProductFormValues) => void
  editProduct: (currentProduct: Product, newProduct: ProductFormValues) => void
  deleteProduct: (productDocId: Product["docId"], productName: Product["name"]) => void
  restoreDefaultProducts: () => void
}

export type ProductsListStateProps = {
  isProductNotFound?: boolean
  areProductsNotFound?: boolean
  children: React.ReactElement
}

export type ProductsListProps = React.OlHTMLAttributes<HTMLOListElement>

export type ProductsListHeaderProps = {
  title: string
  children?: React.ReactElement | null
}

export type ProductsListItemProps = { product: Product }

export type ProductFormProps = {
  onSubmit: React.FormEventHandler
  control: any
  watch: UseFormWatch<ProductFormValues>
  setValue: UseFormSetValue<ProductFormValues>
}

export type ProductFormValues = Omit<Product, "docId" | "id">

export type ProductSearchValue = {
  search: string
}
