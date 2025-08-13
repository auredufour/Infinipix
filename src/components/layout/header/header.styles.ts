import styled from 'styled-components'

export const SCContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors['outline']};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors['app-bg']};
`

export const SCHeader = styled.header`
  --header-height: 80px;

  align-items: center;
  color: ${({ theme }) => theme.colors['emphasis-high-fg']};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.spacings['20']} ${theme.spacings['page-gutter']} ${theme.spacings['12']}`};
  min-height: var(--header-height);
  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  margin: 0 auto;
`

export const SCLogo = styled.img`
  height: ${({ theme }) => theme.spacings['40']};
`
