import api from './api';
import { Booking, BookingPayload } from '@/types/booking';

export const bookingService = {
  create: async (payload: BookingPayload): Promise<Booking> => {
    const { data } = await api.post('/bookings', payload);
    return data;
  },

  getByUser: async (userId: string): Promise<Booking[]> => {
    const { data } = await api.get(`/bookings`, { params: { userId } });
    return data;
  },

  cancel: async (bookingId: string): Promise<Booking> => {
    const { data } = await api.patch(`/bookings/${bookingId}/cancel`);
    return data;
  },
};
