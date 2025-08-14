const IMAGE_SIZES_MAP = {
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
}

export function getImageSize(columnWidth: number): number {
  return IMAGE_SIZES_MAP[columnWidth as keyof typeof IMAGE_SIZES_MAP] ?? 600
}

export function getImageSrc(
  aspectRatio: number,
  columnWidth: number,
  downloadUrl: string,
): string {
  const width = getImageSize(columnWidth)
  const height = Math.round(width * aspectRatio)

  return `${downloadUrl}?w=${width}&h=${height}`
}

export function getSrcSet(
  downloadUrl: string,
  columnWidth: number,
  aspectRatio: number,
): string {
  const width = getImageSize(columnWidth)
  const height = Math.round(width * aspectRatio)

  const src1x = `${downloadUrl}?w=${width}&h=${height}`
  const src2x = `${downloadUrl}?w=${width * 2}&h=${height * 2}`

  return `${src1x} 1x, ${src2x} 2x`
}

export async function downloadImage(url: string, filenameBase: string) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${filenameBase}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}
