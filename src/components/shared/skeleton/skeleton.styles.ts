import styled, { css, keyframes } from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

export const SCSkeletonLoader = styled.div<{
  $state: DSSkeletonProps['state']
}>`
  background: ${({ theme }) => theme.colors['surface-bg']};
  border-radius: inherit;
  inset: 0;
  opacity: ${({ $state }) => ($state === 'inactive' ? 0 : 1)};
  position: absolute;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    animation: ${({ $state }) =>
      $state === 'loading'
        ? css`
            ${shimmer} 2.5s ease-in-out infinite
          `
        : 0};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(
          in srgb,
          ${({ theme }) => theme.colors['outline']} 40%,
          transparent
        )
        20%,
      color-mix(
          in srgb,
          ${({ theme }) => theme.colors['outline']} 65%,
          transparent
        )
        50%,
      color-mix(
          in srgb,
          ${({ theme }) => theme.colors['outline']} 40%,
          transparent
        )
        80%,
      transparent 100%
    );
    opacity: 0.75;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: 0;
    }
  }
`
