import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Popup, PopupContextValue } from "../types"

const PopupContext = createContext({} as PopupContextValue)

export const PopupProvider = ({ children }: { children: React.ReactElement }) => {
  const [popup, setPopup] = useState({} as Popup)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const popupRef = useRef(null) as PopupContextValue["popupRef"]
  
  const openPopup = (props: Popup) => {
    setPopup(props)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setPopup({} as typeof popup)
  }

  useEffect(() => {
    const popupElement = popupRef.current

    if (popupElement && isPopupOpen) {
      const focusableElements = popupElement.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]
      firstFocusableElement.focus()

      const handleTabKeyPress = (e: KeyboardEvent) => {
        const isTabPressed = (e.key === "Tab" || e.keyCode === 9)

        if (!isTabPressed) {
          return
        }
        
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault()
          lastFocusableElement.focus()
        }

        else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }

      const handleEscapeKeyPress = (e: KeyboardEvent) => {
        const isEscapePressed = (e.key === "Escape" || e.keyCode === 27)

        if (!isEscapePressed) {
          return
        }

        closePopup()
      }

      popupElement.addEventListener("keydown", handleTabKeyPress)
      popupElement.addEventListener("keydown", handleEscapeKeyPress)

      return () => {
        popupElement.removeEventListener("keydown", handleTabKeyPress)
        popupElement.removeEventListener("keydown", handleEscapeKeyPress)
      }
    }
  }, [isPopupOpen])

  return (
    <PopupContext.Provider value={{ ...popup, popupRef, isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
