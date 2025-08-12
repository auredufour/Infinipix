import { memo, useState } from 'react'

import { SCAvatarRoot, SCInitialsFallback } from './avatar.styles'
import type { DSAvatarProps } from './avatar.types'
import { getInitials } from './avatar.utils'

export const DSAvatar = memo(
  ({ alt = '', name, size = 'medium', src, ...rest }: DSAvatarProps) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    const showImage = Boolean(src) && loaded

    return (
      <SCAvatarRoot $size={size} aria-label={name} {...rest}>
        {src && (
          <img
            alt={alt || name || 'avatar'}
            onError={() => setLoaded(false)}
            onLoad={() => setLoaded(true)}
            src={src}
          />
        )}

        {!showImage && (
          <SCInitialsFallback>{getInitials(name || alt)}</SCInitialsFallback>
        )}
      </SCAvatarRoot>
    )
  },
)

DSAvatar.displayName = 'DSAvatar'
