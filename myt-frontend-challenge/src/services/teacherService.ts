import api from './api';
import { Teacher, TeacherFilters } from '@/types/teacher';

export const teacherService = {
  getAll: async (filters?: TeacherFilters): Promise<Teacher[]> => {
    const { data } = await api.get('/teachers', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Teacher> => {
    const { data } = await api.get(`/teachers/${id}`);
    return data;
  },
};
