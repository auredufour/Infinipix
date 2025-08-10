import { css } from 'styled-components'

export const headerCssRules = css`
  align-items: center;
  background-color: ${({ theme }) => theme.colors['app-bg']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['outline']};
  color: ${({ theme }) => theme.colors['strong-fg']};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[32]}`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
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
