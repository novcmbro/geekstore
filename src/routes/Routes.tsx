import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom"
import { App } from "../components"
import { Home } from "./Home"
import { DetailedProduct } from "./DetailedProduct"
import { Login } from "./Login"
import { Products } from "./Products"
import { NotFound } from "./NotFound"
import { AddProduct } from "./AddProduct"
import { EditProduct } from "./EditProduct"

const PrivateRoute = ({ Element }: { Element: RouteObject["element"] }) => {
  if (!localStorage.getItem("novcmbro_geekstore_auth")) {
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
        path: "login",
        element: !localStorage.getItem("novcmbro_geekstore_auth") ? <Login /> : <Navigate to="/products" />
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
