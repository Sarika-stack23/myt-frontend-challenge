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
  const { user, isAuthenticated, logout, setUser } = useAuth()

  const handleSignIn = () => {
    setUser({
      id: '1',
      name: 'Sarika Jivrajika',
      email: 'sarika@test.com',
      timezone: 'Asia/Kolkata',
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          MyYogaTeacher
        </Link>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={clsx(
                  'text-sm font-medium transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1',
                  pathname === href
                    ? 'text-green-600 border-b-2 border-green-600 pb-0.5'
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
            <div className="flex items-center gap-3">
              <Avatar
                src={user.avatar}
                alt={user.name}
                fallback={user.name}
                size="sm"
              />
              <span className="text-sm text-gray-700 font-medium hidden md:block">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
