import { Teacher } from '@/types/teacher';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Star, Clock, Globe } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

export interface TeacherProfileProps {
  teacher: Teacher;
  onBook: (teacher: Teacher) => void;
}

export const TeacherProfile = ({ teacher, onBook }: TeacherProfileProps) => {
  return (
    <section aria-label={`Profile of ${teacher.name}`}>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar
          src={teacher.avatar}
          alt={teacher.name}
          fallback={teacher.name}
          size="xl"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {teacher.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Star
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                  aria-hidden="true"
                />
                <span className="font-medium">{teacher.rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">
                  ({teacher.reviewCount} reviews)
                </span>
              </div>
            </div>
            <Badge
              label={teacher.isAvailable ? 'Available' : 'Unavailable'}
              variant={teacher.isAvailable ? 'success' : 'warning'}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={14} aria-hidden="true" />
              {teacher.experience} years experience
            </span>
            <span className="flex items-center gap-1">
              <Globe size={14} aria-hidden="true" />
              {teacher.timezone}
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{teacher.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {teacher.specializations.map((spec) => (
              <Badge key={spec} label={spec} variant="info" />
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(teacher.pricePerSession, teacher.currency)}
              <span className="text-base font-normal text-gray-500">
                {' '}/ session
              </span>
            </span>
            <Button
              size="lg"
              onClick={() => onBook(teacher)}
              disabled={!teacher.isAvailable}
            >
              Book a Session
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherProfile;
