import { useQuery } from '@tanstack/react-query';
import { teacherService } from '@/services/teacherService';
import { TeacherFilters } from '@/types/teacher';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useTeachers = (filters?: TeacherFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.TEACHERS,
    queryFn: () => teacherService.getAll(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTeacher = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.TEACHER(id),
    queryFn: () => teacherService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
