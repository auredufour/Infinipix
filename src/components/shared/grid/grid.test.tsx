import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSText } from '../text/text.component'
import { DSGrid } from './grid.component'

describe('DSGrid', () => {
  it('renders children', () => {
    renderWithTheme(
      <DSGrid>
        <DSGrid.Cell>
          <DSText>Hello</DSText>
        </DSGrid.Cell>
      </DSGrid>,
    )

    expect(screen.getByText('Hello')).toBeTruthy()
  })
})
