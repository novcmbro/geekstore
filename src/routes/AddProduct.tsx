import { useForm } from "react-hook-form"
import { useProducts } from "../contexts"
import { ProductForm } from "../components"

export const AddProduct = () => {
  const { initialProductFormValues, addProduct } = useProducts()
  const { handleSubmit, control, watch, setValue } = useForm({ defaultValues: initialProductFormValues, mode: "onBlur" })

  return (
    <ProductForm onSubmit={handleSubmit(addProduct)} control={control} watch={watch} setValue={setValue} />
  )
}
