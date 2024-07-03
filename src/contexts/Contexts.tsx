import { PopupProvider } from "./Popup"
import { ProductsProvider } from "./Products"

export const Contexts = ({ children }: { children: React.ReactElement }) => {
  return (
    <PopupProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </PopupProvider>
  )
}
