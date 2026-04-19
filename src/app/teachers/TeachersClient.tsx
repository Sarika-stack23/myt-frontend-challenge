'use client'

import { useState } from 'react'
import { useTeachers } from '@/hooks/useTeachers'
import { useBookingStore } from '@/store'
import TeacherCard from '@/components/teacher/TeacherCard'
import TeacherFilter from '@/components/teacher/TeacherFilter'
import { BookingModal } from '@/components/booking/BookingModal'
import Spinner from '@/components/ui/Spinner'
import { Teacher, TeacherFilters } from '@/types/teacher'

interface TeachersClientProps {
  initialTeachers: Teacher[]
}

export default function TeachersClient({
  initialTeachers,
}: TeachersClientProps) {
  const [filters, setFilters] = useState<TeacherFilters>({})
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const { setIsModalOpen, isModalOpen } = useBookingStore()

  const { data: teachers, isLoading, isError } = useTeachers(filters)
  const displayTeachers = teachers ?? initialTeachers

  const handleBook = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsModalOpen(true)
  }

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {/* Filter sidebar */}
      <aside style={{ width: '260px', flexShrink: 0 }}>
        <TeacherFilter filters={filters} onChange={setFilters} />
      </aside>

      {/* Teacher grid */}
      <div style={{ flex: 1, minHeight: '400px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <Spinner size="lg" label="Loading teachers..." />
          </div>
        ) : isError ? (
          <div
            role="alert"
            style={{ textAlign: 'center', padding: '80px', color: '#dc2626' }}
          >
            Failed to load teachers. Please try again.
          </div>
        ) : displayTeachers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>
            No teachers found matching your filters.
          </div>
        ) : (
          <>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '16px',
            }}>
              {displayTeachers.length} teacher
              {displayTeachers.length !== 1 ? 's' : ''} found
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {displayTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onBook={handleBook}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedTeacher && (
        <BookingModal
          teacher={selectedTeacher}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTeacher(null)
          }}
          onSuccess={() => {
            setIsModalOpen(false)
            setSelectedTeacher(null)
          }}
        />
      )}
    </div>
  )
}
