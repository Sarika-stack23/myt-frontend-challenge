'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { useBookingStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { PaymentSummary } from '@/components/booking/PaymentSummary';
import Button from '@/components/ui/Button';
import { formatDate, formatDateRange } from '@/utils/formatDate';
import { calculateTax, calculateTotal } from '@/utils/formatPrice';
import { useCreateBooking } from '@/hooks/useBooking';
import { ROUTES } from '@/constants/routes';

// CSR — auth required, no SEO needed
export default function BookingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    selectedSession,
  
    reset,
  } = useBookingStore();
  const { mutate: createBooking, isPending, isSuccess } = useCreateBooking();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  if (!selectedSession) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No session selected
          </h1>
          <p className="text-gray-600 mb-6">
            Please select a session from the teachers page.
          </p>
          <Button onClick={() => router.push(ROUTES.TEACHERS)}>
            Browse Teachers
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const tax = calculateTax(selectedSession.price);
  const total = calculateTotal(selectedSession.price, tax);

  const handleConfirm = () => {
    if (!user) return;
    createBooking({
      teacherId: selectedSession.teacherId,
      sessionId: selectedSession.id,
      userId: user.id,
    });
  };

  if (isSuccess) {
    return (
      <PageWrapper>
        <div
          role="status"
          aria-live="polite"
          className="text-center py-20"
        >
          <div className="text-5xl mb-4" aria-hidden="true">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Your session has been booked successfully.
          </p>
          <Button onClick={() => { reset(); router.push(ROUTES.DASHBOARD); }}>
            Go to Dashboard
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Confirm Booking
        </h1>

        <section
          aria-label="Session details"
          className="bg-white rounded-2xl border border-gray-200 p-5 mb-5"
        >
          <h2 className="font-semibold text-gray-900 mb-3">Session Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Date</dt>
              <dd className="font-medium">
                {formatDate(selectedSession.startTime)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Time</dt>
              <dd className="font-medium">
                {formatDateRange(
                  selectedSession.startTime,
                  selectedSession.endTime
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Duration</dt>
              <dd className="font-medium">{selectedSession.duration} min</dd>
            </div>
          </dl>
        </section>

        <PaymentSummary
          className="mb-5"
          summary={{
            subtotal: selectedSession.price,
            tax,
            total,
            currency: selectedSession.currency,
          }}
        />

        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => { reset(); router.push(ROUTES.TEACHERS); }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            isLoading={isPending}
            onClick={handleConfirm}
          >
            Confirm & Pay
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
