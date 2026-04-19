import Link from 'next/link'
import { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Home — MyYogaTeacher',
  description: 'Find your perfect yoga teacher and book live 1-on-1 sessions.',
}

export const revalidate = 86400

const STATS = [
  { label: 'Active Students', value: '200K+' },
  { label: 'Expert Teachers', value: '500+' },
  { label: 'Sessions Daily', value: '5000+' },
  { label: 'Countries', value: '100+' },
]

const FEATURES = [
  {
    title: '1-on-1 Live Sessions',
    description: 'Personal attention from expert yoga teachers in real-time.',
    icon: '🧘',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your timezone and lifestyle.',
    icon: '📅',
  },
  {
    title: 'Expert Teachers',
    description: 'Verified teachers with years of experience.',
    icon: '⭐',
  },
]

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '24px',
        padding: '80px 40px',
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#dcfce7',
          color: '#166534',
          borderRadius: '999px',
          padding: '6px 16px',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '20px',
        }}>
          🌿 200K+ Students Worldwide
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: 1.15,
          marginBottom: '20px',
        }}>
          Find Your Perfect{' '}
          <span style={{ color: '#16a34a' }}>Yoga Teacher</span>
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#475569',
          maxWidth: '560px',
          margin: '0 auto 36px',
          lineHeight: 1.7,
        }}>
          Book live 1-on-1 yoga sessions with expert teachers.
          Personalized guidance from the comfort of your home.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={ROUTES.TEACHERS} style={{
            background: '#16a34a',
            color: '#ffffff',
            padding: '14px 32px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background 0.2s',
          }}>
            Browse Teachers
          </Link>
          <Link href={ROUTES.BOOKING} style={{
            background: '#ffffff',
            color: '#16a34a',
            border: '2px solid #16a34a',
            padding: '14px 32px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Book a Session
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9',
      }}>
        {STATS.map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>
              {value}
            </p>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#0f172a',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Why MyYogaTeacher?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {FEATURES.map(({ title, description, icon }) => (
            <article key={title} style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '32px 28px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '10px',
              }}>
                {title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '12px',
        }}>
          Ready to start your yoga journey?
        </h2>
        <p style={{ color: '#bbf7d0', marginBottom: '28px', fontSize: '16px' }}>
          Join 200K+ students already learning with expert teachers.
        </p>
        <Link href={ROUTES.TEACHERS} style={{
          background: '#ffffff',
          color: '#16a34a',
          padding: '14px 36px',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '16px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Find a Teacher →
        </Link>
      </section>
    </PageWrapper>
  )
}
