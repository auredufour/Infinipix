import styled from 'styled-components'

import { DSButton } from '../../../../components/shared/button/button.component'
import { DSModal } from '../../../../components/shared/modal/modal.component'

export const SCCardContainer = styled.div<{ width: number; height: number }>`
  border-radius: ${({ theme }) => theme.radius.lg};
  position: relative;
  height: ${({ height }) => height}px;
  overflow: hidden;
  width: ${({ width }) => width}px;

  img {
    transition: transform 0.25s ease;
  }

  &:hover img,
  &:focus-within img {
    transform: scale(1.02);
  }

  &:focus-within img {
    outline: 2px solid ${({ theme }) => theme.colors['emphasis-high-fg']};
    outline-style: solid;
    outline-offset: -10px;
    border-radius: ${({ theme }) => theme.radius.xl};
  }
`

export const SCActionContainer = styled.div`
  ${({ theme }) => `
    --overlay-color: ${theme.colors['overlay-bg']};
  `}

  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  margin-bottom: ${({ theme }) => `-${theme.spacings['8']}`};
  opacity: 0;
  padding: ${({ theme }) => theme.spacings['16']};
  position: absolute;
  right: 0;
  visibility: hidden;
  transition:
    opacity 0.25s ease,
    margin-bottom 0.25s ease,
    visibility 0.25s ease;

  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--overlay-color) 80%, transparent) 0%,
    color-mix(in srgb, var(--overlay-color) 60%, transparent) 25%,
    color-mix(in srgb, var(--overlay-color) 40%, transparent) 45%,
    transparent 80%
  );
`

export const SCCard = styled.figure<{ width: number; height: number }>`
  aspect-ratio: ${({ width, height }) => `${width} / ${height}`};
  border-radius: ${({ theme }) => theme.radius.surface};
  display: flex;
  overflow: hidden;
  position: relative;

  &:hover ${SCActionContainer}, &:focus-within ${SCActionContainer} {
    margin-bottom: 0;
    opacity: 1;
    visibility: visible;
  }
`
export const SCModalTrigger = styled(DSModal.Trigger)`
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
  overflow: hidden;
`

export const SCButtonDownload = styled(DSButton)`
  &&:focus-visible,
  &&:focus {
    outline-color: ${({ theme }) => theme.colors['emphasis-high-fg']};
  }
`
