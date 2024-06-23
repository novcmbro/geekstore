import { UseFormWatch } from "react-hook-form"
import { ProductToEdit } from "./Products"

export type ProductFormProps = {
  onSubmit: React.FormEventHandler
  control: any
  watch: UseFormWatch<ProductToEdit>
}
