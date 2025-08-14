import { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { DSGridMasonry } from '../../../components/shared/grid/grid.component'
import { PhotoCard } from '../components/photo-card/photo-card.component'
import { getImageSrc } from '../components/photo-card/photo-card.utils'
import type { Photo } from '../photo.types'
import { useInfinitePhotos } from '../usePhoto'

const SCPhotosContainer = styled.div`
  --header-height: 80px;

  max-width: var(--content-max-width);
  padding: 0 var(--page-gutter) var(--section-gap);
  margin: calc(var(--header-height) + var(--page-gutter)) auto 0;
`

const preloadImage = (src: string) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

export const HomePage = () => {
  const { pages, sentinel } = useInfinitePhotos(30)

  const allPhotos = pages.flatMap((p) => p.items)

  // Simple preloading of first 3 images
  const preloadFirstImages = useCallback(() => {
    allPhotos.slice(0, 3).forEach((photo) => {
      if (photo?.download_url) {
        const aspectRatio = photo.height / photo.width
        const imageUrl = getImageSrc(aspectRatio, 600, photo.download_url)
        preloadImage(imageUrl)
      }
    })
  }, [allPhotos])

  useEffect(() => {
    if (allPhotos.length > 0) {
      preloadFirstImages()
    }
  }, [allPhotos.length, preloadFirstImages])

  const renderItem = useCallback(
    (item: Photo, columnWidth: number, originalPosition: number) => {
      const isPriority = originalPosition < 12
      return (
        <PhotoCard
          key={item.id}
          {...item}
          src={item.download_url}
          columnWidth={columnWidth}
          alt={item.author}
          downloadUrl={item.download_url}
          priority={isPriority ? 'eager' : undefined}
        />
      )
    },
    [],
  )

  return (
    <SCPhotosContainer>
      <DSGridMasonry data={allPhotos} renderItem={renderItem} />
      <div ref={sentinel} style={{ height: 1 }} />
    </SCPhotosContainer>
  )
}

HomePage.displayName = 'HomePage'
