import { renderWithTheme, screen } from '../../../../tests/test-utils.tsx'
import { DSModal } from './modal.component.tsx'

describe('DSModal', () => {
  it('renders children', () => {
    renderWithTheme(<DSModal state="active">Hello</DSModal>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })
})
