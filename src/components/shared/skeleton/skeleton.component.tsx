import { memo } from 'react'

import { SCSkeletonLoader } from './skeleton.styles'
import type { DSSkeletonProps } from './skeleton.types'

export const DSSkeleton = memo(({ height, state, width }: DSSkeletonProps) => {
  if (state === 'inactive') {
    return null
  }

  return (
    <SCSkeletonLoader
      $state={state}
      $width={width}
      $height={height}
      data-testid="skeleton"
      role="progressbar"
      aria-label="Loading content"
      aria-busy="true"
    />
  )
})

DSSkeleton.displayName = 'DSSkeleton'
