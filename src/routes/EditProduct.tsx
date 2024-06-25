import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { Product, ProductToEdit } from "../types"
import { ProductForm } from "../components"
import { NotFound } from "./NotFound"

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { isLoading, productsList, editProduct } = useProducts()

  const { handleSubmit, control, watch, setValue } = useForm<ProductToEdit>({
    defaultValues: {
      image: "",
      category: "",
      name: "",
      price: 0,
      description: ""
    },
    mode: "onBlur"
  })

  const [productToEdit, setProductToEdit] = useState({} as Product)

  useEffect(() => {
    if (productsList.length > 0) {
      for (const product of productsList) {
        if (product.id === parseInt(id!)) {
          const { docId, id, ...productData } = product
          setProductToEdit(product)

          for (const [key, value] of Object.entries(productData)) {
            setValue(key as keyof ProductToEdit, value)
          }
          break
        }
      }
    }
  }, [productsList, setValue])

  return (
    isLoading ? (
      <p className="product-alert-message">{t("products.loading")}</p>
    ) : (
      productToEdit.id ? (
        <ProductForm onSubmit={handleSubmit((data) => editProduct(productToEdit, data))} control={control} watch={watch} />
      ) : (
        <NotFound />
      )
    )
  )
}
