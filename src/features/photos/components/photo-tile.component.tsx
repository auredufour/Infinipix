import { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { DSButton } from '../../../components/shared/button/button.component'
import { DSImage } from '../../../components/shared/image/image.component'
import { DSSkeleton } from '../../../components/shared/skeleton/skeleton.component'
import { DSText } from '../../../components/shared/text/text.component'
import { PhotoModal } from './photo-modal.component'
import {
  tileActionContainerCssRules,
  tileFigureCssRules,
} from './photo-tile.styles'
import type { PhotoCardProps } from './photo-tile.types'
import { downloadImage } from './photo-tile.utils'

export const StyledTileTrigger = styled.button`
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
`

const StyledImageContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.02);
  }
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

export const PhotoCard = ({
  width,
  height,
  alt,
  onLoad,
  columnWidth,
  author,
  downloadUrl,
  id,
  src,
}: {
  width: number
  height: number
  alt: string
  onLoad?: () => void
  columnWidth: number
  author: string
  downloadUrl: string
  id: string
  src: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [open, setOpen] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '2000px',
        threshold: 0.1,
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }, [onLoad])

  const handleOnDownload = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      try {
        await downloadImage(downloadUrl, `infinipix-${author}`)
      } catch (error: unknown) {
        window.open(downloadUrl, '_blank', 'noopener')
      }
    },
    [downloadUrl, author],
  )

  // Calculate aspect ratio for placeholder
  const aspectRatio = height / width
  const displayHeight = columnWidth * aspectRatio

  return (
    <>
      <StyledImageContainer
        ref={imgRef}
        width={columnWidth}
        height={displayHeight}
        key={id}
      >
        <DSSkeleton state={isLoaded ? 'inactive' : 'loading'} />

        {isInView && (
          <Card
            id={id}
            src={src}
            width={width}
            height={height}
            columnWidth={columnWidth}
            alt={alt}
            author={author}
            downloadUrl={src}
            onLoad={handleImageLoad}
            isLoaded={isLoaded}
            onOpen={() => setOpen(true)}
          />
        )}
      </StyledImageContainer>
      {open && (
        <PhotoModal
          photo={{
            id,
            author,
            width,
            height,
            download_url: downloadUrl,
            url: src,
          }}
          onClose={() => setOpen(false)}
          onDownload={handleOnDownload}
        />
      )}
    </>
  )
}

interface CardProps extends PhotoCardProps {
  onOpen: () => void
  columnWidth: number
}

const Card = memo(
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
  }: CardProps) => {
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

    const handleOnClick = useCallback(onOpen, [onOpen])

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
            src={`${downloadUrl}?w=${Math.round(columnWidth)}&h=${Math.round(columnWidth * (height / width))}`}
            srcSet={`${downloadUrl}?w=${Math.round(columnWidth)}&h=${Math.round(columnWidth * (height / width))} 1x, ${downloadUrl}?w=${Math.round(
              columnWidth * 2,
            )}&h=${Math.round(columnWidth * 2 * (height / width))} 2x`}
            sizes={`${columnWidth}px`}
            width={columnWidth}
            height={Math.round(columnWidth * (height / width))}
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
  },
)
