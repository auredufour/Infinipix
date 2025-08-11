export async function downloadImage(url: string, filenameBase: string) {
  const res = await fetch(url, { mode: 'cors', cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Download failed: ${res.status}`)
  }

  const contentType = res.headers.get('content-type') || ''
  const extension = contentType.includes('png')
    ? 'png'
    : contentType.includes('webp')
      ? 'webp'
      : 'jpg'

  const blob = await res.blob()
  const blobUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = blobUrl
  link.download = `${filenameBase}.${extension}`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(blobUrl)
}
