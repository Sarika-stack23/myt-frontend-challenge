import { PaymentSummary as PaymentSummaryType } from '@/types/booking'
import { formatPrice } from '@/utils/formatPrice'

export interface PaymentSummaryProps {
  summary: PaymentSummaryType
  className?: string
}

export const PaymentSummary = ({ summary, className }: PaymentSummaryProps) => {
  return (
    <section
      aria-label="Payment summary"
      className={className}
      style={{
        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        borderRadius: '14px',
        padding: '18px',
        border: '1px solid #bbf7d0',
      }}
    >
      <h3 style={{
        fontSize: '14px',
        fontWeight: 700,
        color: '#166534',
        marginBottom: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Payment Summary
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#475569' }}>Subtotal</span>
          <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>
            {formatPrice(summary.subtotal, summary.currency)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#475569' }}>Tax (10%)</span>
          <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>
            {formatPrice(summary.tax, summary.currency)}
          </span>
        </div>
        <div style={{
          height: '1px',
          background: '#bbf7d0',
          margin: '4px 0',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            Total
          </span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>
            {formatPrice(summary.total, summary.currency)}
          </span>
        </div>
      </div>
    </section>
  )
}

export default PaymentSummary
