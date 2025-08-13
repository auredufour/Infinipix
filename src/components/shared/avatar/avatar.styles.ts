import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSAvatarProps } from './avatar.types'

const SIZE_MAP = {
  small: (theme: AppTheme) => theme.spacings['24'],
  medium: (theme: AppTheme) => theme.spacings['32'],
  large: (theme: AppTheme) => theme.spacings['48'],
} as const

const getSize = (size: DSAvatarProps['size'] = 'medium', theme: AppTheme) =>
  SIZE_MAP[size](theme)

export const SCAvatarRoot = styled.div<{
  $size?: DSAvatarProps['size']
}>`
  --avatarSize: ${({ $size, theme }) => getSize($size, theme)};

  align-items: center;
  background-color: ${({ theme }) => theme.colors['emphasis-medium-bg']};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors['emphasis-medium-fg']};
  display: inline-flex;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  height: var(--avatarSize);
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: var(--avatarSize);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    image-rendering: optimizeQuality;
    image-rendering: -webkit-optimize-contrast;
  }
`

export const SCInitialsFallback = styled.span`
  font-size: ${({ theme }) => theme.fontSize.body};
  line-height: 1;
  text-transform: uppercase;
`
