import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"
import { localStorageAuthKey, routesBasePath } from "../utils"
import { App } from "../components"
import { Home } from "./Home"
import { DetailedProduct } from "./DetailedProduct"
import { SeeAllProductsFromCategory } from "./SeeAllProductsFromCategory"
import { SearchedProducts } from "./SearchedProducts"
import { Login } from "./Login"
import { AdminMenu } from "./AdminMenu"
import { AddProduct } from "./AddProduct"
import { EditProduct } from "./EditProduct"
import { NotFound } from "./NotFound"

const PrivateRoute = ({ Element }: { Element: RouteObject["element"] }) => {
  if (!localStorage.getItem(localStorageAuthKey)) {
    return <Navigate to={`${routesBasePath}/login`} />
  }
  return Element
}

export const routes = createBrowserRouter([
  {
    path: routesBasePath,
    element: <App />,
    children: [
      {
        id: "Home",
        index: true,
        element: <Home />,
      },
      {
        id: "ProductDetails",
        path: "product/:id",
        element: <DetailedProduct />
      },
      {
        id: "SeeAll",
        path: "see-all/:category",
        element: <SeeAllProductsFromCategory />
      },
      {
        id: "SearchProducts",
        path: "search-products/:search",
        element: <SearchedProducts />
      },
      {
        id: "Login",
        path: "login",
        element: !localStorage.getItem(localStorageAuthKey) ? <Login /> : <Navigate to={`${routesBasePath}/admin-menu`} />
      },
      {
        id: "AdminMenu",
        path: "admin-menu",
        element: <PrivateRoute Element={<AdminMenu />} />
      },
      {
        id: "AddProduct",
        path: "add-product",
        element: <PrivateRoute Element={<AddProduct />} />
      },
      {
        id: "EditProduct",
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
