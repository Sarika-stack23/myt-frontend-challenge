import { Session } from '@/types/session'
import { formatDateRange, formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'

export interface SessionSlotProps {
  session: Session
  onSelect: (session: Session) => void
  isSelected?: boolean
}

export const SessionSlot = ({
  session,
  onSelect,
  isSelected = false,
}: SessionSlotProps) => {
  const isAvailable = session.status === 'available'

  return (
    <button
      onClick={() => isAvailable && onSelect(session)}
      disabled={!isAvailable}
      aria-pressed={isSelected}
      aria-label={`Session on ${formatDate(session.startTime)}`}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '16px',
        borderRadius: '12px',
        border: isSelected
          ? '2px solid #16a34a'
          : '2px solid #e2e8f0',
        backgroundColor: isSelected
          ? '#f0fdf4'
          : isAvailable ? '#ffffff' : '#f8fafc',
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        opacity: isAvailable ? 1 : 0.6,
        transition: 'all 0.15s ease',
        marginBottom: '8px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#0f172a',
            marginBottom: '4px',
          }}>
            {formatDate(session.startTime)}
          </p>
          <p style={{
            fontSize: '13px',
            color: '#64748b',
          }}>
            🕐 {formatDateRange(session.startTime, session.endTime)} ({session.duration} min)
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontWeight: 700,
            color: '#0f172a',
            fontSize: '15px',
          }}>
            {formatPrice(session.price, session.currency)}
          </p>
          <p style={{
            fontSize: '12px',
            color: isAvailable ? '#16a34a' : '#94a3b8',
            marginTop: '2px',
          }}>
            {isAvailable ? '✓ Available' : session.status}
          </p>
        </div>
      </div>
    </button>
  )
}

export default SessionSlot
