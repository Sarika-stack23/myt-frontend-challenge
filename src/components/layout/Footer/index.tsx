import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <p style={{ fontWeight: 800, color: '#16a34a', fontSize: '18px' }}>
            MyYogaTeacher
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            © {new Date().getFullYear()} MyYogaTeacher. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
            {[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Teachers', href: ROUTES.TEACHERS },
              { label: 'Dashboard', href: ROUTES.DASHBOARD },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} style={{
                  fontSize: '14px',
                  color: '#64748b',
                  textDecoration: 'none',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
