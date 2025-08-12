import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import type { DSIconProps } from '../icon/icon.types'

export interface DSButtoniconProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'plain' | 'high-emphasis' | 'medium-emphasis'
  size?: 'small' | 'medium' | 'large'
  name: DSIconProps['name']
  ariaLabel?: string
}
