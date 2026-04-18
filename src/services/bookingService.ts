import { Booking, BookingPayload } from '@/types/booking'

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    userId: '1',
    teacherId: '1',
    sessionId: 's1',
    status: 'confirmed',
    totalAmount: 66,
    currency: 'USD',
    createdAt: '2026-04-01T10:00:00Z',
    scheduledAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'b2',
    userId: '1',
    teacherId: '2',
    sessionId: 's4',
    status: 'completed',
    totalAmount: 49.5,
    currency: 'USD',
    createdAt: '2026-03-15T10:00:00Z',
    scheduledAt: '2026-04-01T10:00:00Z',
  },
]

export const bookingService = {
  create: async (payload: BookingPayload): Promise<Booking> => {
    await new Promise((r) => setTimeout(r, 800))
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      userId: payload.userId,
      teacherId: payload.teacherId,
      sessionId: payload.sessionId,
      status: 'confirmed',
      totalAmount: 66,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      scheduledAt: new Date().toISOString(),
    }
    MOCK_BOOKINGS.push(newBooking)
    return newBooking
  },

  getByUser: async (userId: string): Promise<Booking[]> => {
    await new Promise((r) => setTimeout(r, 400))
    return MOCK_BOOKINGS.filter((b) => b.userId === userId)
  },

  cancel: async (bookingId: string): Promise<Booking> => {
    await new Promise((r) => setTimeout(r, 400))
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (!booking) throw new Error('Booking not found')
    booking.status = 'cancelled'
    return booking
  },
}
