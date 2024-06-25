import { UseFormWatch } from "react-hook-form"
import { Product } from "./Products"

export type ProductFormProps = {
  onSubmit: React.FormEventHandler
  control: any
  watch: UseFormWatch<ProductFormValues>
}

export type ProductFormValues = Omit<Product, "docId" | "id">
