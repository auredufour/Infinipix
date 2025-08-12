import { renderWithTheme, screen } from '../../../../tests/test-utils.tsx'
import { DSInput } from './input.component.tsx'

describe('DSInput', () => {
  it('renders children', () => {
    renderWithTheme(<DSInput label="Search" hideLabel />)

    expect(screen.getByRole('textbox')).toBeTruthy()
  })
})
