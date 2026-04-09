import { create } from 'zustand';
import { AuthState } from '@/types/user';
import { Session } from '@/types/session';
import { Booking } from '@/types/booking';

interface BookingState {
  selectedSession: Session | null;
  currentBooking: Booking | null;
  isModalOpen: boolean;
  setSelectedSession: (session: Session | null) => void;
  setCurrentBooking: (booking: Booking | null) => void;
  setIsModalOpen: (open: boolean) => void;
  reset: () => void;
}

interface UserState extends AuthState {
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedSession: null,
  currentBooking: null,
  isModalOpen: false,
  setSelectedSession: (session) => set({ selectedSession: session }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  reset: () => set({
    selectedSession: null,
    currentBooking: null,
    isModalOpen: false
  }),
}));

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
