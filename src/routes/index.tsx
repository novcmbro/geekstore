import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { localLogin } from "../firebase"
import { App } from "../components"
import { Login } from "./Login"
import { Products } from "./Products"
import { NotFound } from "./NotFound"
import { EditProduct } from "./EditProduct"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: !localLogin.isAdminLogged ? <Login /> : <Navigate to="/products" />
      },
      {
        path: "products",
        element: localLogin.isAdminLogged ? <Products /> : <Navigate to="/" />
      },
      {
        path: "edit-product/:id",
        element: localLogin.isAdminLogged ? <EditProduct /> : <Navigate to="/" />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={routes} />
