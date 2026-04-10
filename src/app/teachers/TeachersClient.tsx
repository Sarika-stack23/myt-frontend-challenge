'use client';

import { useState } from 'react';
import { useTeachers } from '@/hooks/useTeachers';
import { useBookingStore } from '@/store';
import TeacherCard from '@/components/teacher/TeacherCard';
import TeacherFilter from '@/components/teacher/TeacherFilter';
import { BookingModal } from '@/components/booking/BookingModal';
import Spinner from '@/components/ui/Spinner';
import { Teacher, TeacherFilters } from '@/types/teacher';

interface TeachersClientProps {
  initialTeachers: Teacher[];
}

export default function TeachersClient({
  initialTeachers,
}: TeachersClientProps) {
  const [filters, setFilters] = useState<TeacherFilters>({});
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const { setIsModalOpen, isModalOpen } = useBookingStore();

  const { data: teachers, isLoading, isError } = useTeachers(filters);

  const displayTeachers = teachers ?? initialTeachers;

  const handleBook = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 shrink-0">
        <TeacherFilter filters={filters} onChange={setFilters} />
      </aside>

      <div className="flex-1">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" label="Loading teachers..." />
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="text-center py-20 text-red-600"
          >
            Failed to load teachers. Please try again.
          </div>
        ) : displayTeachers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No teachers found matching your filters.
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {displayTeachers.length} teacher
              {displayTeachers.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            setIsModalOpen(false);
            setSelectedTeacher(null);
          }}
          onSuccess={() => {
            setIsModalOpen(false);
            setSelectedTeacher(null);
          }}
        />
      )}
    </div>
  );
}
