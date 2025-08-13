import { memo } from 'react'

import { DSAvatar } from '../../../../../components/shared/avatar/avatar.component'
import { DSButton } from '../../../../../components/shared/button/button.component'
import { DSIcon } from '../../../../../components/shared/icon/icon.component'
import { DSModal } from '../../../../../components/shared/modal/modal.component'
import { SCAuthorInfo, SCButtonGroup, SCHeaderBar } from '../photo-modal.styles'
import type { PhotoModalHeaderProps } from '../photo-modal.types'

export const PhotoModalHeader = memo(
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
