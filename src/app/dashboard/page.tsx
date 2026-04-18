'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAuth } from '@/hooks/useAuth'
import { useBookings } from '@/hooks/useBooking'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import { useCancelBooking } from '@/hooks/useBooking'
import { ROUTES } from '@/constants/routes'
import { BookingStatus } from '@/types/booking'

const statusVariantMap: Record
  BookingStatus,
  'success' | 'warning' | 'error' | 'info' | 'neutral'
> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { data: bookings, isLoading } = useBookings(user?.id ?? '')
  const { mutate: cancelBooking, isPending } = useCancelBooking()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.HOME)
    }
  }, [isAuthenticated, router])

  return (
    <PageWrapper>
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex items-center gap-5">
        <Avatar
          src={user?.avatar}
          alt={user?.name ?? 'User'}
          fallback={user?.name}
          size="xl"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          <p className="text-gray-400 text-xs mt-1">{user?.timezone}</p>
        </div>
      </div>

      {/* Bookings Section */}
      <section aria-labelledby="bookings-heading">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="bookings-heading"
            className="text-xl font-semibold text-gray-900"
          >
            Your Bookings
          </h2>
          <Button
            size="sm"
            onClick={() => router.push(ROUTES.TEACHERS)}
          >
            + Book New Session
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" label="Loading your bookings..." />
          </div>
        ) : !bookings?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-gray-600 font-medium mb-2">No bookings yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Book your first session with an expert teacher
            </p>
            <Button onClick={() => router.push(ROUTES.TEACHERS)}>
              Find a Teacher
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                aria-label={`Booking on ${formatDate(booking.scheduledAt)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 rounded-xl p-3 text-2xl">
                    🧘
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-gray-900">
                        {formatDate(booking.scheduledAt)}
                      </p>
                      <Badge
                        label={booking.status}
                        variant={statusVariantMap[booking.status]}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Booked on {formatDate(booking.createdAt)}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatPrice(booking.totalAmount, booking.currency)}
                    </p>
                  </div>
                </div>

                {booking.status === 'confirmed' ||
                booking.status === 'pending' ? (
                  <Button
                    variant="danger"
                    size="sm"
                    isLoading={isPending}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  )
}
