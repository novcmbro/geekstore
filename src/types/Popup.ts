type PopupButtonProps = {
  action?: () => void
  text?: string
}

export type Popup = {
  type: "success" | "error" | "warning" | "danger"
  message: string
  okButton?: PopupButtonProps
  cancelButton?: PopupButtonProps | false
}

export type PopupContextValue = Popup & {
  popupRef: React.RefObject<HTMLDivElement>
  isPopupOpen: boolean
  openPopup: ({ type, message, okButton, cancelButton }: Popup) => void
  closePopup: () => void
}
