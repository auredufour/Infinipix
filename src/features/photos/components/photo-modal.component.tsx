import { memo, useCallback, useState } from 'react'

import { DSAvatar } from '../../../components/shared/avatar/avatar.component'
import { DSButton } from '../../../components/shared/button/button.component'
import { DSIcon } from '../../../components/shared/icon/icon.component'
import { DSImage } from '../../../components/shared/image/image.component'
import { DSModal } from '../../../components/shared/modal/modal.component'
import { DSSkeleton } from '../../../components/shared/skeleton/skeleton.component'
import {
  SCAuthorInfo,
  SCButtonGroup,
  SCContentWrapper,
  SCFooter,
  SCFooterActions,
  SCHeaderBar,
  SCImageSection,
  SCImageWrapper,
  SCMetaInfo,
  SCMetaItem,
  SCSkeletonOverlay,
} from './photo-modal.styles'
import type {
  PhotoModalHeaderProps,
  PhotoModalImageProps,
  PhotoModalProps,
} from './photo-modal.types'

const useImageLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOnLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { isLoaded, handleOnLoad }
}

// ---- Header

const PhotoModalHeader = memo(
  ({ author, onDownload }: PhotoModalHeaderProps) => (
    <DSModal.Header>
      <SCHeaderBar>
        <SCAuthorInfo>
          <DSAvatar name={author} size="medium" />
          <h2>{author}</h2>
        </SCAuthorInfo>

        <SCButtonGroup>
          <DSButton accessoryLeft={<DSIcon name="save" />} variant="low">
            Save
          </DSButton>
          <DSButton accessoryLeft={<DSIcon name="heart" />} variant="low">
            Love
          </DSButton>
          <DSButton variant="highlight" onClick={onDownload}>
            Download
          </DSButton>
        </SCButtonGroup>
      </SCHeaderBar>
    </DSModal.Header>
  ),
)

PhotoModalHeader.displayName = 'PhotoModalHeader'

// ---- Image content

const PhotoModalImage = memo(({ photo }: PhotoModalImageProps) => {
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

// ---- Footer

const PhotoModalFooter = memo(() => (
  <SCFooter>
    <SCMetaInfo>
      <SCMetaItem>
        <DSIcon name="check-circle" size={16} /> Free to use
      </SCMetaItem>
    </SCMetaInfo>

    <SCFooterActions>
      <DSButton accessoryLeft={<DSIcon name="info" size={16} />} variant="low">
        More information
      </DSButton>
      <DSButton accessoryLeft={<DSIcon name="share" size={16} />} variant="low">
        Share
      </DSButton>
      <DSButton
        accessoryLeft={<DSIcon name="flag" size={16} />}
        variant="low"
        aria-label="Signaler"
      />
    </SCFooterActions>
  </SCFooter>
))

PhotoModalFooter.displayName = 'PhotoModalFooter'

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export const PhotoModal = ({
  photo,
  onClose,
  onDownload,
  state,
}: PhotoModalProps) => (
  <DSModal state={state} onClose={onClose}>
    <DSModal.Content ariaLabel={`Preview ${photo.author}`}>
      <SCContentWrapper>
        <PhotoModalHeader author={photo.author} onDownload={onDownload} />
        <PhotoModalImage photo={photo} />
        <PhotoModalFooter />
      </SCContentWrapper>
    </DSModal.Content>
  </DSModal>
)
