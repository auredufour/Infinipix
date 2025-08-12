import { SCSkeletonLoader } from './skeleton.styles'
import type { DSSkeletonProps } from './skeleton.types'

export const DSSkeleton = ({ state }: DSSkeletonProps) =>
  state === 'loading' ? (
    <SCSkeletonLoader $state={state} data-testid="skeleton" />
  ) : null

DSSkeleton.displayName = 'DSSkeleton'
