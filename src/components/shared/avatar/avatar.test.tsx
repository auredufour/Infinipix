import { renderWithTheme, screen } from '../../../../tests/test-utils.tsx'
import { DSAvatar } from './avatar.component.tsx'

describe('DSAvatar', () => {
  it('renders initials when name is provided', () => {
    renderWithTheme(<DSAvatar name="John Doe" />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
