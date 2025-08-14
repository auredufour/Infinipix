import type { ImgHTMLAttributes } from 'react'

export interface DSImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: number
  fallbackSrc?: string
  height?: number
  isLoaded?: boolean
  priority?: 'eager' | 'lazy'
  width?: number
}
