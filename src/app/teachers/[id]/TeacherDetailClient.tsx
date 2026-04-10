'use client';

import { useState } from 'react';
import { Teacher } from '@/types/teacher';
import TeacherProfile from '@/components/teacher/TeacherProfile';
import { BookingModal } from '@/components/booking/BookingModal';
import SessionSlot from '@/components/booking/SessionSlot';
import { useSessions } from '@/hooks/useSession';
import { useBookingStore } from '@/store';
import Spinner from '@/components/ui/Spinner';
import { Session } from '@/types/session';

export default function TeacherDetailClient({
  teacher,
}: {
  teacher: Teacher;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedSession } = useBookingStore();
  const { data: sessions, isLoading } = useSessions(teacher.id);

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-10">
      <TeacherProfile
        teacher={teacher}
        onBook={() => setIsModalOpen(true)}
      />

      <section aria-labelledby="sessions-heading">
        <h2
          id="sessions-heading"
          className="text-xl font-semibold text-gray-900 mb-4"
        >
          Available Sessions
        </h2>

        {isLoading ? (
          <Spinner label="Loading sessions..." />
        ) : sessions?.length === 0 ? (
          <p className="text-gray-500">No sessions available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {sessions?.map((session) => (
              <SessionSlot
                key={session.id}
                session={session}
                onSelect={handleSelectSession}
              />
            ))}
          </div>
        )}
      </section>

      <BookingModal
        teacher={teacher}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
