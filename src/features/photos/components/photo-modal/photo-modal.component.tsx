import { DSModal } from '../../../../components/shared/modal/modal.component'
import { SCContentWrapper } from './photo-modal.styles'
import type { PhotoModalProps } from './photo-modal.types'
import { PhotoModalFooter } from './subcomponents/photo-modal-footer.component'
import { PhotoModalHeader } from './subcomponents/photo-modal-header.component'
import { PhotoModalImage } from './subcomponents/photo-modal-image.component'

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
        <PhotoModalFooter onDownload={onDownload} />
      </SCContentWrapper>
    </DSModal.Content>
  </DSModal>
)
