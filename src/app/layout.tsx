import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyYogaTeacher — Find Your Perfect Yoga Teacher',
  description: 'Book 1-on-1 live yoga sessions with expert teachers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{
        colorScheme: 'light',
        backgroundColor: '#f8fafc',
      }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <style>{`
          :root { color-scheme: light !important; }
          * { color-scheme: light !important; }
          html, body {
            background-color: #f8fafc !important;
            color: #0f172a !important;
          }
        `}</style>
      </head>
      <body
        className={inter.className}
        style={{
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          minHeight: '100vh',
          colorScheme: 'light',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
