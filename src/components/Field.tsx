import { useController } from "react-hook-form"
import { FieldProps } from "../types"

export const Field = ({ type, textarea, label, ...props }: FieldProps) => {
  const { field, fieldState } = useController(props)

  return (
    <div className="field-container">
      {(!textarea || type) ? (
        <input {...field} id={field.name} type={type || "text"} className="field" placeholder="" autoComplete="off" aria-autocomplete="none" aria-describedby="field-error-message" aria-invalid={fieldState.invalid} />
      ) : (
        <textarea {...field} id={field.name} cols={30} rows={4} className="field" placeholder="" autoComplete="off" aria-autocomplete="none" aria-describedby="field-error-message" aria-invalid={fieldState.invalid}></textarea>
      )}
      <label htmlFor={field.name} className="field-label">
        {label}
      </label>
      {fieldState.invalid ? (
        <p id="field-error-message" className="field-error-message" role="alert" aria-live="assertive">
          {fieldState.error?.message}
        </p>
      ) : null}
    </div>
  )
}
