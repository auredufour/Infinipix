import type { HTMLAttributes } from 'react'

export interface DSAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string
  size?: 'small' | 'medium' | 'large' | number
  src?: string
}
