export type PhotoCardProps = {
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

export interface PhotoCardComponentProps {
  width: number
  height: number
  alt: string
  onLoad?: () => void
  columnWidth: number
  author: string
  downloadUrl: string
  id: string
  priority?: 'eager' | 'lazy'
  src: string
}
