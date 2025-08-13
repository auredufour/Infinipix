import { memo } from 'react'

import { SCText } from './text.styles'
import type { DSTextProps } from './text.types'

export const DSText = memo(
  ({
    children,
    color = 'emphasis-low-fg',
    size = 'body',
    weight = 'regular',
    as = 'p',
    ...htmlProps
  }: DSTextProps) => {
    return (
      <SCText
        $color={color}
        $size={size}
        $weight={weight}
        as={as}
        {...htmlProps}
      >
        {children}
      </SCText>
    )
  },
)

DSText.displayName = 'DSText'
