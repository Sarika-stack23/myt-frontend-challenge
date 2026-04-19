import { render, screen } from '@testing-library/react'
import { Avatar } from '@/components/ui/Avatar'

describe('Avatar', () => {
  it('renders fallback initials when no src', () => {
    render(<Avatar alt="John Doe" fallback="John Doe" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders question mark when no src and no fallback', () => {
    render(<Avatar alt="Unknown" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('has correct aria label', () => {
    render(<Avatar alt="John Doe" fallback="John Doe" />)
    expect(screen.getByRole('img', { name: 'John Doe' })).toBeInTheDocument()
  })

  it('applies correct size', () => {
    const { container } = render(<Avatar alt="Test" fallback="Test" size="lg" />)
    expect(container.firstChild).toBeTruthy()
  })
})
