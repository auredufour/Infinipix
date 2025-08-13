import '@testing-library/jest-dom'

import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSButtonIcon } from './button-icon.component'

describe('DSButtonIcon', () => {
  it('renders icon with accessible label', async () => {
    renderWithTheme(<DSButtonIcon name="airplay" ariaLabel="airplay" />)

    const btn = await screen.findByRole('button', { name: 'airplay' })
    expect(btn).toBeInTheDocument()
  })
})
