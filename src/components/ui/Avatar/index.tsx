import { clsx } from 'clsx'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  src?: string
  alt: string
  size?: AvatarSize
  fallback?: string
  className?: string
}

const sizeMap: Record<AvatarSize, { px: number; class: string }> = {
  sm: { px: 32, class: 'w-8 h-8 text-xs' },
  md: { px: 48, class: 'w-12 h-12 text-sm' },
  lg: { px: 64, class: 'w-16 h-16 text-base' },
  xl: { px: 96, class: 'w-24 h-24 text-xl' },
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}: AvatarProps) => {
  const { px, class: sizeClass } = sizeMap[size]

  if (src) {
    return (
      <div
        className={clsx(
          'relative rounded-full overflow-hidden bg-gray-200 shrink-0',
          sizeClass,
          className
        )}
        style={{ minWidth: px, minHeight: px }}
      >
        <img
          src={src}
          alt={alt}
          width={px}
          height={px}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  return (
    <div
      aria-label={alt}
      role="img"
      className={clsx(
        'rounded-full bg-green-100 text-green-700 shrink-0',
        'flex items-center justify-center font-semibold',
        sizeClass,
        className
      )}
      style={{ minWidth: px, minHeight: px }}
    >
      {fallback ? getInitials(fallback) : '?'}
    </div>
  )
}

export default Avatar
