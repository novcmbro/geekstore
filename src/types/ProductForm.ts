import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Product } from "./Products"

export type ProductFormProps = {
  onSubmit: React.FormEventHandler
  control: any
  watch: UseFormWatch<ProductFormValues>
  setValue: UseFormSetValue<ProductFormValues>
}

export type ProductFormValues = Omit<Product, "docId" | "id">
