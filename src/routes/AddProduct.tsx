import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { ProductFormValues } from "../types"
import { ProductForm } from "../components"

export const AddProduct = () => {
  const { addProduct } = useProducts()
  
  const { handleSubmit, control, watch } = useForm<ProductFormValues>({
    defaultValues: {
      image: "",
      category: "",
      name: "",
      price: 0,
      description: ""
    },
    mode: "onBlur"
  })

  return (
    <ProductForm onSubmit={handleSubmit(addProduct)} control={control} watch={watch} />
  )
}
