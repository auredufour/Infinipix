import { memo, useCallback, useState } from 'react'

import { DSSkeleton } from '../../../../components/shared/skeleton/skeleton.component'
import { PhotoModal } from '../photo-modal/photo-modal.component'
import { useDownloadHandler, useImageLazyLoading } from './photo-card.hooks'
import { SCCardContainer } from './photo-card.styles'
import type { PhotoCardComponentProps } from './photo-card.types'
import { PhotoCardContent } from './subcomponents/photo-card-content.component'

export const PhotoCard = memo(
  ({
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

    const { imgRef, isInView } = useImageLazyLoading()
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
        <SCCardContainer
          height={displayHeight}
          key={id}
          ref={imgRef}
          width={columnWidth}
        >
          <DSSkeleton state={isLoaded ? 'inactive' : 'loading'} />

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
        </SCCardContainer>

        {isModalOpen && (
          <PhotoModal
            state={isModalOpen ? 'active' : 'inactive'}
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
  },
)

PhotoCard.displayName = 'PhotoCard'
