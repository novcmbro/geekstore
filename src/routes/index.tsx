import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { localLogin } from "../firebase"
import { App } from "../components"
import { Login } from "./Login"
import { Products } from "./Products"
import { NotFound } from "./NotFound"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: !localLogin.isAdminLogged ? <Login /> : <Navigate to="/" />
      },
      {
        path: "products",
        element: localLogin.isAdminLogged ? <Products /> : <Navigate to="/" />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={routes} />
