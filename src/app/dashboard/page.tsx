'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBooking';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { formatDate, formatDateRange } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { useCancelBooking } from '@/hooks/useBooking';
import { ROUTES } from '@/constants/routes';
import { BookingStatus } from '@/types/booking';

// CSR — personal data, auth required, no SEO
const statusVariantMap: Record<BookingStatus, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data: bookings, isLoading } = useBookings(user?.id ?? '');
  const { mutate: cancelBooking, isPending } = useCancelBooking();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  return (
    <PageWrapper>
      <div className="mb-8 flex items-center gap-4">
        <Avatar
          src={user?.avatar}
          alt={user?.name ?? 'User'}
          fallback={user?.name}
          size="lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <section aria-labelledby="bookings-heading">
        <div className="flex items-center justify-between mb-5">
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
            Book New Session
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" label="Loading your bookings..." />
          </div>
        ) : !bookings?.length ? (
          <div className="text-center py-16 text-gray-500">
            <p className="mb-4">No bookings yet.</p>
            <Button onClick={() => router.push(ROUTES.TEACHERS)}>
              Find a Teacher
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                aria-label={`Booking on ${formatDate(booking.scheduledAt)}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">
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
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {formatPrice(booking.totalAmount, booking.currency)}
                  </p>
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
  );
}
