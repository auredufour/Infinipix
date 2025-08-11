import styled, { keyframes } from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`

const StyledSkeletonLoader = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'state',
})<DSSkeletonProps>`
  animation: ${shimmer} 2s infinite;
  background-size: 200% 100%;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  inset: 0;
  opacity: ${(props) => (props.state === 'inactive' ? 0 : 1)};
  position: absolute;

  transition: opacity 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const DSSkeleton = ({ state }: DSSkeletonProps) => (
  <StyledSkeletonLoader state={state} />
)

DSSkeleton.displayName = 'DSSkeleton'
