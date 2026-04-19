'use client'

import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        style={{ flex: 1, backgroundColor: '#f8fafc' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PageWrapper
