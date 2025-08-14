import { memo, useEffect, useRef, useState } from 'react'

import { SCSkeletonLoader } from './skeleton.styles'
import type { DSSkeletonProps } from './skeleton.types'

export const DSSkeleton = memo(({ height, state, width }: DSSkeletonProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const skeletonRef = useRef<HTMLDivElement>(null)

  // Pause animations when skeleton is not visible
  useEffect(() => {
    if (state !== 'loading') return

    const element = skeletonRef.current
    if (!element) return

    // Use modern intersection observer with optimized settings
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [state])

  // Smooth transition when skeleton becomes inactive
  useEffect(() => {
    if (state === 'inactive') {
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsLoaded(false)
    }
  }, [state])

  if (state === 'inactive' && isLoaded) {
    return null
  }

  return (
    <SCSkeletonLoader
      ref={skeletonRef}
      $state={isVisible && !isLoaded ? state : 'inactive'}
      $width={width}
      $height={height}
      data-testid="skeleton"
      role="progressbar"
      aria-label="Loading content..."
      aria-busy={state === 'loading'}
      aria-live="polite"
    />
  )
})

DSSkeleton.displayName = 'DSSkeleton'
