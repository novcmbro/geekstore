export type RoutesNames = "Home" | "ProductDetails" | "SeeAll" | "SearchProducts" | "Login" | "AdminMenu" | "AddProduct" | "EditProduct"

export type UseRoute = {
  [K in RoutesNames as `is${Capitalize<K>}Route`]: boolean
}
