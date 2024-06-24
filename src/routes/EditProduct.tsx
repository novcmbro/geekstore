import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { Product, ProductToEdit } from "../types"
import { ProductForm } from "../components"

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { isLoading, productsList, editProduct } = useProducts()

  const [productDocId, setProductDocId] = useState<Product["docId"]>("")

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

  useEffect(() => {
    if (productsList.length > 0) {
      for (const product of productsList) {
        if (product.id === parseInt(id!)) {
          const { docId, id, ...productData } = product
          setProductDocId(docId)

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
      <ProductForm onSubmit={handleSubmit((data) => editProduct(productDocId, data))} control={control} watch={watch} />
    )
  )
}
