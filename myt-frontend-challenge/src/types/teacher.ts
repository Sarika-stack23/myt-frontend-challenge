export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  experience: number;
  pricePerSession: number;
  currency: string;
  timezone: string;
  bio: string;
  isAvailable: boolean;
}

export interface TeacherFilters {
  specialization?: string;
  minRating?: number;
  maxPrice?: number;
  availability?: boolean;
}
