import { useQuery } from '@tanstack/react-query';
import { sessionService } from '@/services/sessionService';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useSessions = (teacherId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.SESSIONS(teacherId),
    queryFn: () => sessionService.getByTeacher(teacherId),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 2,
  });
};
