'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Teachers', href: ROUTES.TEACHERS },
  { label: 'Dashboard', href: ROUTES.DASHBOARD },
]

export const Navbar = () => {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          MyYogaTeacher
        </Link>

        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={clsx(
                  'text-sm font-medium transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500 rounded',
                  pathname === href
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <Avatar
                src={user.avatar}
                alt={user.name}
                fallback={user.name}
                size="sm"
              />
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => {}}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar