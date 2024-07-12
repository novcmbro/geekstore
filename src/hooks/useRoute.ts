import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { routesBasePath } from "../utils"
import { routes } from "../routes"
import { UseRoute } from "../types"

export const useRoute = () => {
  const { pathname } = useLocation()
  const baseRouteChildrenRoutes = routes.routes[0].children
  const [isRoute, setIsRoute] = useState({} as UseRoute)
  
  useEffect(() => {
    if (pathname && baseRouteChildrenRoutes) {
      let routes = { ...isRoute }
      routes.isHomeRoute = pathname === routesBasePath || pathname === `${routesBasePath}/`
      
      for (const { id, path } of baseRouteChildrenRoutes) {
        if (id && path && path !== "*") {
          const pathWithoutParams = `${routesBasePath}/${path.split("/")[0]}`

          routes[`is${id}Route` as keyof typeof isRoute] = pathname.includes(pathWithoutParams)
        }
      }

      setIsRoute(routes)
    }
  }, [pathname, baseRouteChildrenRoutes])

  return isRoute
}
