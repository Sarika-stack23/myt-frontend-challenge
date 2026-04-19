import { Teacher } from '@/types/teacher'
import { formatPrice } from '@/utils/formatPrice'

export interface TeacherCardProps {
  teacher: Teacher
  onBook: (teacher: Teacher) => void
  className?: string
}

export const TeacherCard = ({ teacher, onBook }: TeacherCardProps) => {
  return (
    <article
      aria-label={`Teacher: ${teacher.name}`}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {/* Top color bar */}
      <div style={{
        height: '6px',
        background: teacher.isAvailable
          ? 'linear-gradient(90deg, #16a34a, #22c55e)'
          : 'linear-gradient(90deg, #94a3b8, #cbd5e1)',
      }} />

      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800,
            flexShrink: 0,
          }}>
            {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {teacher.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                {teacher.rating.toFixed(1)}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                ({teacher.reviewCount} reviews)
              </span>
            </div>
          </div>
          <span style={{
            background: teacher.isAvailable ? '#dcfce7' : '#fef9c3',
            color: teacher.isAvailable ? '#166534' : '#854d0e',
            borderRadius: '999px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {teacher.isAvailable ? '● Available' : '○ Busy'}
          </span>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '14px',
          padding: '10px 12px',
          background: '#f8fafc',
          borderRadius: '10px',
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              {teacher.experience}
            </p>
            <p style={{ fontSize: '11px', color: '#64748b' }}>Years</p>
          </div>
          <div style={{ width: '1px', background: '#e2e8f0' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              {teacher.reviewCount}
            </p>
            <p style={{ fontSize: '11px', color: '#64748b' }}>Reviews</p>
          </div>
          <div style={{ width: '1px', background: '#e2e8f0' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a' }}>
              {teacher.rating.toFixed(1)}
            </p>
            <p style={{ fontSize: '11px', color: '#64748b' }}>Rating</p>
          </div>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: 1.6,
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {teacher.bio}
        </p>

        {/* Specializations */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {teacher.specializations.slice(0, 3).map(spec => (
            <span key={spec} style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              borderRadius: '6px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 500,
            }}>
              {spec}
            </span>
          ))}
          {teacher.specializations.length > 3 && (
            <span style={{
              background: '#f1f5f9',
              color: '#64748b',
              borderRadius: '6px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 500,
            }}>
              +{teacher.specializations.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid #f1f5f9',
        }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              {formatPrice(teacher.pricePerSession, teacher.currency)}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}> / session</span>
          </div>
          <button
            onClick={() => onBook(teacher)}
            disabled={!teacher.isAvailable}
            aria-label={`Book session with ${teacher.name}`}
            style={{
              background: teacher.isAvailable
                ? 'linear-gradient(135deg, #16a34a, #15803d)'
                : '#e2e8f0',
              color: teacher.isAvailable ? '#ffffff' : '#94a3b8',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: teacher.isAvailable ? 'pointer' : 'not-allowed',
              transition: 'opacity 0.2s',
            }}
          >
            {teacher.isAvailable ? 'Book Now →' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default TeacherCard
