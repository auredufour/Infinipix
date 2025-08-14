import { useCallback } from 'react'
import styled from 'styled-components'

import { DSGridMasonry } from '../../../components/shared/grid/grid.component'
import { PhotoCard } from '../components/photo-card/photo-card.component'
import type { Photo } from '../photo.types'
import { useInfinitePhotos } from '../usePhoto'

const SCPhotosContainer = styled.div`
  --header-height: 80px;

  max-width: var(--content-max-width);
  padding: 0 var(--page-gutter) var(--section-gap);
  margin: var(--header-height) auto 0;
`

export const HomePage = () => {
  const { pages, sentinel } = useInfinitePhotos(30)

  const allPhotos = pages.flatMap((p) => p.items)

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
          priority={isPriority ? 'eager' : 'lazy'}
        />
      )
    },
    [],
  )

  return (
    <SCPhotosContainer>
      <DSGridMasonry data={allPhotos} renderItem={renderItem} />
      <div role="none" ref={sentinel} style={{ height: 1 }} />
    </SCPhotosContainer>
  )
}

HomePage.displayName = 'HomePage'
