import { useCallback } from 'react'

import { downloadImage } from './photo-card.utils'

export const useDownloadHandler = (downloadUrl: string, author: string) => {
  return useCallback(
    async (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault()
      evt.stopPropagation()

      try {
        await downloadImage(downloadUrl, `infinipix-${author}`)
      } catch {
        window.open(downloadUrl, '_blank', 'noopener')
      }
    },
    [downloadUrl, author],
  )
}
