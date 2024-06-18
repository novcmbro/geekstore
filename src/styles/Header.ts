import styled from "styled-components"
import { StyledLogo } from "./Logo"

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};

  .container {
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

  a.nav-button {
    margin-left: auto;
  }

  button.toggle-search-bar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .container {
      gap: ${({ theme }) => `${theme.spacings.xs} 0`};

      &:not(.search-bar-open) {
        padding-right: 0;
  
        form {
          display: none;
        }
      }

      &.search-bar-open {
        flex-direction: column;
        padding-top: ${({ theme }) => theme.spacings.xs};
        padding-bottom: ${({ theme }) => theme.spacings.xs};
    
        form {
          max-width: none;
        }
    
        a.nav-button {
          display: none;
        }
      }
    }

    ${StyledLogo} {
      margin-right: ${({ theme }) => theme.spacings.base};
    }

    button.toggle-search-bar {
      display: initial;
      padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.base}`};

      svg {
        display: block;
      }
    }
  }
`
