'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAuth } from '@/hooks/useAuth'
import { useBookings, useCancelBooking } from '@/hooks/useBooking'
import { formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import { ROUTES } from '@/constants/routes'
import { BookingStatus } from '@/types/booking'

const statusColors: Record<BookingStatus, { bg: string; color: string }> = {
  confirmed: { bg: '#dcfce7', color: '#166534' },
  pending: { bg: '#fef9c3', color: '#854d0e' },
  cancelled: { bg: '#fee2e2', color: '#991b1b' },
  completed: { bg: '#dbeafe', color: '#1e40af' },
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { data: bookings, isLoading } = useBookings(user?.id ?? '')
  const { mutate: cancelBooking, isPending } = useCancelBooking()

  useEffect(() => {
    if (!isAuthenticated) router.push(ROUTES.HOME)
  }, [isAuthenticated, router])

  return (
    <PageWrapper>
      {/* Profile Card */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        border: '1px solid #bbf7d0',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#16a34a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 800,
          flexShrink: 0,
        }}>
          {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
            Welcome back, {user?.name} 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Bookings */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
          Your Bookings
        </h2>
        <button
          onClick={() => router.push(ROUTES.TEACHERS)}
          style={{
            background: '#16a34a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + Book New Session
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          Loading your bookings...
        </div>
      ) : !bookings?.length ? (
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #f1f5f9',
          padding: '60px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>📅</p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
            No bookings yet
          </p>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Book your first session with an expert teacher
          </p>
          <button
            onClick={() => router.push(ROUTES.TEACHERS)}
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Find a Teacher
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map((booking) => (
            <article
              key={booking.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  🧘
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '15px' }}>
                      {formatDate(booking.scheduledAt)}
                    </span>
                    <span style={{
                      background: statusColors[booking.status].bg,
                      color: statusColors[booking.status].color,
                      borderRadius: '999px',
                      padding: '2px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}>
                      {booking.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Booked on {formatDate(booking.createdAt)}
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a', marginTop: '2px' }}>
                    {formatPrice(booking.totalAmount, booking.currency)}
                  </p>
                </div>
              </div>

              {(booking.status === 'confirmed' || booking.status === 'pending') && (
                <button
                  disabled={isPending}
                  onClick={() => cancelBooking(booking.id)}
                  style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
