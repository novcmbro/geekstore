import styled from "styled-components"

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacings.base};
`
