import { clsx } from 'clsx';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-4',
  lg: 'w-12 h-12 border-4',
};

export const Spinner = ({
  size = 'md',
  label = 'Loading...',
  className,
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={clsx('flex items-center justify-center', className)}
    >
      <div
        className={clsx(
          'rounded-full border-gray-200 border-t-green-600 animate-spin',
          sizeStyles[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
