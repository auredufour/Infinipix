import styled from 'styled-components'

import { gridCssRules } from './grid.styles'
import type { DSGridProps } from './grid.types'
import { DSGridCell } from './subcomponents/grid-cell.component'

const StyledGrid = styled.div`
  ${gridCssRules}
`

const InternalDSGrid = ({ children }: DSGridProps) => {
  return <StyledGrid>{children}</StyledGrid>
}

InternalDSGrid.displayName = 'DSGrid'

export const DSGrid = Object.assign(InternalDSGrid, {
  Cell: DSGridCell,
})
