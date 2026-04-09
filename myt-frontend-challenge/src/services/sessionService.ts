import api from './api';
import { Session } from '@/types/session';

export const sessionService = {
  getByTeacher: async (teacherId: string): Promise<Session[]> => {
    const { data } = await api.get(`/sessions`, { params: { teacherId } });
    return data;
  },

  getById: async (id: string): Promise<Session> => {
    const { data } = await api.get(`/sessions/${id}`);
    return data;
  },
};
