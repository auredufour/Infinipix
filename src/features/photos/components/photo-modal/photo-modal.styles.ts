import styled from 'styled-components'

import { DSButton } from '../../../../components/shared/button/button.component'

export const SCContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

// Header ------------------------------------------------------------

export const SCHeaderBar = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const SCAuthorInfo = styled.div`
  align-items: start;
  display: flex;
  column-gap: ${({ theme }) => theme.spacings['element-gap-sm']};

  @media (min-width: 576px) {
    column-gap: ${({ theme }) => theme.spacings['element-gap-sm']};
    align-items: center;
  }
`

export const SCButtonGroupHeader = styled.div`
  column-gap: ${({ theme }) => theme.spacings['element-gap-sm']};
  display: none;

  @media (min-width: 576px) {
    display: flex;
  }
`

// Image Section ------------------------------------------------------------

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
  margin-top: ${({ theme }) => theme.spacings['section-gap']};
  max-height: 100%;
  max-width: 80%;
  position: relative;
  width: 80%;
  flex: 1;
`

export const SCSkeletonOverlay = styled.div`
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
`

// Footer ------------------------------------------------------------

export const SCFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacings['section-gap']};
`

export const SCMetaInfo = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors['emphasis-medium-fg']};
  column-gap: ${({ theme }) => theme.spacings['element-gap-lg']};
  display: flex;
`

export const SCMetaItem = styled.span`
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings['element-gap-xs']};
  display: inline-flex;
`

export const SCButtonDownloadFooter = styled(DSButton)`
  display: flex;

  @media (min-width: 576px) {
    display: none;
  }
`
