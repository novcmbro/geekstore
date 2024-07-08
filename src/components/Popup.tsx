import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { usePopup } from "../contexts"

export const Popup = () => {
  const { t } = useTranslation()
  const { type, message, okButton, cancelButton, isPopupOpen, closePopup } = usePopup()
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const popup = popupRef.current

    if (popup && isPopupOpen) {
      const focusableElements = popup.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
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

      popup.addEventListener("keydown", handleTabKeyPress)
      popup.addEventListener("keydown", handleEscapeKeyPress)

      return () => {
        popup.removeEventListener("keydown", handleTabKeyPress)
        popup.removeEventListener("keydown", handleEscapeKeyPress)
      }
    }
  }, [isPopupOpen])

  const handlePopupButtonAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id
    const isOkButton = buttonId === "ok"
    const isCancelButton = buttonId === "cancel"

    if (isOkButton && okButton?.action) {
      okButton.action()
    }

    if (isCancelButton && cancelButton && cancelButton?.action) {
      cancelButton.action()
    }

    closePopup()
  }

  return (
    isPopupOpen ? (
      <div ref={popupRef} className="container popup-container" role="dialog" aria-labelledby="popup-title" aria-describedby="popup-message" aria-modal="true" tabIndex={-1}>
        <div className="popup">
          <h2 id="popup-title" className="typography-title-md">
            {type !== "danger" ? t(`popup.${type}`) : t("popup.warning")}
          </h2>
          <p id="popup-message">{message}</p>
          <div className="button-container">
            {okButton?.action && cancelButton !== false ? (
              <button id="cancel" type="button" onClick={handlePopupButtonAction} className="button-outlined">
                {cancelButton?.text || t("popup.cancel")}
              </button>
            ) : null}
            <button id="ok" type="button" onClick={handlePopupButtonAction} className={classNames("button-filled", { "button-danger": type === "danger" })}>
              {okButton?.text || "OK"}
            </button>
          </div>
        </div>
      </div>
    ) : null
  )
}
