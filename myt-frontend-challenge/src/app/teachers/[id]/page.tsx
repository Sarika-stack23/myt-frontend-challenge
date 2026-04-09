import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import TeacherDetailClient from './TeacherDetailClient';
import { teacherService } from '@/services/teacherService';

interface Props {
  params: { id: string };
}

// SSR — dynamic per-teacher data & SEO
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const teacher = await teacherService.getById(params.id);
    return {
      title: `${teacher.name} — Yoga Teacher`,
      description: teacher.bio,
    };
  } catch {
    return { title: 'Teacher Not Found' };
  }
}

export default async function TeacherDetailPage({ params }: Props) {
  try {
    const teacher = await teacherService.getById(params.id);
    return (
      <PageWrapper>
        <TeacherDetailClient teacher={teacher} />
      </PageWrapper>
    );
  } catch {
    notFound();
  }
}
