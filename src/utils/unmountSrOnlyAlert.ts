import { Dispatch, SetStateAction } from "react"

export const unmountSrOnlyAlert = (setState: Dispatch<SetStateAction<boolean>>) => {
  const unmountAlert = setTimeout(() => setState(false), 3000)
  
  return () => clearTimeout(unmountAlert)
}
