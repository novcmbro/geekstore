export type NavButton = {
  name?: string
  to?: string
  action?: () => void
}

export type NavLinks = Array<{
  route: string
  translation: string
}>
