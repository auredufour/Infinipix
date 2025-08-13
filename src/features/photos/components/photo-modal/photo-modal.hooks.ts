import { useCallback, useState } from 'react'

export const useImageLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOnLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { isLoaded, handleOnLoad }
}
