import styled from 'styled-components'

import { buttonFocusVisible } from '../button/button.styles'
import type { DSLinkProps } from './link.types'

export const SCLink = styled.a<{ $variant: DSLinkProps['variant'] }>`
  ${({ theme }) => `
    --link-color: ${theme.colors['emphasis-high-fg']};`}

  border-radius: ${({ theme }) => theme.radius.full};
  color: var(--link-color);
  display: inline-block;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: ${({ theme }) => `${theme.spacings['12']} ${theme.spacings['16']}`};
  text-decoration: none;
  transition: ${({ theme }) => theme.motions['transition-base']};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors['emphasis-high-bg-active']};
  }

  ${buttonFocusVisible}
`
