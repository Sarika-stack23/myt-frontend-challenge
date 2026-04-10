import { useUserStore } from '@/store';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, logout } = useUserStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    logout,
  };
};
