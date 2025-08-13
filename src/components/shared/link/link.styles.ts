import styled from 'styled-components'

import { interactiveElementFocusVisible } from '../../../shared/utils/style.utils'
import type { DSLinkProps } from './link.types'

export const SCLink = styled.a<{ $variant: DSLinkProps['variant'] }>`
  ${({ theme }) => `
  --link-color: ${theme.colors['emphasis-low-fg']};`}

  border-radius: ${({ theme }) => theme.radius.interactive};
  color: var(--link-color);
  display: inline-block;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: ${({ theme, $variant }) =>
    $variant === 'plain'
      ? 0
      : `${theme.spacings['12']} ${theme.spacings['16']}`};
  text-decoration: none;
  transition: ${({ theme }) => theme.motions['transition-base']};

  ${({ theme }) =>
    interactiveElementFocusVisible({
      colorBg: theme.colors['emphasis-low-bg-active'],
      colorOutline: theme.colors['emphasis-low-fg'],
    })}
`
