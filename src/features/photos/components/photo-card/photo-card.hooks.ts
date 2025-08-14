import { useCallback, useEffect, useRef, useState } from 'react'

import { downloadImage } from './photo-card.utils'

const ROOT_MARGIN = '150% 0%'

let sharedObserver: IntersectionObserver | null = null
const observedElements = new Map<Element, () => void>()

export const useImageLazyLoading = () => {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = imgRef.current

    if (!element || isInView) return

    const observer = getSharedObserver()
    const callback = () => {
      setIsInView(true)
      observer.unobserve(element)
      observedElements.delete(element)
    }

    observedElements.set(element, callback)
    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observedElements.delete(element)
    }
  }, [isInView])

  return { imgRef, isInView }
}

const getSharedObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observedElements.get(entry.target)
          if (callback && entry.isIntersecting) {
            callback()
          }
        })
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: 0,
      },
    )
  }
  return sharedObserver
}

export const useDownloadHandler = (downloadUrl: string, author: string) => {
  return useCallback(
    async (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault()
      evt.stopPropagation()

      try {
        await downloadImage(downloadUrl, `infinipix-${author}`)
      } catch {
        window.open(downloadUrl, '_blank', 'noopener')
      }
    },
    [downloadUrl, author],
  )
}
