/* eslint-disable react-refresh/only-export-components */

import { render, type RenderOptions } from '@testing-library/react'
import React from 'react'

import { ThemeProvider } from '../src/providers/theme.provider'

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider mode="light">{children}</ThemeProvider>
)

export * from '@testing-library/react'

export const renderWithTheme = (
  ui: React.ReactElement,
  options?: RenderOptions,
) => render(ui, { wrapper: AllProviders, ...options })
