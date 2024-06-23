import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { ProductToEdit } from "../types"
import { ProductForm } from "../components"

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { isLoading, productsList } = useProducts()
  
  const { handleSubmit, control, watch, setValue } = useForm<ProductToEdit>({
    defaultValues: {
      image: "",
      name: "",
      category: "",
      price: 0,
      description: ""
    },
    mode: "onBlur"
  })

  useEffect(() => {
    if (productsList.length > 0 && id) {
      for (const product of productsList) {
        if (product.id === parseInt(id)) {
          for (const [key, value] of Object.entries(product)) {
            setValue(key as keyof ProductToEdit, value)
          }
        }
      }
    }
  }, [id, productsList])

  return (
    isLoading ? (
      <p className="product-alert-message">{t("products.loading")}</p>
    ) : (
      <ProductForm onSubmit={handleSubmit(data => console.log(data))} control={control} watch={watch} />
    )
  )
}
