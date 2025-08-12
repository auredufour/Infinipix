import styled from 'styled-components'

export const SCContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const SCHeaderBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const SCAuthorInfo = styled.div`
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings[8]};
  display: flex;
`

export const SCButtonGroup = styled.div`
  column-gap: ${({ theme }) => theme.spacings[8]};
  display: flex;
`

export const SCImageSection = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 0;
`

export const SCImageWrapper = styled.div<{ $width: number; $height: number }>`
  align-items: center;
  aspect-ratio: ${({ $width, $height }) => `${$width} / ${$height}`};
  display: flex;
  height: auto;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacings[40]};
  max-height: 100%;
  max-width: 80%;
  position: relative;
  width: 80%;
`

export const SCSkeletonOverlay = styled.div`
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
`

export const SCFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacings[24]};
`

export const SCMetaInfo = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors['soft-fg']};
  column-gap: ${({ theme }) => theme.spacings[16]};
  display: flex;
`

export const SCMetaItem = styled.span`
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings[4]};
  display: inline-flex;
`

export const SCFooterActions = styled.div`
  column-gap: ${({ theme }) => theme.spacings[8]};
  display: flex;
  padding-top: ${({ theme }) => theme.spacings[16]};
`
