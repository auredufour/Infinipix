import { css } from 'styled-components'

export const linkCssRules = css`
    border-radius: ${({ theme }) => theme.radius.full};
    color: ${({ theme }) => theme.colors['strong-fg']};
    display: inline-block;
    font-weight: 500;
    padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[16]}`};
    text-decoration: none;
    transition: background-color 0.25s ease;

    &:hover, &:focus-visible {
        background-color: #f7f7f7;
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors['strong-fg']};
        outline-offset: 2px;
    }
  }
`
