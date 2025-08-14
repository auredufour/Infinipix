import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import type { DSIconProps } from '../icon/icon.types'

export interface DSButtoniconProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  ariaLabel: string
  name: DSIconProps['name']
  size?: 'small' | 'medium'
  variant?: 'plain' | 'high' | 'medium' | 'low' | 'highlight'
}
