import { Metadata } from 'next'
import TeachersClient from './TeachersClient'
import PageWrapper from '@/components/layout/PageWrapper'
import { teacherService } from '@/services/teacherService'
import { Teacher } from '@/types/teacher'

export const metadata: Metadata = {
  title: 'Browse Teachers',
  description: 'Find and book sessions with our expert yoga teachers.',
}

export const dynamic = 'force-dynamic'

async function getTeachers(): Promise<Teacher[]> {
  try {
    return await teacherService.getAll()
  } catch {
    return []
  }
}

export default async function TeachersPage() {
  const initialTeachers = await getTeachers()

  return (
    <PageWrapper>
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: '1px solid #bbf7d0',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '8px',
        }}>
          Browse Teachers 🧘
        </h1>
        <p style={{ color: '#475569', fontSize: '16px' }}>
          Find your perfect yoga teacher from our expert community of 500+ instructors.
        </p>
      </div>
      <TeachersClient initialTeachers={initialTeachers} />
    </PageWrapper>
  )
}
