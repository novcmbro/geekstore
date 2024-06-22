export interface Product {
  docId?: string
  id: number
  image?: string
  category: string
  name: string
  price: number
  description?: string
}

export type ProductsContextValue = {
  isLoading: boolean
  productsList: Product[] | []
  deleteProduct: (docId: Product["docId"]) => void
}
