const IMAGE_SIZES_MAP = {
  200: 200,
  300: 280,
  400: 360,
  500: 440,
  600: 520,
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
    const src1_5x = `https://picsum.photos/id/${id}/${Math.round(width * 1.25)}/${Math.round(height * 1.25)}`
    return `${src1x} 1x, ${src1_5x} 1.25x`
  }
  const src1x = `${downloadUrl}?w=${width}&h=${height}`
  const src1_5x = `${downloadUrl}?w=${Math.round(width * 1.25)}&h=${Math.round(height * 1.25)}`
  return `${src1x} 1x, ${src1_5x} 1.25x`
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
