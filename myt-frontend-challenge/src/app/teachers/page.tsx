import { Metadata } from 'next';
import TeachersClient from './TeachersClient';
import PageWrapper from '@/components/layout/PageWrapper';
import { teacherService } from '@/services/teacherService';
import { Teacher } from '@/types/teacher';

export const metadata: Metadata = {
  title: 'Browse Teachers',
  description:
    'Find and book sessions with our expert yoga teachers. Filter by specialization, price, and availability.',
};

// SSR — dynamic filters & SEO critical
export const dynamic = 'force-dynamic';

async function getTeachers(): Promise<Teacher[]> {
  try {
    return await teacherService.getAll();
  } catch {
    return [];
  }
}

export default async function TeachersPage() {
  const initialTeachers = await getTeachers();

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Teachers</h1>
        <p className="text-gray-600 mt-2">
          Find your perfect yoga teacher from our expert community.
        </p>
      </div>
      <TeachersClient initialTeachers={initialTeachers} />
    </PageWrapper>
  );
}
