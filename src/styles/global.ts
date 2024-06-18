import { createGlobalStyle } from "styled-components"
import { ResetStyles } from "./reset"

export const GlobalStyles = createGlobalStyle`
  ${ResetStyles}

  :root {
    background-color: ${({ theme }) => theme.colors.gray.light};
    color: ${({ theme }) => theme.colors.gray.dark};
    font-family: ${({ theme }) => theme.font.family};
    font-optical-sizing: auto;
    font-size: ${({ theme }) => theme.font.size.base};
    font-weight: ${({ theme }) => theme.font.weight.regular};
  }

  :focus-visible {
    outline: 0.15rem solid ${({ theme }) => theme.colors.blue.medium};
  }
  
  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.colors.blue.medium};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    text-decoration: none;
  }

  button,
  input,
  textarea {
    border: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
  }

  form,
  input,
  textarea {
    width: 100%;
  }

  .container {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacings.base};
  }

  .sr-only {
    border-width: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`
