import { css } from 'styled-components'

export const headerContainerCssRules = css`
  border-bottom: 1px solid ${({ theme }) => theme.colors['outline']};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors['app-bg']};
`

export const headerCssRules = css`
  align-items: center;
  color: ${({ theme }) => theme.colors['strong-fg']};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[32]}`};
  min-height: 80px;
  max-width: 1600px;
  margin: 0 auto;
`

export const headerMenuCssRules = css`
  @media (min-width: 768px) {
    display: none;
  }
`
export const headerNavListCssRules = css`
  column-gap: ${({ theme }) => theme.spacings[16]}px;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

export const headerLogoCssRules = css`
  height: 40px;
`
