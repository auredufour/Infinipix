import styled from 'styled-components'

export const SCGridContainer = styled.div`
  width: 100%;
`

export const SCColumnsWrapper = styled.div<{ $gap: number }>`
  display: flex;
  justify-content: center;
  gap: ${({ $gap }) => $gap}px;
`

export const SCColumn = styled.div<{ $gap: number; $width: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
  width: ${({ $width }) => $width}px;
`
