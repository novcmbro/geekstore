import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { App } from "../components"
import { Login } from "./Login"
import { NotFound } from "./NotFound"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={routes} />
