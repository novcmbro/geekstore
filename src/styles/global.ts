import { createGlobalStyle } from "styled-components"

/* http://meyerweb.com/eric/tools/css/reset/ 
 v2.0 | 20110126
 License: none (public domain)
*/
const ResetStyles = `
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  body {
    line-height: 1;
  }
  
  ol, ul {
    list-style: none;
  }
  
  blockquote, q {
    quotes: none;
  }
  
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

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
