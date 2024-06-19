import styled from "styled-components"

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacings.md} ${theme.spacings.base}`};
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacings.base};
  }
`
