import { UseControllerProps } from "react-hook-form"

export type FieldProps = {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
  textarea?: boolean
  label: string
  price?: boolean
} & UseControllerProps<any>
