import styled from 'styled-components'

import type { DSAvatarProps } from './avatar.types'

// Convert size prop to pixel value
const getSize = (size: DSAvatarProps['size'] = 'medium') => {
  if (typeof size === 'number') return `${size}px`
  const map = { small: '32px', medium: '40px', large: '64px' } as const
  return map[size]
}

export const SCAvatarRoot = styled.div<{
  $size?: DSAvatarProps['size']
}>`
  --avatarSize: ${({ $size }) => getSize($size)};

  align-items: center;
  background-color: ${({ theme }) => theme.colors['surface-bg']};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors['strong-fg']};
  display: inline-flex;
  font-weight: 500;
  height: var(--avatarSize);
  justify-content: center;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: var(--avatarSize);

  img {
    block-size: 100%;
    inline-size: 100%;
    object-fit: cover;
  }
`

export const SCInitialsFallback = styled.span`
  font-size: ${({ theme }) => theme.fontSize.medium};
  line-height: 1;
  text-transform: uppercase;
`
