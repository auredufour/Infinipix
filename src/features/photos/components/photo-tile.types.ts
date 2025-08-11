export type PhotoTileProps = {
  alt?: string
  author: string
  downloadUrl: string
  src: string
  width: number
  height: number
  onLoad?: () => void
  isLoaded?: boolean
}
