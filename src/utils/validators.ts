import { z } from 'zod';

export const bookingSchema = z.object({
  teacherId: z.string().min(1, 'Teacher is required'),
  sessionId: z.string().min(1, 'Session is required'),
  userId: z.string().min(1, 'User is required'),
});

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  timezone: z.string().min(1, 'Timezone is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type UserFormData = z.infer<typeof userSchema>;
