import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ProductFormProps } from "../types"
import { Field } from "./Field"
import DefaultImage from "../img/default-image.svg"
import "../styles/product-form.css"

export const ProductForm = ({ onSubmit, control, watch }: ProductFormProps) => {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const title = t(`routes.${pathname.includes("add") ? "add" : "edit"}-product`)

  return (
    <form onSubmit={onSubmit} className="product-form" aria-labelledby="product-form-title">
      <h2 id="product-form-title" className="typography-title-lg">{title}</h2>
      <img src={watch("image")} alt={watch("name")} onError={e => e.currentTarget.src = DefaultImage} className="product-image-preview" role="img" />
      <Field
        control={control}
        name="image"
        type="url"
        rules={{
          required: t("form-errors.required", { name: t("products.form.image-url") }),
          pattern: {
            value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#= ]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//= ]*)/,
            message: t("form-errors.pattern", { name: t("products.form.image-url") })
          }
        }}
        label={t("products.form.image-url")}
      />
      <Field
        control={control}
        name="category"
        rules={{
          required: t("form-errors.required", { name: t("products.form.category") }),
          pattern: {
            value: /^[a-zA-ZÀ-ÿ-'\s\d]+$/,
            message: t("products.form.category-error")
          },
          minLength: {
            value: 3,
            message: t("form-errors.too-short", { name: t("products.form.category"), charNumber: 3 })
          },
          maxLength: {
            value: 30,
            message: t("form-errors.too-long", { name: t("products.form.category"), charNumber: 30 })
          }
        }}
        label={t("products.form.category")}
      />
      <Field
        control={control}
        name="name"
        rules={{
          required: t("form-errors.required", { name: t("products.form.name") }),
          minLength: {
            value: 3,
            message: t("form-errors.too-short", { name: t("products.form.name"), charNumber: 3 })
          },
          maxLength: {
            value: 120,
            message: t("form-errors.too-long", { name: t("products.form.name"), charNumber: 120 })
          }
        }}
        label={t("products.form.name")}
      />
      <Field
        control={control}
        name="price"
        rules={{
          required: t("form-errors.required", { name: t("products.form.price") }),
          validate: {
            hasPrice: (value) => parseInt(value) !== 0 || t("products.form.price-error")
          }
        }}
        label={t("products.form.price")}
      />
      <Field
        control={control}
        name="description"
        label={t("products.form.description")}
        textarea
      />
      <button type="submit" className="button-filled button-full-width">{title}</button>
    </form>
  )
}