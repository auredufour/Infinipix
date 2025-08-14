import { memo, useCallback, useMemo } from 'react'

import { DSImage } from '../../../../../components/shared/image/image.component'
import { DSText } from '../../../../../components/shared/text/text.component'
import { useDownloadHandler } from '../photo-card.hooks'
import {
  SCActionContainer,
  SCButtonDownload,
  SCCard,
  SCModalTrigger,
} from '../photo-card.styles'
import type { PhotoCardProps } from '../photo-card.types'
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
  }: PhotoCardProps) => {
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
      <SCCard width={width} height={height}>
        <SCModalTrigger
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
        </SCModalTrigger>

        <SCActionContainer>
          <DSText color="emphasis-high-fg" size="md" weight="bold">
            {author}
          </DSText>
          <SCButtonDownload variant="highlight" onClick={handleOnDownload}>
            Download
          </SCButtonDownload>
        </SCActionContainer>
      </SCCard>
    )
  },
)

PhotoCardContent.displayName = 'PhotoCardContent'
