import type { HTMLAttributes } from 'react'

import type { AppTheme } from '../../../styles/themes/types'

export interface DSTextProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: keyof AppTheme['colors']
  size?: keyof AppTheme['fontSize']
  weight?: keyof AppTheme['fontWeight']
}
