'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'

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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href={ROUTES.HOME} style={{
          fontSize: '20px',
          fontWeight: 800,
          color: '#16a34a',
          textDecoration: 'none',
        }}>
          MyYogaTeacher
        </Link>

        <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: pathname === href ? '#16a34a' : '#475569',
                  borderBottom: pathname === href ? '2px solid #16a34a' : 'none',
                  paddingBottom: pathname === href ? '2px' : '0',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated && user ? (
            <>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
              }}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <span style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              style={{
                background: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
