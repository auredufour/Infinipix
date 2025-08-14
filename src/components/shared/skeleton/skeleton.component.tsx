import { memo, useEffect, useState } from 'react'

import { SCSkeletonLoader } from './skeleton.styles'
import type { DSSkeletonProps } from './skeleton.types'

export const DSSkeleton = memo(
  ({ height = 'auto', state, width }: DSSkeletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      if (state === 'inactive') {
        const timer = setTimeout(() => setIsLoaded(true), 100)
        return () => clearTimeout(timer)
      } else {
        setIsLoaded(false)
      }
    }, [state])

    console.log(state === 'inactive' && isLoaded)

    if (state === 'inactive' && isLoaded) {
      return null
    }

    return (
      <SCSkeletonLoader
        $state={state}
        $width={width}
        $height={height}
        data-testid="skeleton"
        role="progressbar"
        aria-label="Loading content..."
        aria-busy={state === 'loading'}
        aria-live="polite"
      />
    )
  },
)

DSSkeleton.displayName = 'DSSkeleton'
