import styled from 'styled-components'

import type { DSLinkProps } from './link.types'

export const SCLink = styled.a<{ $variant: DSLinkProps['variant'] }>`
  border-radius: ${({ theme }) => theme.radius.full};
    color: ${({ theme }) => theme.colors['strong-fg']};
    display: inline-block;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[16]}`};
    text-decoration: none;
    transition: background-color 0.25s ease;

    &:hover, &:focus-visible {
        background-color:  ${({ theme }) => theme.colors['strong-bg-control']};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors['strong-fg']};
        outline-offset: 2px;
    }
  }
`
