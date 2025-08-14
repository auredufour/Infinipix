import { useCallback } from 'react'
import styled from 'styled-components'

import { DSGridMasonry } from '../../../components/shared/grid/grid.component'
import { PhotoCard } from '../components/photo-card/photo-card.component'
import type { Photo } from '../photo.types'
import { useInfinitePhotos } from '../usePhoto'

const SCPhotosContainer = styled.div`
  --header-height: 80px;

  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  padding: 0 ${({ theme }) => theme.spacings['page-gutter']}
    ${({ theme }) => theme.spacings['section-gap']};
  margin: ${({ theme }) =>
    `calc(var(--header-height) + ${theme.spacings['page-gutter']}) auto 0`};
`

export const HomePage = () => {
  const { pages, sentinel } = useInfinitePhotos(30)

  const renderItem = useCallback(
    (item: Photo, columnWidth: number) => (
      <PhotoCard
        key={item.id}
        {...item}
        src={item.download_url}
        columnWidth={columnWidth}
        alt={item.author}
        downloadUrl={item.download_url}
      />
    ),
    [],
  )

  return (
    <SCPhotosContainer>
      <DSGridMasonry
        data={pages.flatMap((p) => p.items)}
        renderItem={renderItem}
      />
      <div ref={sentinel} style={{ height: 1 }} />
    </SCPhotosContainer>
  )
}

HomePage.displayName = 'HomePage'
