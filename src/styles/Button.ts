import styled from "styled-components"

export const StyledButton = styled.button<{ $outlined?: boolean, $fullWidth?: boolean}>`
  background-color: ${({ theme, $outlined }) => $outlined ? "transparent" : theme.colors.blue.medium};
  color: ${({ theme, $outlined }) => $outlined ? theme.colors.blue.medium : theme.colors.white};
  font-weight: ${({ theme, $outlined }) => $outlined ? theme.font.weight.regular : theme.font.weight.semibold};
  text-align: center;
  width: 100%;
  ${({ $fullWidth }) => $fullWidth ? null : "max-width: 12rem;"}
  padding: ${({ theme }) => theme.spacings.base};

  &:hover {
    background-color: ${({ theme, $outlined }) => $outlined ? theme.colors.blue.transparent : theme.colors.blue.light}
  }

  ${({ $outlined }) => $outlined ? `
    &:not(:focus) {
      outline: 0.1rem solid currentColor;
      outline-offset: -0.1rem;
    }
  ` : null}
`
