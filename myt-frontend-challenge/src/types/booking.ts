export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  userId: string;
  teacherId: string;
  sessionId: string;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  scheduledAt: string;
}

export interface BookingPayload {
  teacherId: string;
  sessionId: string;
  userId: string;
}

export interface PaymentSummary {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
}
