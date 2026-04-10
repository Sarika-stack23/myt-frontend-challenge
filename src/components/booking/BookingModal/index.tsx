import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import SessionSlot from '@/components/booking/SessionSlot';
import { PaymentSummary } from '@/components/booking/PaymentSummary';
import { Teacher } from '@/types/teacher';
import { Session } from '@/types/session';
import { useSessions } from '@/hooks/useSession';
import { useCreateBooking } from '@/hooks/useBooking';
import { useUserStore } from '@/store';
import { calculateTax, calculateTotal } from '@/utils/formatPrice';
import Spinner from '@/components/ui/Spinner';

export interface BookingModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BookingModal = ({
  teacher,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { user } = useUserStore();
  const { data: sessions, isLoading } = useSessions(teacher.id);
  const { mutate: createBooking, isPending } = useCreateBooking();

  const tax = selectedSession
    ? calculateTax(selectedSession.price)
    : 0;
  const total = selectedSession
    ? calculateTotal(selectedSession.price, tax)
    : 0;

  const handleConfirm = () => {
    if (!selectedSession || !user) return;
    createBooking(
      {
        teacherId: teacher.id,
        sessionId: selectedSession.id,
        userId: user.id,
      },
      {
        onSuccess: () => {
          setSelectedSession(null);
          onSuccess?.();
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book a session with ${teacher.name}`}
      size="lg"
    >
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <Spinner label="Loading available sessions..." />
        ) : sessions?.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No available sessions at the moment.
          </p>
        ) : (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Select a time slot
            </h4>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
              {sessions?.map((session) => (
                <SessionSlot
                  key={session.id}
                  session={session}
                  onSelect={setSelectedSession}
                  isSelected={selectedSession?.id === session.id}
                />
              ))}
            </div>
          </div>
        )}

        {selectedSession && (
          <PaymentSummary
            summary={{
              subtotal: selectedSession.price,
              tax,
              total,
              currency: selectedSession.currency,
            }}
          />
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={!selectedSession}
            isLoading={isPending}
            onClick={handleConfirm}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
