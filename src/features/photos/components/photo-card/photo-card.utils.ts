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

  const idMatch = downloadUrl.match(/\/id\/(\d+)\//)

  if (idMatch) {
    const id = idMatch[1]
    return `https://picsum.photos/id/${id}/${width}/${height}`
  }

  return `${downloadUrl}?w=${width}&h=${height}`
}

export function getSrcSet(
  downloadUrl: string,
  columnWidth: number,
  aspectRatio: number,
): string {
  const width = getImageSize(columnWidth)
  const height = Math.round(width * aspectRatio)

  const idMatch = downloadUrl.match(/\/id\/(\d+)\//)

  if (idMatch) {
    const id = idMatch[1]
    const src1x = `https://picsum.photos/id/${id}/${width}/${height}`
    const src2x = `https://picsum.photos/id/${id}/${width * 2}/${height * 2}`
    return `${src1x} 1x, ${src2x} 2x`
  }

  const src1x = `${downloadUrl}?w=${width}&h=${height}`
  const src2x = `${downloadUrl}?w=${width * 2}&h=${height * 2}`
  return `${src1x} 1x, ${src2x} 2x`
}

export async function downloadImage(url: string, filenameBase: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = objectUrl
  link.download = `${filenameBase}.jpg`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(objectUrl)
}
