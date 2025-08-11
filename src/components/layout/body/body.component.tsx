import { memo, useCallback, useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { PhotoCard } from '../../../features/photos/components/photo-tile.component'
import type { Photo } from '../../../features/photos/photo.types'
import { useInfinitePhotos } from '../../../features/photos/usePhoto'
import { DSGridMansory } from '../../shared/grid/grid.component'
import { bodyCssRules } from './body.styles'

const StyledBodyContainer = styled.div`
  ${bodyCssRules}
`

/* ---------- spinner styles ---------- */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  color: ${({ theme }) => theme.colors.outline};
  width: 64px;
  height: 64px;
  position: relative;

  & div {
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 8px;
    border: 8px solid currentColor;
    border-radius: 50%;
    border-color: currentColor transparent transparent transparent;
    animation: ${spin} 1.2s linear infinite;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

/* ---------- overlay ---------- */
const fadeOut = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`

const Overlay = styled.div<{ exiting: boolean }>`
  position: fixed;
  inset: 81px 0 0;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors['app-bg']};
  z-index: 100;

  ${({ exiting }) =>
    exiting &&
    css`
      animation: ${fadeOut} 2500ms forwards;
    `}
`

/* ---------- memoised components ---------- */
const Loading = memo(({ done }: { done: boolean }) => {
  const [visible, setVisible] = useState(true)

  // start fade-out once loading finished
  useEffect(() => {
    if (done) {
      const id = setTimeout(() => setVisible(false), 2500)
      return () => clearTimeout(id)
    }
  }, [done])

  if (!visible) return null

  return (
    <Overlay exiting={done}>
      <Spinner>
        <div />
        <div />
        <div />
        <div />
      </Spinner>
    </Overlay>
  )
})

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
        gap={16}
        renderItem={renderItem}
      />
      <div ref={sentinel} style={{ height: 1 }} />
    </StyledBodyContainer>
  )
}
