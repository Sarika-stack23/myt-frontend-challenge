import { Session } from '@/types/session'

const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    teacherId: '1',
    startTime: '2026-05-01T09:00:00Z',
    endTime: '2026-05-01T10:00:00Z',
    duration: 60,
    status: 'available',
    price: 60,
    currency: 'USD',
  },
  {
    id: 's2',
    teacherId: '1',
    startTime: '2026-05-02T11:00:00Z',
    endTime: '2026-05-02T12:00:00Z',
    duration: 60,
    status: 'available',
    price: 60,
    currency: 'USD',
  },
  {
    id: 's3',
    teacherId: '1',
    startTime: '2026-05-03T14:00:00Z',
    endTime: '2026-05-03T15:00:00Z',
    duration: 60,
    status: 'booked',
    price: 60,
    currency: 'USD',
  },
  {
    id: 's4',
    teacherId: '2',
    startTime: '2026-05-01T10:00:00Z',
    endTime: '2026-05-01T11:00:00Z',
    duration: 60,
    status: 'available',
    price: 45,
    currency: 'USD',
  },
  {
    id: 's5',
    teacherId: '2',
    startTime: '2026-05-02T13:00:00Z',
    endTime: '2026-05-02T14:00:00Z',
    duration: 60,
    status: 'available',
    price: 45,
    currency: 'USD',
  },
  {
    id: 's6',
    teacherId: '3',
    startTime: '2026-05-01T08:00:00Z',
    endTime: '2026-05-01T09:00:00Z',
    duration: 60,
    status: 'available',
    price: 55,
    currency: 'USD',
  },
  {
    id: 's7',
    teacherId: '4',
    startTime: '2026-05-03T09:00:00Z',
    endTime: '2026-05-03T10:00:00Z',
    duration: 60,
    status: 'available',
    price: 35,
    currency: 'USD',
  },
  {
    id: 's8',
    teacherId: '5',
    startTime: '2026-05-01T15:00:00Z',
    endTime: '2026-05-01T16:00:00Z',
    duration: 60,
    status: 'available',
    price: 80,
    currency: 'USD',
  },
  {
    id: 's9',
    teacherId: '6',
    startTime: '2026-05-02T08:00:00Z',
    endTime: '2026-05-02T09:00:00Z',
    duration: 60,
    status: 'available',
    price: 40,
    currency: 'USD',
  },
]

export const sessionService = {
  getByTeacher: async (teacherId: string): Promise<Session[]> => {
    await new Promise((r) => setTimeout(r, 300))
    return MOCK_SESSIONS.filter((s) => s.teacherId === teacherId)
  },

  getById: async (id: string): Promise<Session> => {
    await new Promise((r) => setTimeout(r, 200))
    const session = MOCK_SESSIONS.find((s) => s.id === id)
    if (!session) throw new Error('Session not found')
    return session
  },
}
