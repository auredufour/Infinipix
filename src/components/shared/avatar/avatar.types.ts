import type { HTMLAttributes } from 'react'

export interface DSAvatarProps extends HTMLAttributes<HTMLDivElement> {
  alt?: string
  name?: string
  size?: 'small' | 'medium' | 'large'
  src?: string
}
