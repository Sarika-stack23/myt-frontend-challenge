export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  timezone: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
