import styled from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

export const SCSkeletonLoader = styled.div<{
  $height?: DSSkeletonProps['height']
  $state: DSSkeletonProps['state']
  $width?: DSSkeletonProps['width']
}>`
  height: ${({ $height }) =>
    $height
      ? typeof $height === 'number'
        ? `${$height}px`
        : $height
      : '100%'};
  width: ${({ $width }) =>
    $width ? (typeof $width === 'number' ? `${$width}px` : $width) : '100%'};

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors['surface-bg']} 0%,
    ${({ theme }) => theme.colors['emphasis-medium-bg']} 30%,
    ${({ theme }) => theme.colors['emphasis-high-fg']} 70%,
    ${({ theme }) => theme.colors['surface-bg']} 100%
  );

  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  /* Performance optimized */
  opacity: ${({ $state }) => ($state === 'loading' ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`
