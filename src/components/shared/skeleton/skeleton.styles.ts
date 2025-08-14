import styled from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

export const SCSkeletonLoader = styled.div<{
  $height?: DSSkeletonProps['height']
  $state: DSSkeletonProps['state']
  $width?: DSSkeletonProps['width']
}>`
  /* Overlay positioning - no impact on document flow */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    130deg,
    ${({ theme }) => theme.colors['surface-bg']} 0%,
    ${({ theme }) => theme.colors['emphasis-low-bg']} 30%,
    ${({ theme }) => theme.colors['emphasis-low-bg-active']} 70%,
    ${({ theme }) => theme.colors['surface-bg']} 100%
  );

  border-radius: 8px;
  opacity: ${({ $state }) => ($state === 'loading' ? 1 : 0)};
  overflow: hidden;

  /* Interaction blocking */
  z-index: 10;
  pointer-events: ${({ $state }) => ($state === 'loading' ? 'auto' : 'none')};

  /* Performance optimizations */
  contain: layout style paint;
  will-change: opacity;
`
