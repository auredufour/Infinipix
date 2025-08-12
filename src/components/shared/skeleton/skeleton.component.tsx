import { SCSkeletonLoader } from './skeleton.styles'
import type { DSSkeletonProps } from './skeleton.types'

export const DSSkeleton = ({ state }: DSSkeletonProps) => (
  <SCSkeletonLoader $state={state} data-testid="skeleton" />
)

DSSkeleton.displayName = 'DSSkeleton'
