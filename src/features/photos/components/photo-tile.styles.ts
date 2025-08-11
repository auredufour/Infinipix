import { css } from 'styled-components'

export const tileFigureCssRules = css<{ width: number; height: number }>`
  aspect-ratio: ${({ width, height }) => `${width} / ${height}`};
  border-radius: ${({ theme }) => theme.radius.surface};
  display: flex;
  overflow: hidden;
  position: relative;
`

export const tileActionContainerCssRules = css`
  ${({ theme }) => `
    --overlay-color: ${theme.colors['overlay-bg']};
  `}

  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  margin-bottom: ${({ theme }) => `-${theme.spacings[12]}`};
  opacity: 0;
  padding: ${({ theme }) => theme.spacings[16]};
  position: absolute;
  right: 0;
  transition:
    opacity 0.25s,
    margin-bottom 0.25s;
  visibility: hidden;

  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--overlay-color) 80%, transparent) 0%,
    color-mix(in srgb, var(--overlay-color) 60%, transparent) 25%,
    color-mix(in srgb, var(--overlay-color) 40%, transparent) 45%,
    transparent 80%
  );
`
