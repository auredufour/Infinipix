import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSSkeleton } from './skeleton.component'

describe('DSSkeleton', () => {
  it('renders skeleton when state is loading', () => {
    renderWithTheme(<DSSkeleton state="loading" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('does not render when state is inactive', () => {
    renderWithTheme(<DSSkeleton state="inactive" />)
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    renderWithTheme(<DSSkeleton state="loading" />)
    const skeleton = screen.getByRole('progressbar')
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content')
    expect(skeleton).toHaveAttribute('aria-busy', 'true')
  })

  it('supports width and height props', () => {
    renderWithTheme(<DSSkeleton state="loading" width={100} height="50px" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})
