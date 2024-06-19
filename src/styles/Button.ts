import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledButton = styled.button<{ $variant?: "outlined" | "filled", $fullWidth?: boolean }>`
  border: none;
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  
  ${(props) => props.as === Link ? `
    text-align: center;
    text-decoration: none;
  ` : null}
  
  ${({ theme, $variant, $fullWidth }) =>
    $variant ? `
      width: 100%;
      ${$fullWidth ? "" : "max-width: 12rem;"}
      padding: ${theme.spacings.base};

      ${$variant === "outlined" ? `
        color: ${theme.colors.blue.medium};

        &:not(:focus-visible) {
          outline: 0.1rem solid currentColor;
          outline-offset: -0.1rem;
        }
      
        &:hover {
          background-color: ${theme.colors.blue.transparent};
        }
      `

      : $variant === "filled" ? `
        background-color: ${theme.colors.blue.medium};
        color: ${theme.colors.white};
        font-weight: ${theme.font.weight.semibold};

        &:hover {
          background-color: ${theme.colors.blue.light};
        }
      `
      : null}
    `
    : null
  }
`
