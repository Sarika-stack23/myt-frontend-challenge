import { render, screen } from '@testing-library/react'
import { Avatar } from '@/components/ui/Avatar'

describe('Avatar', () => {
  it('renders fallback initials when no src', () => {
    render(<Avatar alt="John Doe" fallback="John Doe" />)
    expect(screen.getByText('JO')).toBeInTheDocument()
  })

  it('renders image when src provided', () => {
    render(<Avatar src="/test.jpg" alt="John Doe" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders question mark when no src and no fallback', () => {
    render(<Avatar alt="Unknown" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { container } = render(<Avatar alt="Test" fallback="Test" size="lg" />)
    expect(container.firstChild).toHaveClass('w-16')
  })
})
