import { memo, useCallback, useState } from 'react'

import { SCErrorFallback, SCImage, SCImageContainer } from './image.styles'
import type { DSImageProps } from './image.types'

export const DSImage = memo(
  ({
    alt = '',
    borderRadius,
    height,
    isLoaded: controlledIsLoaded,
    loading = 'lazy',
    onError,
    onLoad,
    src,
    width,
    ...props
  }: DSImageProps) => {
    const [isLoaded, setIsLoaded] = useState(controlledIsLoaded || false)
    const [hasError, setHasError] = useState(false)

    const aspectRatio = width && height ? width / height : undefined

    const handleOnLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true)
        setHasError(false)

        onLoad?.(event)
      },
      [onLoad],
    )

    const handleOnError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        setHasError(true)
        setIsLoaded(false)

        onError?.(event)
      },
      [onError],
    )

    return (
      <SCImageContainer $aspectRatio={aspectRatio} $borderRadius={borderRadius}>
        {hasError && <SCErrorFallback>Image failed to load</SCErrorFallback>}

        {src && (
          <SCImage
            $borderRadius={borderRadius}
            $isLoaded={isLoaded}
            $aspectRatio={aspectRatio}
            alt={alt}
            loading={loading}
            onError={handleOnError}
            onLoad={handleOnLoad}
            src={src}
            width={width}
            height={height}
            {...props}
          />
        )}
      </SCImageContainer>
    )
  },
)

DSImage.displayName = 'DSImage'
