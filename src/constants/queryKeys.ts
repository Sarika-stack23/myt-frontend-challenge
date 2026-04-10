export const QUERY_KEYS = {
  TEACHERS: ['teachers'] as const,
  TEACHER: (id: string) => ['teachers', id] as const,
  SESSIONS: (teacherId: string) => ['sessions', teacherId] as const,
  BOOKINGS: (userId: string) => ['bookings', userId] as const,
  USER: ['user'] as const,
} as const;
