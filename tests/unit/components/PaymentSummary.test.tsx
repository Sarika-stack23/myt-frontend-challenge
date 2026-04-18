import { render, screen } from '@testing-library/react'
import { PaymentSummary } from '@/components/booking/PaymentSummary'

const mockSummary = {
  subtotal: 50,
  tax: 5,
  total: 55,
  currency: 'USD',
}

describe('PaymentSummary', () => {
  it('renders payment summary heading', () => {
    render(<PaymentSummary summary={mockSummary} />)
    expect(screen.getByText('Payment Summary')).toBeInTheDocument()
  })

  it('renders subtotal amount', () => {
    render(<PaymentSummary summary={mockSummary} />)
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
  })

  it('renders tax amount', () => {
    render(<PaymentSummary summary={mockSummary} />)
    expect(screen.getByText('Tax (10%)')).toBeInTheDocument()
  })

  it('renders total amount', () => {
    render(<PaymentSummary summary={mockSummary} />)
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('has correct aria label', () => {
    render(<PaymentSummary summary={mockSummary} />)
    expect(screen.getByRole('region', { name: /payment summary/i })).toBeInTheDocument()
  })
})
