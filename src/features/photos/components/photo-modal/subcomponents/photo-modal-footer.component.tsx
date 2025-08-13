import { memo } from 'react'

import { DSButton } from '../../../../../components/shared/button/button.component'
import { DSIcon } from '../../../../../components/shared/icon/icon.component'
import {
  SCFooter,
  SCFooterActions,
  SCMetaInfo,
  SCMetaItem,
} from '../photo-modal.styles'

export const PhotoModalFooter = memo(() => (
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
