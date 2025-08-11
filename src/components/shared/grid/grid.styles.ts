import { css } from 'styled-components'

import type { GridCellProps } from './grid.types'

export const gridCssRules = css`
  column-count: 1;
  column-gap: ${({ theme }) => theme.spacings[24]};
  width: 100%;

  @media (min-width: 576px) {
    column-count: 2;
  }

  @media (min-width: 992px) {
    column-count: 3;
  }
`

export const cellCssRules = css<GridCellProps>`
  box-sizing: border-box;
  break-inside: avoid-column;
  margin-bottom: ${({ theme }) => theme.spacings[24]};
  page-break-inside: avoid;

  -webkit-column-break-inside: avoid;
`
