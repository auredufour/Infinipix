import { type PropsWithChildren, useMemo } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

import { GlobalStyle } from '../styles/global'
import { lightTheme } from '../styles/themes/dark'
import { darkTheme } from '../styles/themes/light'
import type { Mode } from '../styles/themes/types'

type Props = PropsWithChildren<{ mode?: Mode }>

export function ThemeProvider({ mode = 'light', children }: Props) {
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode],
  )

  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {children}
    </SCThemeProvider>
  )
}
