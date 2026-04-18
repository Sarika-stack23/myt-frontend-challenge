'use client'

import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { clsx } from 'clsx'

export interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className={clsx(
          'flex-1 w-full bg-gray-50',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PageWrapper
