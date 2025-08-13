import type { ImgHTMLAttributes } from 'react'

export interface DSImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: number
  isLoaded?: boolean

  // Simple error handling
  fallbackSrc?: string

  // Dimensions for aspect ratio calculation
  width?: number
  height?: number
}
