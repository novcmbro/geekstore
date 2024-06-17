import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { App } from "../components"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: "Route not found"
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={routes} />
