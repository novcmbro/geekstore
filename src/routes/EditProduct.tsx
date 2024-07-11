import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductForm, ProductsListState } from "../components/Products"

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { initialProductFormValues, productsList, editProduct } = useProducts()
  const { handleSubmit, control, watch, setValue } = useForm({ defaultValues: initialProductFormValues, mode: "onBlur" })

  const [productToEdit, setProductToEdit] = useState({} as Product)

  useEffect(() => {
    if (id && !!productsList.length) {
      for (const product of productsList) {
        if (product.id === parseInt(id)) {
          const { docId, id, ...productData } = product
          setProductToEdit(product)

          for (const [key, value] of Object.entries(productData)) {
            setValue(key as keyof typeof initialProductFormValues, value)
          }
          break
        }
      }
    }
  }, [id, productsList, setValue])
  
  return (
    <ProductsListState isProductNotFound={!Object.keys(productToEdit).length}>
      <ProductForm onSubmit={handleSubmit((data) => editProduct(productToEdit, data))} control={control} watch={watch} setValue={setValue} />
    </ProductsListState>
  )
}
