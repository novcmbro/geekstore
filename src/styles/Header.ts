import styled from "styled-components"

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => `${theme.spacings.xs} ${theme.spacings.md}`};
  }

  form {
    position: relative;
    max-width: 40vw;
    margin-right: auto;
  }

  form input,
  form button {
    border-radius: 4rem;
  }
  
  form input {
    background-color: ${({ theme }) => theme.colors.gray.light};
    padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.base}`};
    padding-right: ${({ theme }) => `calc(${theme.spacings.base} * 4)`};
  }

  form input::placeholder,
  form input::-moz-placeholder,
  form input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray.medium};
    opacity: 1;
  }

  form button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 ${({ theme }) => theme.spacings.base};
  }

  form button svg {
    fill: ${({ theme }) => theme.colors.gray.medium};
    vertical-align: middle;
  }

  form button:hover svg,
  form button:focus-visible svg,
  form input:focus-visible:not(:placeholder-shown) + button svg {
    fill: currentColor;
  }

  button.toggle-search-bar {
    display: none;
    padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.base}`};
  }

  @media screen and (max-width: 768px) {
    .container:not(.search-bar-open) {
      padding-right: 0;
    }

    .container:not(.search-bar-open) form {
      display: none;
    }

    .container.search-bar-open {
      flex-direction: column;
      padding-bottom: 0;
    }

    .container.search-bar-open form {
      max-width: none;
    }

    button.toggle-search-bar {
      display: initial;
    }
  }
`
