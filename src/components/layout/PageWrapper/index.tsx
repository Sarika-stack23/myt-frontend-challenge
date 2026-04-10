'use client'
import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { clsx } from 'clsx';

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className={clsx('flex-1 max-w-7xl mx-auto w-full px-4 py-8', className)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
