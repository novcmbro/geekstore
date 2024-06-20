import { UseControllerProps } from "react-hook-form"

export type FieldProps = {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
  textarea?: boolean
  label: string
} & UseControllerProps<any>
