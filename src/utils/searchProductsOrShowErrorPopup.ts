import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue } from "react-hook-form"
import { t } from "i18next"
import { PopupContextValue, ProductSearchValue } from "../types"
import { routesBasePath } from "./routesBasePath"

export const searchProductsOrShowErrorPopup = (
  data: ProductSearchValue,
  openPopup: PopupContextValue["openPopup"],
  navigate: NavigateFunction,
  setValue: UseFormSetValue<ProductSearchValue>,
  isSearchBarOpen: boolean,
  setIsSearchBarOpen: React.Dispatch<React.SetStateAction<typeof isSearchBarOpen>>
) => {
  const isSearchEmpty = !data.search.trim()

  if (isSearchEmpty) {
    openPopup({ type: "warning", message: t("search.empty") })
    return
  }

  if (isSearchBarOpen) {
    setIsSearchBarOpen(false)
  }

  navigate(`${routesBasePath}/search-products/${data.search}`)
  setValue("search", "")
}
