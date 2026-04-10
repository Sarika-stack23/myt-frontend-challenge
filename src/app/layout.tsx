import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MyYogaTeacher — Find Your Perfect Yoga Teacher',
    template: '%s | MyYogaTeacher',
  },
  description:
    'Book 1-on-1 live yoga sessions with expert teachers. 200K+ students worldwide.',
  keywords: ['yoga', 'online yoga', 'yoga teacher', 'live sessions'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myt.dev',
    siteName: 'MyYogaTeacher',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
