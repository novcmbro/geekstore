import { useTranslation } from "react-i18next"
import { usePopup } from "../contexts"

export const Popup = () => {
  const { t } = useTranslation()
  const { type, message, okButton, cancelButton, isPopupOpen, closePopup } = usePopup()

  const handlePopupButtonAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id
    const isOkButton = buttonId === "ok"
    const isCancelButton = buttonId === "cancel"

    if (isOkButton && okButton?.action) {
      okButton.action()
    }

    if (isCancelButton && cancelButton?.action) {
      cancelButton.action()
    }

    closePopup()
  }

  return (
    isPopupOpen ? (
      <div className="container popup-container">
        <div className="popup">
          <h2 className="typography-title-lg">{t(`popup.${type}`)}</h2>
          <p>{message}</p>
          <div className="button-container">
            {okButton?.action ? (
              <button id="cancel" type="button" onClick={handlePopupButtonAction} className="button-outlined">
                {cancelButton?.text || t("popup.cancel")}
              </button>
            ) : null}
            <button id="ok" type="button" onClick={handlePopupButtonAction} className="button-filled">
              {okButton?.text || "OK"}
            </button>
          </div>
        </div>
      </div>
    ) : null
  )
}
