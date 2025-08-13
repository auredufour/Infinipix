import styled, { css, keyframes } from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

const shimmer = keyframes`
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
`

export const SCSkeletonLoader = styled.div<{
  $height?: DSSkeletonProps['height']
  $state: DSSkeletonProps['state']
  $width?: DSSkeletonProps['width']
}>`
  ${({ $height }) =>
    $height &&
    `height: ${typeof $height === 'number' ? `${$height}px` : $height};`}
  ${({ $width }) =>
    $width && `width: ${typeof $width === 'number' ? `${$width}px` : $width};`}
  background: ${({ theme }) => theme.colors['surface-bg']};
  inset: 0;
  opacity: ${({ $state }) => ($state === 'loading' ? 1 : 0)};
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform: translateZ(0);
  transition: opacity 0.3s ease-out;
  will-change: opacity;
  z-index: 1;

  &::before {
    content: '';
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

    animation: ${({ $state }) =>
      $state === 'loading'
        ? css`
            ${shimmer} 2s ease-in-out infinite
          `
        : 0};

    will-change: transform;
    transform: translateZ(0);
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`
