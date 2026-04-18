import Link from 'next/link'
import { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Home',
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
      <section
        aria-labelledby="hero-heading"
        className="text-center py-16 px-4"
      >
        <h1
          id="hero-heading"
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Find Your Perfect
          <span className="text-green-600"> Yoga Teacher</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Book live 1-on-1 yoga sessions with expert teachers.
          Personalized guidance from the comfort of your home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={ROUTES.TEACHERS}>
            <Button size="lg">Browse Teachers</Button>
          </Link>
          <Link href={ROUTES.BOOKING}>
            <Button size="lg" variant="outline">
              Book a Session
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section
        aria-label="Platform statistics"
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 my-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-green-600">{value}</p>
              <p className="text-sm text-gray-600 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="py-8"
      >
        <h2
          id="features-heading"
          className="text-2xl font-bold text-gray-900 text-center mb-8"
        >
          Why MyYogaTeacher?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ title, description, icon }) => (
            <article
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 rounded-2xl p-10 text-center my-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          Ready to start your yoga journey?
        </h2>
        <p className="text-green-100 mb-6">
          Join 200K+ students already learning with expert teachers.
        </p>
        <Link href={ROUTES.TEACHERS}>
          <Button variant="secondary" size="lg">
            Find a Teacher
          </Button>
        </Link>
      </section>
    </PageWrapper>
  )
}
