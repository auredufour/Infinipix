import type { Photo } from '../../photo.types'

export interface PhotoModalProps {
  photo: Photo
  onClose: () => void
  onDownload: (e: React.MouseEvent<HTMLButtonElement>) => void
  state: 'active' | 'inactive'
}

export interface HeaderProps {
  author: string
  onDownload: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type ImageProps = Pick<
  Photo,
  'author' | 'download_url' | 'height' | 'width'
>

export interface PhotoModalImageProps {
  photo: Pick<Photo, 'author' | 'width' | 'height' | 'download_url'>
}

export interface PhotoModalHeaderProps {
  author: string
  onDownload: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface PhotoModalFooterProps {
  onDownload: (e: React.MouseEvent<HTMLButtonElement>) => void
}
