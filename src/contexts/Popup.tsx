import { createContext, useContext, useState } from "react"
import { Popup, PopupContextValue } from "../types"

const PopupContext = createContext<PopupContextValue>({
  type: "success",
  message: "",
  isPopupOpen: false,
  openPopup: function (): void {
    throw new Error("Function not implemented.")
  },
  closePopup: function (): void {
    throw new Error("Function not implemented.")
  }
})

export const PopupProvider = ({ children }: { children: React.ReactElement }) => {
  const initialPopup: Popup = { type: "success", message: "" }
  const [popup, setPopup] = useState(initialPopup)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  
  const openPopup = (props: Popup) => {
    setPopup(props)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setPopup(initialPopup)
  }

  return (
    <PopupContext.Provider value={{ ...popup, isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
