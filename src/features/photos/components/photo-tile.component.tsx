import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { DSButton } from '../../../components/shared/button/button.component'
import { DSImage } from '../../../components/shared/image/image.component'
import { DSSkeleton } from '../../../components/shared/skeleton/skeleton.component'
import { DSText } from '../../../components/shared/text/text.component'
import { PhotoModal } from './photo-modal.component'
import {
  SCActionContainer,
  SCImageContainer,
  SCTile,
  SCTileTrigger,
} from './photo-tile.styles'
import type {
  PhotoCardComponentProps,
  PhotoTileProps,
} from './photo-tile.types'
import { downloadImage } from './photo-tile.utils'

/**
 * Hook for lazy loading images using Intersection Observer
 *
 * @param rootMargin - The margin around the root element
 * @param threshold - The threshold for the intersection observer
 * @returns An object containing the ref and isInView state
 */
const useIntersectionObserver = (rootMargin = '2000px', threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { imgRef, isInView }
}

/**
 * Hook for handling image downloads with error fallback
 *
 * @param downloadUrl - The URL of the image to download
 * @param author - The author of the image
 * @returns A function that handles the download of the image
 */
const useDownloadHandler = (downloadUrl: string, author: string) => {
  return useCallback(
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
}

/**
 * Container component that handles lazy loading, modal state, and image lifecycle
 */
export const PhotoCard = ({
  columnWidth,
  downloadUrl,
  height,
  id,
  onLoad,
  src,
  width,
  author,
  ...props
}: PhotoCardComponentProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { imgRef, isInView } = useIntersectionObserver()
  const handleOnDownload = useDownloadHandler(downloadUrl, author)

  const handleOnImageLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleOnOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleOnCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Calculate aspect ratio for skeleton
  const aspectRatio = height / width
  const displayHeight = columnWidth * aspectRatio

  return (
    <>
      <SCImageContainer
        height={displayHeight}
        key={id}
        ref={imgRef}
        width={columnWidth}
      >
        <DSSkeleton state={isLoaded ? 'inactive' : 'loading'} />

        {/* Only render the interactive card when the image is in view */}
        {isInView && (
          <PhotoCardContent
            author={author}
            columnWidth={columnWidth}
            height={height}
            id={id}
            isLoaded={isLoaded}
            onLoad={handleOnImageLoad}
            onOpen={handleOnOpenModal}
            width={width}
            downloadUrl={downloadUrl}
            src={src}
            {...props}
          />
        )}
      </SCImageContainer>

      {isModalOpen && (
        <PhotoModal
          state="active"
          photo={{
            author,
            id,
            width,
            height,
            download_url: downloadUrl,
            url: src,
            ...props,
          }}
          onClose={handleOnCloseModal}
          onDownload={handleOnDownload}
        />
      )}
    </>
  )
}

/**
 * Presentational component that renders the photo with hover actions
 */
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
    const imageSrc = `${downloadUrl}?w=${Math.round(columnWidth)}&h=${Math.round(columnWidth * (height / width))}`
    const imageHeight = Math.round(columnWidth * (height / width))

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
            srcSet={`${imageSrc} 1x, ${imageSrc} 2x`}
            width={columnWidth}
          />
        </SCTileTrigger>

        <SCActionContainer>
          <DSText color="strong-fg-inverted" size="medium" weight="bold">
            {author}
          </DSText>
          <DSButton variant="high-emphasis" onClick={handleOnDownload}>
            Download
          </DSButton>
        </SCActionContainer>
      </SCTile>
    )
  },
)

PhotoCard.displayName = 'InteractivePhotoCard'
