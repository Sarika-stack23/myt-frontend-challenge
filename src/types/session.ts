export type SessionStatus = 'available' | 'booked' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: SessionStatus;
  price: number;
  currency: string;
}

export interface SessionSlotProps {
  session: Session;
  onSelect: (session: Session) => void;
  isSelected?: boolean;
}
