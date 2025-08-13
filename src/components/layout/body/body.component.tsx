import { useCallback } from 'react'
import styled from 'styled-components'

import { PhotoCard } from '../../../features/photos/components/photo-tile.component'
import type { Photo } from '../../../features/photos/photo.types'
import { useInfinitePhotos } from '../../../features/photos/usePhoto'
import { DSGridMansory } from '../../shared/grid/grid.component'
import { bodyCssRules } from './body.styles'

const StyledBodyContainer = styled.div`
  ${bodyCssRules}
`

/* ---------- main body ---------- */
export function Body() {
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
    <StyledBodyContainer>
      <DSGridMansory
        data={pages.flatMap((p) => p.items)}
        renderItem={renderItem}
      />
      <div ref={sentinel} style={{ height: 1 }} />
    </StyledBodyContainer>
  )
}
