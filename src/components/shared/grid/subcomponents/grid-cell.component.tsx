import styled from 'styled-components'

import { cellCssRules } from '../grid.styles'
import type { GridCellProps } from '../grid.types'

const StyledCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['height'].includes(prop as string),
})`
  ${cellCssRules}
`

export const DSGridCell = ({ children, ...rest }: GridCellProps) => (
  <StyledCell {...rest}>{children}</StyledCell>
)
