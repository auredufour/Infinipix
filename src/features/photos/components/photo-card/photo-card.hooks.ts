import { useCallback, useEffect, useRef, useState } from 'react'

import { downloadImage } from './photo-card.utils'

/**
 * Hook for lazy loading images using Intersection Observer
 *
 * @param rootMargin - The margin around the root element
 * @param threshold - The threshold for the intersection observer
 * @returns An object containing the ref and isInView state
 */
export const useImageLazyLoading = (rootMargin = '600px', threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { imgRef, isInView }
}

/**
 * Hook for handling image downloads with error fallback
 *
 * @param downloadUrl - The URL of the image to download
 * @param author - The author of the image
 * @returns A function that handles the download of the image
 */
export const useDownloadHandler = (downloadUrl: string, author: string) => {
  return useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      try {
        await downloadImage(downloadUrl, `infinipix-${author}`)
      } catch (error: unknown) {
        window.open(downloadUrl, '_blank', 'noopener')
      }
    },
    [downloadUrl, author],
  )
}
