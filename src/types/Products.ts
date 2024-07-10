import { ProductFormValues } from "./ProductForm"

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
