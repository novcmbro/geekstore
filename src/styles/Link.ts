import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledLink = styled.a`
  color: ${({ theme, ...props }) => props.as === Link ? theme.colors.blue.medium : "inherit"};
  font-weight: ${({ theme, ...props }) => props.as === Link ? theme.font.weight.bold : theme.font.weight.semibold};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: ${({ theme, ...props }) => props.as === Link ? theme.colors.blue.light : theme.colors.blue.medium};
  }
`
