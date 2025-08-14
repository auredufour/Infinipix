import { memo, useCallback, useState } from 'react'

import { SCAvatarRoot, SCInitialsFallback } from './avatar.styles'
import type { DSAvatarProps } from './avatar.types'
import { getInitials } from './avatar.utils'

export const DSAvatar = memo(
  ({ alt = '', name, size = 'medium', src, ...rest }: DSAvatarProps) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    const handleOnLoad = useCallback(() => {
      setLoaded(true)
    }, [])

    const handleOnError = useCallback(() => {
      setLoaded(false)
    }, [])

    return (
      <SCAvatarRoot $size={size} aria-label={name} {...rest}>
        {src && (
          <img
            alt={alt || name || 'avatar'}
            loading="lazy"
            onError={handleOnError}
            onLoad={handleOnLoad}
            src={src}
          />
        )}

        {(!src || !loaded) && (
          <SCInitialsFallback>{getInitials(name || alt)}</SCInitialsFallback>
        )}
      </SCAvatarRoot>
    )
  },
)

DSAvatar.displayName = 'DSAvatar'
