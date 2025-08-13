import type { ElementType, HTMLAttributes } from 'react'

import type { AppTheme } from '../../../styles/themes/types'

export interface DSTextProps extends HTMLAttributes<HTMLElement> {
  color?: keyof AppTheme['colors']
  size?: keyof AppTheme['fontSize']
  weight?: keyof AppTheme['fontWeight']

  // Polymorphic component support
  as?: ElementType

  // Content
  children?: React.ReactNode
}
