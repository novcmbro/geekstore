import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue } from "react-hook-form"
import { t } from "i18next"
import { PopupContextValue, ProductSearchValue } from "../types"

export const searchProductsOrShowErrorPopup = (
  data: ProductSearchValue,
  openPopup: PopupContextValue["openPopup"],
  navigate: NavigateFunction,
  setValue: UseFormSetValue<ProductSearchValue>
) => {
  const isSearchEmpty = !data.search.trim()

  if (isSearchEmpty) {
    openPopup({ type: "warning", message: t("search.empty") })
    return
  }

  navigate(`/search-products/${data.search}`)
  setValue("search", "")
}
