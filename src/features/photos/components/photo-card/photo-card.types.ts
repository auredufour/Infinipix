export interface PhotoCardComponentProps {
  alt?: string
  author: string
  columnWidth: number
  downloadUrl: string
  height: number
  id: string
  isAboveFold?: boolean
  onLoad?: () => void
  src: string
  width: number
}

export interface PhotoCardProps {
  alt?: string
  author: string
  columnWidth: number
  downloadUrl: string
  height: number
  id: string
  isLoaded: boolean
  onLoad?: () => void
  onOpen: () => void
  priority?: 'eager' | 'lazy'
  src: string
  width: number
}
