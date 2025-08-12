import '@testing-library/jest-dom'

import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSIcon } from './icon.component'

describe('DSIcon', () => {
  it('renders an svg', async () => {
    renderWithTheme(<DSIcon name="lock" aria-label="lock" />)

    const icon = await screen.findByLabelText('lock')
    expect(icon).toBeTruthy()
  })
})
