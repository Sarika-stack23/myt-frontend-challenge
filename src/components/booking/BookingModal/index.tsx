import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import SessionSlot from '@/components/booking/SessionSlot'
import { PaymentSummary } from '@/components/booking/PaymentSummary'
import { Teacher } from '@/types/teacher'
import { Session } from '@/types/session'
import { useSessions } from '@/hooks/useSession'
import { useCreateBooking } from '@/hooks/useBooking'
import { useUserStore } from '@/store'
import { calculateTax, calculateTotal } from '@/utils/formatPrice'

export interface BookingModalProps {
  teacher: Teacher
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const BookingModal = ({
  teacher,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const { user } = useUserStore()
  const { data: sessions, isLoading } = useSessions(teacher.id)
  const { mutate: createBooking, isPending } = useCreateBooking()

  const tax = selectedSession ? calculateTax(selectedSession.price) : 0
  const total = selectedSession ? calculateTotal(selectedSession.price, tax) : 0

  const handleConfirm = () => {
    if (!selectedSession || !user) return
    createBooking(
      {
        teacherId: teacher.id,
        sessionId: selectedSession.id,
        userId: user.id,
      },
      {
        onSuccess: () => {
          setSelectedSession(null)
          onSuccess?.()
          onClose()
        },
      }
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book a session with ${teacher.name}`}
      size="lg"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading available sessions...
          </div>
        ) : sessions?.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
            No available sessions at the moment.
          </p>
        ) : (
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '12px',
            }}>
              Select a time slot
            </h4>
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
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

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid #e2e8f0',
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
            disabled={!selectedSession || isPending}
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: !selectedSession || isPending ? '#d1fae5' : '#16a34a',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: !selectedSession || isPending ? 'not-allowed' : 'pointer',
            }}
          >
            {isPending ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default BookingModal
