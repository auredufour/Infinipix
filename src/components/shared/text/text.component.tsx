import { SCText } from './text.styles'
import type { DSTextProps } from './text.types'

export const DSText = ({ children, ...props }: DSTextProps) => {
  return <SCText {...props}>{children}</SCText>
}

DSText.displayName = 'DSText'
