import { memo } from 'react'

import { DSImage } from '../../../../../components/shared/image/image.component'
import { DSSkeleton } from '../../../../../components/shared/skeleton/skeleton.component'
import { useImageLoader } from '../photo-modal.hooks'
import {
  SCImageSection,
  SCImageWrapper,
  SCSkeletonOverlay,
} from '../photo-modal.styles'
import type { PhotoModalImageProps } from '../photo-modal.types'

export const PhotoModalImage = memo(({ photo }: PhotoModalImageProps) => {
  const { isLoaded, handleOnLoad } = useImageLoader()

  return (
    <SCImageSection>
      <SCImageWrapper $width={photo.width} $height={photo.height}>
        <SCSkeletonOverlay>
          <DSSkeleton state={isLoaded ? 'inactive' : 'loading'} />
        </SCSkeletonOverlay>

        <DSImage
          alt={photo.author}
          isLoaded={isLoaded}
          onLoad={handleOnLoad}
          src={photo.download_url}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </SCImageWrapper>
    </SCImageSection>
  )
})

PhotoModalImage.displayName = 'PhotoModalImage'
