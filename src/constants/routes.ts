export const ROUTES = {
  HOME: '/',
  TEACHERS: '/teachers',
  TEACHER_DETAIL: (id: string) => `/teachers/${id}`,
  BOOKING: '/booking',
  DASHBOARD: '/dashboard',
} as const;
