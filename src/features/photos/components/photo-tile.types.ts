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
