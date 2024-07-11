import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"
import { localStorageAuthKey } from "../utils"
import { App } from "../components"
import { Home } from "./Home"
import { DetailedProduct } from "./DetailedProduct"
import { SeeAllProductsFromCategory } from "./SeeAllProductsFromCategory"
import { SearchedProducts } from "./SearchedProducts"
import { Login } from "./Login"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"
import { EditProduct } from "./EditProduct"
import { NotFound } from "./NotFound"

const PrivateRoute = ({ Element }: { Element: RouteObject["element"] }) => {
  if (!localStorage.getItem(localStorageAuthKey)) {
    return <Navigate to="/login" />
  }
  return Element
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "product/:id",
        element: <DetailedProduct />
      },
      {
        path: "see-all/:category",
        element: <SeeAllProductsFromCategory />
      },
      {
        path: "search-products/:search",
        element: <SearchedProducts />
      },
      {
        path: "login",
        element: !localStorage.getItem(localStorageAuthKey) ? <Login /> : <Navigate to="/products" />
      },
      {
        path: "products",
        element: <PrivateRoute Element={<Products />} />
      },
      {
        path: "add-product",
        element: <PrivateRoute Element={<AddProduct />} />
      },
      {
        path: "edit-product/:id",
        element: <PrivateRoute Element={<EditProduct />} />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={routes} />
