import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/bookingService';
import { BookingPayload } from '@/types/booking';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useBookings = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.BOOKINGS(userId),
    queryFn: () => bookingService.getByUser(userId),
    enabled: !!userId,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookingPayload) => bookingService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEACHERS });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => bookingService.cancel(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEACHERS });
    },
  });
};
