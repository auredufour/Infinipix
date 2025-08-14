import { memo } from 'react'

import { DSAvatar } from '../../../../../components/shared/avatar/avatar.component'
import { DSButton } from '../../../../../components/shared/button/button.component'
import { DSModal } from '../../../../../components/shared/modal/modal.component'
import { DSText } from '../../../../../components/shared/text/text.component'
import {
  SCAuthorInfo,
  SCButtonGroupHeader,
  SCHeaderBar,
} from '../photo-modal.styles'
import type { PhotoModalHeaderProps } from '../photo-modal.types'

export const PhotoModalHeader = memo(
  ({ author, onDownload }: PhotoModalHeaderProps) => (
    <DSModal.Header>
      <SCHeaderBar>
        <SCAuthorInfo>
          <DSAvatar name={author} size="medium" />
          <DSText as="h2" size="heading">
            {author}
          </DSText>
        </SCAuthorInfo>

        <SCButtonGroupHeader>
          <DSButton variant="highlight" onClick={onDownload}>
            Download
          </DSButton>
        </SCButtonGroupHeader>
      </SCHeaderBar>
    </DSModal.Header>
  ),
)

PhotoModalHeader.displayName = 'PhotoModalHeader'
