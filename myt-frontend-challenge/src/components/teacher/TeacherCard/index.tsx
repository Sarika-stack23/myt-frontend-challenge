import { Teacher } from '@/types/teacher';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Star, Clock } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { clsx } from 'clsx';

export interface TeacherCardProps {
  teacher: Teacher;
  onBook: (teacher: Teacher) => void;
  className?: string;
}

export const TeacherCard = ({
  teacher,
  onBook,
  className,
}: TeacherCardProps) => {
  return (
    <article
      className={clsx(
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        'p-5 flex flex-col gap-4 hover:shadow-md transition-shadow',
        className
      )}
      aria-label={`Teacher: ${teacher.name}`}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={teacher.avatar}
          alt={teacher.name}
          fallback={teacher.name}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {teacher.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star
              size={14}
              className="text-yellow-400 fill-yellow-400"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600">
              {teacher.rating.toFixed(1)}
              <span className="text-gray-400 ml-1">
                ({teacher.reviewCount} reviews)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
            <Clock size={12} aria-hidden="true" />
            <span>{teacher.experience} years experience</span>
          </div>
        </div>
        <Badge
          label={teacher.isAvailable ? 'Available' : 'Busy'}
          variant={teacher.isAvailable ? 'success' : 'warning'}
        />
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{teacher.bio}</p>

      <div className="flex flex-wrap gap-1">
        {teacher.specializations.slice(0, 3).map((spec) => (
          <Badge key={spec} label={spec} variant="info" />
        ))}
        {teacher.specializations.length > 3 && (
          <Badge
            label={`+${teacher.specializations.length - 3} more`}
            variant="neutral"
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="font-semibold text-gray-900">
          {formatPrice(teacher.pricePerSession, teacher.currency)}
          <span className="text-sm font-normal text-gray-500"> / session</span>
        </span>
        <Button
          size="sm"
          onClick={() => onBook(teacher)}
          disabled={!teacher.isAvailable}
          aria-label={`Book session with ${teacher.name}`}
        >
          Book Now
        </Button>
      </div>
    </article>
  );
};

export default TeacherCard;
