import { memo, useCallback, useMemo } from 'react'

import { DSButton } from '../../../../../components/shared/button/button.component'
import { DSImage } from '../../../../../components/shared/image/image.component'
import { DSText } from '../../../../../components/shared/text/text.component'
import { useDownloadHandler } from '../photo-card.hooks'
import { SCActionContainer, SCTile, SCTileTrigger } from '../photo-card.styles'
import type { PhotoTileProps } from '../photo-card.types'
import { getImageSrc, getSrcSet } from '../photo-card.utils'

export const PhotoCardContent = memo(
  ({
    alt,
    author,
    columnWidth,
    downloadUrl,
    height,
    isLoaded,
    onLoad,
    onOpen,
    width,
  }: PhotoTileProps) => {
    const handleOnDownload = useDownloadHandler(downloadUrl, author)
    const handleOnClick = useCallback(onOpen, [onOpen])

    const aspectRatio = height / width
    const imageSrc = useMemo(
      () => getImageSrc(aspectRatio, columnWidth, downloadUrl),
      [aspectRatio, columnWidth, downloadUrl],
    )
    const imageSrcSet = useMemo(
      () => getSrcSet(downloadUrl, columnWidth, aspectRatio),
      [downloadUrl, columnWidth, aspectRatio],
    )
    const imageHeight = useMemo(
      () => Math.round(columnWidth * aspectRatio),
      [columnWidth, aspectRatio],
    )

    return (
      <SCTile width={width} height={height}>
        <SCTileTrigger
          type="button"
          onClick={handleOnClick}
          aria-label={`Open preview: ${alt}`}
        >
          <DSImage
            alt={author}
            borderRadius={12}
            height={imageHeight}
            isLoaded={isLoaded}
            onLoad={onLoad}
            sizes={`${columnWidth}px`}
            src={imageSrc}
            srcSet={imageSrcSet}
            width={columnWidth}
          />
        </SCTileTrigger>

        <SCActionContainer>
          <DSText color="emphasis-high-fg" size="md" weight="bold">
            {author}
          </DSText>
          <DSButton variant="highlight" onClick={handleOnDownload}>
            Download
          </DSButton>
        </SCActionContainer>
      </SCTile>
    )
  },
)

PhotoCardContent.displayName = 'PhotoCardContent'
