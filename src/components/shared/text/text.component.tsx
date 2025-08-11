import styled from 'styled-components'

import { textCssRules } from './text.styles'
import type { DSTextProps } from './text.types'

const StyledText = styled.p.withConfig({
  shouldForwardProp: (prop) => !['color', 'size', 'weight'].includes(prop),
})<DSTextProps>`
  ${textCssRules}
`

export const DSText = ({ children, ...props }: DSTextProps) => {
  return <StyledText {...props}>{children}</StyledText>
}

DSText.displayName = 'DSText'
