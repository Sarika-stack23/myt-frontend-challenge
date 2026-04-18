import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-green-600 text-lg">MyYogaTeacher</p>
            <p className="text-sm text-gray-500 mt-1">
              © {new Date().getFullYear()} MyYogaTeacher. All rights reserved.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6" role="list">
              {[
                { label: 'Home', href: ROUTES.HOME },
                { label: 'Teachers', href: ROUTES.TEACHERS },
                { label: 'Dashboard', href: ROUTES.DASHBOARD },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
