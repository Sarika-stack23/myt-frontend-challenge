'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import { useBookingStore } from '@/store'
import { useAuth } from '@/hooks/useAuth'
import { PaymentSummary } from '@/components/booking/PaymentSummary'
import { formatDate, formatDateRange } from '@/utils/formatDate'
import { calculateTax, calculateTotal } from '@/utils/formatPrice'
import { useCreateBooking } from '@/hooks/useBooking'
import { ROUTES } from '@/constants/routes'

export default function BookingPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { selectedSession, reset } = useBookingStore()
  const { mutate: createBooking, isPending, isSuccess } = useCreateBooking()

  useEffect(() => {
    if (!isAuthenticated) router.push(ROUTES.HOME)
  }, [isAuthenticated, router])

  if (!selectedSession) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧘</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            No session selected
          </h1>
          <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '16px' }}>
            Please select a session from the teachers page.
          </p>
          <button
            onClick={() => router.push(ROUTES.TEACHERS)}
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Browse Teachers
          </button>
        </div>
      </PageWrapper>
    )
  }

  const tax = calculateTax(selectedSession.price)
  const total = calculateTotal(selectedSession.price, tax)

  const handleConfirm = () => {
    if (!user) return
    createBooking({
      teacherId: selectedSession.teacherId,
      sessionId: selectedSession.id,
      userId: user.id,
    })
  }

  if (isSuccess) {
    return (
      <PageWrapper>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            margin: '0 auto 24px',
          }}>
            ✅
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '16px' }}>
            Your session has been booked successfully. Check your dashboard for details.
          </p>
          <button
            onClick={() => { reset(); router.push(ROUTES.DASHBOARD) }}
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Go to Dashboard →
          </button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Confirm Booking
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>
            Review your session details before confirming.
          </p>
        </div>

        {/* Session Details Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          padding: '24px',
          marginBottom: '20px',
        }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px',
          }}>
            Session Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: '📅 Date', value: formatDate(selectedSession.startTime) },
              { label: '🕐 Time', value: formatDateRange(selectedSession.startTime, selectedSession.endTime) },
              { label: '⏱ Duration', value: `${selectedSession.duration} minutes` },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: '#f8fafc',
                borderRadius: '10px',
              }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>{label}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <PaymentSummary
          summary={{
            subtotal: selectedSession.price,
            tax,
            total,
            currency: selectedSession.currency,
          }}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => { reset(); router.push(ROUTES.TEACHERS) }}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
              background: '#ffffff',
              color: '#374151',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={handleConfirm}
            style={{
              flex: 2,
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: isPending
                ? '#86efac'
                : 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              cursor: isPending ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
            }}
          >
            {isPending ? 'Processing...' : 'Confirm & Pay →'}
          </button>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#94a3b8',
          marginTop: '16px',
        }}>
          🔒 Secure payment · Cancel anytime before 24h
        </p>
      </div>
    </PageWrapper>
  )
}
