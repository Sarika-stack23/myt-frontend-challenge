import { Session } from '@/types/session';
import { formatDateRange, formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { clsx } from 'clsx';
import { Clock } from 'lucide-react';

export interface SessionSlotProps {
  session: Session;
  onSelect: (session: Session) => void;
  isSelected?: boolean;
}

export const SessionSlot = ({
  session,
  onSelect,
  isSelected = false,
}: SessionSlotProps) => {
  const isAvailable = session.status === 'available';

  return (
    <button
      onClick={() => isAvailable && onSelect(session)}
      disabled={!isAvailable}
      aria-pressed={isSelected}
      aria-label={`Session on ${formatDate(session.startTime)}, ${formatDateRange(
        session.startTime,
        session.endTime
      )}, ${formatPrice(session.price, session.currency)}`}
      className={clsx(
        'w-full text-left p-4 rounded-xl border-2 transition-all',
        'focus:outline-none focus:ring-2 focus:ring-green-500',
        isAvailable
          ? isSelected
            ? 'border-green-600 bg-green-50'
            : 'border-gray-200 hover:border-green-400 bg-white'
          : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(session.startTime)}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
            <Clock size={12} aria-hidden="true" />
            {formatDateRange(session.startTime, session.endTime)}
            <span className="ml-1">({session.duration} min)</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {formatPrice(session.price, session.currency)}
          </p>
          <p
            className={clsx(
              'text-xs mt-0.5',
              isAvailable ? 'text-green-600' : 'text-gray-400'
            )}
          >
            {isAvailable ? 'Available' : session.status}
          </p>
        </div>
      </div>
    </button>
  );
};

export default SessionSlot;
