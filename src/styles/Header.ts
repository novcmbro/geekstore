import styled from "styled-components"
import { StyledLogo } from "./Logo"

export const StyledHeader = styled.header<{ $isSearchBarOpen?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};

  nav {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.lg};
  }

  form {
    position: relative;
    max-width: 35vw;

    input,
    button {
      border-radius: 4rem;
    }

    input {
      background-color: ${({ theme }) => theme.colors.gray.light};
      padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.base}`};
      padding-right: ${({ theme }) => `calc(${theme.spacings.base} * 4)`};

      &::placeholder,
      &::-moz-placeholder,
      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colors.gray.medium};
        opacity: 1;
      }
    }
    
    button {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      padding: 0 ${({ theme }) => theme.spacings.sm};

      svg {
        fill: ${({ theme }) => theme.colors.gray.medium};
        vertical-align: middle;
      }
    }

    button:hover svg,
    button:focus-visible svg,
    input:focus-visible:not(:placeholder-shown) + button svg {
      fill: currentColor;
    }
  }

  a.nav-link {
    margin-left: auto;
  }

  button.search-bar-toggler {
    display: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    nav {
      gap: ${({ theme }) => `${theme.spacings.xs} 0`};
    }

    a.nav-link {
      font-size: ${({ theme }) => theme.font.size.sm}
    }

    button.search-bar-toggler {
      display: initial;
      padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.base}`};

      svg {
        display: block;
      }
    }

    ${({ theme, $isSearchBarOpen }) =>
      $isSearchBarOpen ? `
        nav {
          flex-direction: column;
          padding-top: ${theme.spacings.xs};
          padding-bottom: ${theme.spacings.xs};
        }
      
        form {
          max-width: none;
        }
    
        a.nav-link {
          display: none;
        }
      `
      : `
        nav {
          padding-right: 0;
        }

        ${StyledLogo} {
          margin-right: ${theme.spacings.base};
        }

        form {
          display: none;
        }
      `
    }
  }
`
