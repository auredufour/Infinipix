import { memo } from 'react'

import { DSIcon } from '../../../../../components/shared/icon/icon.component'
import {
  SCButtonDownloadFooter,
  SCFooter,
  SCMetaInfo,
  SCMetaItem,
} from '../photo-modal.styles'
import type { PhotoModalFooterProps } from '../photo-modal.types'

export const PhotoModalFooter = memo(
  ({ onDownload }: PhotoModalFooterProps) => (
    <SCFooter>
      <SCMetaInfo>
        <SCMetaItem>
          <DSIcon name="check-circle" size={16} /> Free to use
        </SCMetaItem>
      </SCMetaInfo>
      <SCButtonDownloadFooter variant="highlight" onClick={onDownload}>
        Download
      </SCButtonDownloadFooter>
    </SCFooter>
  ),
)

PhotoModalFooter.displayName = 'PhotoModalFooter'
