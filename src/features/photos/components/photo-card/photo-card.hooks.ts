import { useCallback, useEffect, useRef, useState } from 'react'

import { downloadImage } from './photo-card.utils'

const ROOT_MARGIN = '50% 0%'

export const useImageLazyLoading = () => {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = imgRef.current

    if (!element || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            console.log(
              '🔍 IntersectionObserver triggered for element:',
              element,
            )
          }
        })
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: 0,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [isInView])

  return { imgRef, isInView }
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
