export interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationLinks {
  next?: number
  prev?: number
}

export interface PhotoPage {
  items: Photo[]
  links: PaginationLinks
}
