export const unmountSrOnlyAlert = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const unmountAlert = setTimeout(() => setState(false), 3000)
  
  return () => clearTimeout(unmountAlert)
}
