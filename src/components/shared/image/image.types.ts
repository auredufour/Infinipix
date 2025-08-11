import type { ImgHTMLAttributes } from 'react'

export interface DSImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: number
  isLoaded?: boolean
}
