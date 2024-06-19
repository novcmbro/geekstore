import styled from "styled-components"
import { StyledContainer } from "./Container"
import { StyledLogo } from "./Logo"
import { StyledLink } from "./Link"

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.blue.transparent};
  font-weight: ${({ theme }) => theme.font.weight.medium};

  ${StyledContainer}:has(nav) {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => `${theme.spacings.base} ${theme.spacings.xl}`};

    nav {
      display: flex;
      justify-content: space-between;
      gap: ${({ theme }) => `0 ${theme.spacings.xl}`};
      width: 100%;

      ul {
        margin: 0 auto;

        li:not(:first-of-type) {
          margin-top: ${({ theme }) => theme.spacings.md};
        }

        ${StyledLink} {
          font-weight: inherit;
          
          &:not(:hover, :focus-visible) {
            color: inherit;
          }
        }
      }
    }
  }
  
  div.credits {
    background-color: ${({ theme }) => theme.colors.white};
    text-align: center;

    span.year {
      display: block;
      margin-top: ${({ theme }) => theme.spacings.xs};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${StyledContainer}:has(nav) {
      flex-direction: column;

      nav {
        align-self: center;
        text-align: center;
        width: fit-content;
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    nav {
      flex-direction: column;

      ${StyledLogo} {
        margin-bottom: ${({ theme }) => theme.spacings.xs};
      }

      ul {
        margin: 0 !important;
      }
    }
  }
`
