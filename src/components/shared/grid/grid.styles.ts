import { css } from 'styled-components'

export const gridCssRules = css`
  width: 100%;
`

export const columnsWrapperCssRules = css<{ gap: number }>`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.gap}px;
`

export const columnCssRules = css<{ gap: number; width: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
  width: ${(props) => props.width}px;
`
