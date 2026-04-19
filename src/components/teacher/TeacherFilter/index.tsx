import { TeacherFilters } from '@/types/teacher'

export interface TeacherFilterProps {
  filters: TeacherFilters
  onChange: (filters: TeacherFilters) => void
  className?: string
}

const SPECIALIZATIONS = [
  'Hatha', 'Vinyasa', 'Ashtanga',
  'Yin', 'Restorative', 'Prenatal',
]

export const TeacherFilter = ({ filters, onChange }: TeacherFilterProps) => {
  return (
    <aside
      aria-label="Filter teachers"
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '24px',
        position: 'sticky',
        top: '80px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
          Filters
        </h2>
        <button
          onClick={() => onChange({})}
          style={{
            fontSize: '12px',
            color: '#16a34a',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          Reset all
        </button>
      </div>

      {/* Specialization */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#374151',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Specialization
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SPECIALIZATIONS.map(spec => (
            <button
              key={spec}
              onClick={() => onChange({
                ...filters,
                specialization: filters.specialization === spec ? undefined : spec,
              })}
              aria-pressed={filters.specialization === spec}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 500,
                border: '1.5px solid',
                borderColor: filters.specialization === spec ? '#16a34a' : '#e2e8f0',
                background: filters.specialization === spec ? '#16a34a' : '#ffffff',
                color: filters.specialization === spec ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}>
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#374151',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Max Price
          </p>
          <span style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#16a34a',
          }}>
            ${filters.maxPrice ?? 100}
          </span>
        </div>
        <input
          id="max-price"
          type="range"
          min={10}
          max={200}
          step={10}
          value={filters.maxPrice ?? 100}
          onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          style={{ width: '100%', accentColor: '#16a34a' }}
          aria-label="Maximum price per session"
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#94a3b8',
          marginTop: '4px',
        }}>
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>

      {/* Availability */}
      <div style={{
        padding: '14px',
        background: '#f8fafc',
        borderRadius: '12px',
        marginBottom: '20px',
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={filters.availability ?? false}
            onChange={e => onChange({ ...filters, availability: e.target.checked })}
            style={{ accentColor: '#16a34a', width: '16px', height: '16px' }}
          />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
              Available only
            </p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Show teachers ready to book
            </p>
          </div>
        </label>
      </div>

      <button
        onClick={() => onChange({})}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          border: '1.5px solid #e2e8f0',
          background: '#ffffff',
          color: '#64748b',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Clear All Filters
      </button>
    </aside>
  )
}

export default TeacherFilter
