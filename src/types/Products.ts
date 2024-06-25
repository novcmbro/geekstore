export interface Product {
  docId?: string
  id: number
  image: string
  category: string
  name: string
  price: number
  description?: string
}

export type ProductFormValues = Omit<Product, "docId" | "id">

export type ProductsContextValue = {
  isLoading: boolean
  productsList: Product[] | []
  addProduct: (data: ProductFormValues) => void
  editProduct: (currentProduct: Product, newData: ProductFormValues) => void
  deleteProduct: (docId: Product["docId"], name: Product["name"]) => void
}
