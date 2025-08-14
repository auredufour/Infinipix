import { memo, useCallback, useMemo, useState } from 'react'

import { DSSkeleton } from '../../../../components/shared/skeleton/skeleton.component'
import { PhotoModal } from '../photo-modal/photo-modal.component'
import { useDownloadHandler, useImageLazyLoading } from './photo-card.hooks'
import { SCCardContainer } from './photo-card.styles'
import type { PhotoCardComponentProps } from './photo-card.types'
import { PhotoCardContent } from './subcomponents/photo-card-content.component'

export const PhotoCard = memo(
  ({
    author,
    columnWidth,
    downloadUrl,
    height,
    id,
    onLoad,
    priority = 'lazy',
    src,
    width,
    ...props
  }: PhotoCardComponentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const { imgRef, isInView } = useImageLazyLoading()
    const handleOnDownload = useDownloadHandler(downloadUrl, author)

    const aspectRatio = useMemo(() => height / width, [height, width])
    const displayHeight = useMemo(
      () => columnWidth * aspectRatio,
      [columnWidth, aspectRatio],
    )

    const photoData = useMemo(
      () => ({
        author,
        id,
        width,
        height,
        download_url: downloadUrl,
        url: src,
        ...props,
      }),
      [author, id, width, height, downloadUrl, src, props],
    )

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

    const shouldRender = priority === 'eager' || isInView

    return (
      <>
        <SCCardContainer
          height={displayHeight}
          ref={imgRef}
          width={columnWidth}
        >
          <DSSkeleton state={isLoaded ? 'inactive' : 'loading'} />

          {shouldRender && (
            <PhotoCardContent
              author={author}
              columnWidth={columnWidth}
              downloadUrl={downloadUrl}
              height={height}
              id={id}
              isLoaded={isLoaded}
              onLoad={handleOnImageLoad}
              onOpen={handleOnOpenModal}
              priority={priority}
              src={src}
              width={width}
              {...props}
            />
          )}
        </SCCardContainer>

        {isModalOpen && (
          <PhotoModal
            onClose={handleOnCloseModal}
            onDownload={handleOnDownload}
            photo={photoData}
            state={isModalOpen ? 'active' : 'inactive'}
          />
        )}
      </>
    )
  },
)

PhotoCard.displayName = 'PhotoCard'
