import { clsx } from 'clsx';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-gray-100 text-gray-700',
};

export const Badge = ({
  label,
  variant = 'neutral',
  className,
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5',
        'rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
