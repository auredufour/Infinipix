import { render, screen } from '@testing-library/react'

import { DSSkeleton } from './skeleton.component.tsx'

describe('DSSkeleton', () => {
  it('renders children', () => {
    render(<DSSkeleton>Hello</DSSkeleton>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
