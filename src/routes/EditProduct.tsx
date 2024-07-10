import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { Product } from "../types"
import { ProductForm } from "../components"
import { NotFound } from "./NotFound"

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { initialProductFormValues, isLoading, productsList, editProduct } = useProducts()
  const { handleSubmit, control, watch, setValue } = useForm({ defaultValues: initialProductFormValues, mode: "onBlur" })

  const [productToEdit, setProductToEdit] = useState({} as Product)
  const [productNotFound, setProductNotFound] = useState<boolean>(true)

  useEffect(() => {
    if (id && !!productsList.length) {
      for (const product of productsList) {
        if (product.id === parseInt(id)) {
          const { docId, id, ...productData } = product
          setProductToEdit(product)

          for (const [key, value] of Object.entries(productData)) {
            setValue(key as keyof typeof initialProductFormValues, value)
          }

          setProductNotFound(false)
          break
        }
      }
    }
  }, [id, productsList, setValue])
  
  return (
    isLoading ? (
      <p className="product-alert-message">{t("products.loading")}</p>
    ) : (
      productNotFound ? (
        <NotFound />
      ) : (
        <ProductForm onSubmit={handleSubmit((data) => editProduct(productToEdit, data))} control={control} watch={watch} setValue={setValue} />
      )
    )
  )
}
