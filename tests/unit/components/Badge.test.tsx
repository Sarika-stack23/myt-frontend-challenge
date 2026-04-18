import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders label correctly', () => {
    render(<Badge label="Available" />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders all variants without error', () => {
    const variants = ['success', 'warning', 'error', 'info', 'neutral'] as const
    variants.forEach(variant => {
      const { unmount } = render(<Badge label="Test" variant={variant} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom className', () => {
    render(<Badge label="Test" className="custom-class" />)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })
})
