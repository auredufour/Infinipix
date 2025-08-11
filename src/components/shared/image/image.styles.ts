import { css } from 'styled-components'

import type { DSImageProps } from './image.types'

export const imageCssRules = css<DSImageProps>`
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  display: block;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  width: 100%;
`
