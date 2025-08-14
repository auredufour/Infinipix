import { useCallback } from 'react'
import styled from 'styled-components'

import { DSGridMasonry } from '../../../components/shared/grid/grid.component'
import { visuallyHiddenCssRules } from '../../../shared/utils/style.utils'
import { PhotoCard } from '../components/photo-card/photo-card.component'
import type { Photo } from '../photo.types'
import { useInfinitePhotos } from '../usePhoto'

const SCHeader = styled.h1`
  ${visuallyHiddenCssRules}
`

const SCHomePageContainer = styled.div`
  --header-height: 80px;

  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  padding: var(--page-gutter);
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
          key={originalPosition}
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
    <SCHomePageContainer>
      <SCHeader as="h1">Gallery of Images</SCHeader>
      <DSGridMasonry data={allPhotos} renderItem={renderItem} />
      <div role="none" ref={sentinel} style={{ height: 1 }} />
    </SCHomePageContainer>
  )
}

HomePage.displayName = 'HomePage'
