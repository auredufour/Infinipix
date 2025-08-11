import { useCallback } from 'react'
import styled from 'styled-components'

import { DSButton } from '../../../components/shared/button/button.component'
import { DSImage } from '../../../components/shared/image/image.component'
import { DSText } from '../../../components/shared/text/text.component'
import {
  tileActionContainerCssRules,
  tileFigureCssRules,
} from './photo-tile.styles'
import type { PhotoTileProps } from './photo-tile.types'
import { downloadImage } from './photo-tile.utils'

export const StyledTileTrigger = styled.button`
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
`

export const StyledActionContainer = styled.div`
  ${tileActionContainerCssRules}
`

const StyledTile = styled.figure.withConfig({
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'height',
})<{ width: number; height: number }>`
  ${tileFigureCssRules}

  &:hover ${StyledActionContainer},
  &:focus-within ${StyledActionContainer} {
    margin-bottom: 0;
    opacity: 1;
    visibility: visible;
  }
`

export function PhotoTile({
  src,
  alt,
  width,
  author,
  downloadUrl,
  height,
  isLoaded,
  onLoad,
}: PhotoTileProps) {
  const handleOnDownload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      try {
        await downloadImage(downloadUrl, `infinipix-${author}`)
      } catch (err) {
        window.open(downloadUrl, '_blank', 'noopener')
      }
    },
    [downloadUrl, author],
  )

  const handleOnClick = useCallback(() => {
    // to do open modal
  }, [])

  return (
    <StyledTile width={width} height={height}>
      <StyledTileTrigger
        type="button"
        onClick={handleOnClick}
        aria-label={`Open preview: ${alt}`}
      >
        <DSImage
          alt={author}
          borderRadius={12}
          src={src}
          width="100%"
          onLoad={onLoad}
          isLoaded={isLoaded}
        />
      </StyledTileTrigger>

      <StyledActionContainer>
        <DSText color="strong-fg-inverted" size="medium" weight="bold">
          {author}
        </DSText>
        <DSButton variant="high-emphasis" onClick={handleOnDownload}>
          Download
        </DSButton>
      </StyledActionContainer>
    </StyledTile>
  )
}
