import { Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { GlobalStyles, theme } from "../styles"
import { Header } from "./Header"
import "../i18n"

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}
