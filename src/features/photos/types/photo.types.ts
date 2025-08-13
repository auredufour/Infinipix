export interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface PhotoParams {
  page?: number
  limit?: number
}

export interface PhotoGridProps {
  photos: Photo[]
  onPhotoClick?: (photo: Photo) => void
  isLoading?: boolean
}

export interface PhotoTileProps {
  photo: Photo
  columnWidth: number
  onLoad?: () => void
  onOpen?: () => void
}
