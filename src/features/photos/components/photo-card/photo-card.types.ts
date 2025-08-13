import type { PhotoCardProps as ImportedPhotoCardProps } from './photo-card.types'

export type PhotoCardProps = {
  alt?: string
  author: string
  downloadUrl: string
  src: string
  width: number
  height: number
  id: string
  onLoad?: () => void
  isLoaded?: boolean
}

export interface PhotoCardComponentProps {
  width: number
  height: number
  alt: string
  onLoad?: () => void
  columnWidth: number
  author: string
  downloadUrl: string
  id: string
  src: string
}

export interface PhotoTileProps extends ImportedPhotoCardProps {
  onOpen: () => void
  columnWidth: number
  isLoaded: boolean
}
