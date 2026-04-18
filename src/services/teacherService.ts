import { Teacher, TeacherFilters } from '@/types/teacher'

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: '',
    rating: 4.9,
    reviewCount: 234,
    specializations: ['Hatha', 'Vinyasa', 'Yin'],
    experience: 10,
    pricePerSession: 60,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Experienced yoga teacher specializing in Hatha and Vinyasa styles with 10 years of teaching experience.',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    avatar: '',
    rating: 4.7,
    reviewCount: 189,
    specializations: ['Ashtanga', 'Vinyasa'],
    experience: 7,
    pricePerSession: 45,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Dynamic Ashtanga teacher focused on building strength and flexibility through traditional practice.',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Meera Nair',
    avatar: '',
    rating: 4.8,
    reviewCount: 156,
    specializations: ['Yin', 'Restorative', 'Prenatal'],
    experience: 8,
    pricePerSession: 55,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Specialist in gentle and restorative yoga with focus on mindfulness and relaxation techniques.',
    isAvailable: false,
  },
  {
    id: '4',
    name: 'Rahul Verma',
    avatar: '',
    rating: 4.6,
    reviewCount: 98,
    specializations: ['Hatha', 'Ashtanga'],
    experience: 5,
    pricePerSession: 35,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Passionate yoga teacher helping beginners build a strong foundation in Hatha and Ashtanga yoga.',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Sunita Patel',
    avatar: '',
    rating: 5.0,
    reviewCount: 312,
    specializations: ['Vinyasa', 'Yin', 'Restorative'],
    experience: 12,
    pricePerSession: 80,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Senior yoga instructor with 12 years experience and expertise in flow-based and restorative practices.',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Kiran Rao',
    avatar: '',
    rating: 4.5,
    reviewCount: 67,
    specializations: ['Prenatal', 'Restorative'],
    experience: 4,
    pricePerSession: 40,
    currency: 'USD',
    timezone: 'Asia/Kolkata',
    bio: 'Certified prenatal yoga teacher helping expecting mothers stay active and comfortable throughout pregnancy.',
    isAvailable: true,
  },
]

export const teacherService = {
  getAll: async (filters?: TeacherFilters): Promise<Teacher[]> => {
    await new Promise((r) => setTimeout(r, 500))
    let teachers = [...MOCK_TEACHERS]
    if (filters?.specialization) {
      teachers = teachers.filter((t) =>
        t.specializations.includes(filters.specialization!)
      )
    }
    if (filters?.maxPrice) {
      teachers = teachers.filter((t) => t.pricePerSession <= filters.maxPrice!)
    }
    if (filters?.availability) {
      teachers = teachers.filter((t) => t.isAvailable)
    }
    if (filters?.minRating) {
      teachers = teachers.filter((t) => t.rating >= filters.minRating!)
    }
    return teachers
  },

  getById: async (id: string): Promise<Teacher> => {
    await new Promise((r) => setTimeout(r, 300))
    const teacher = MOCK_TEACHERS.find((t) => t.id === id)
    if (!teacher) throw new Error('Teacher not found')
    return teacher
  },
}
