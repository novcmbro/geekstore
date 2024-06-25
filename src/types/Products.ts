export interface Product {
  docId?: string
  id: number
  image: string
  category: string
  name: string
  price: number
  description?: string
}

export type ProductToEdit = Omit<Product, "docId" | "id">

export type ProductsContextValue = {
  isLoading: boolean
  productsList: Product[] | []
  editProduct: (currentProduct: Product, newData: ProductToEdit) => void
  deleteProduct: (docId: Product["docId"], name: Product["name"]) => void
}
