import { useTranslation } from "react-i18next"
import classNames from "classnames"
import { usePopup } from "../contexts"

export const Popup = () => {
  const { t } = useTranslation()
  const { type, message, okButton, cancelButton, popupRef, isPopupOpen, closePopup } = usePopup()

  const runPopupButtonActionAndClose = (popupButton: typeof okButton | typeof cancelButton) => {
    if (popupButton && popupButton.action) {
      popupButton.action()
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
              <button type="button" onClick={() => runPopupButtonActionAndClose(cancelButton)} className="button-outlined">
                {cancelButton?.text || t("popup.cancel")}
              </button>
            ) : null}
            <button type="button" onClick={() => runPopupButtonActionAndClose(okButton)} className={classNames("button-filled", { "button-danger": type === "danger" })}>
              {okButton?.text || "OK"}
            </button>
          </div>
        </div>
      </div>
    ) : null
  )
}
