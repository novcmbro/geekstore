const localStorageLoginKey = "novcmbro_geekstore_login"

export const localLogin = {
  login: () => localStorage.setItem(localStorageLoginKey, "true"),
  logout: () => localStorage.removeItem(localStorageLoginKey),
  isAdminLogged: !!localStorage.getItem(localStorageLoginKey)
}
