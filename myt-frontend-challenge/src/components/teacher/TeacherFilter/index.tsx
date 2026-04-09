import { TeacherFilters } from '@/types/teacher';
import Button from '@/components/ui/Button';
import { clsx } from 'clsx';

export interface TeacherFilterProps {
  filters: TeacherFilters;
  onChange: (filters: TeacherFilters) => void;
  className?: string;
}

const SPECIALIZATIONS = [
  'Hatha', 'Vinyasa', 'Ashtanga',
  'Yin', 'Restorative', 'Prenatal',
];

export const TeacherFilter = ({
  filters,
  onChange,
  className,
}: TeacherFilterProps) => {
  return (
    <aside
      aria-label="Filter teachers"
      className={clsx('bg-white rounded-2xl border border-gray-100 p-5', className)}
    >
      <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialization
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              onClick={() =>
                onChange({
                  ...filters,
                  specialization:
                    filters.specialization === spec ? undefined : spec,
                })
              }
              aria-pressed={filters.specialization === spec}
              className={clsx(
                'px-3 py-1 rounded-full text-sm border transition-colors',
                filters.specialization === spec
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 text-gray-600 hover:border-green-400'
              )}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="max-price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Max Price: ${filters.maxPrice ?? 100}
        </label>
        <input
          id="max-price"
          type="range"
          min={10}
          max={200}
          step={10}
          value={filters.maxPrice ?? 100}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-green-600"
          aria-valuemin={10}
          aria-valuemax={200}
          aria-valuenow={filters.maxPrice ?? 100}
        />
      </div>

      <div className="mb-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.availability ?? false}
            onChange={(e) =>
              onChange({ ...filters, availability: e.target.checked })
            }
            className="accent-green-600"
          />
          <span className="text-sm text-gray-700">Available only</span>
        </label>
      </div>

      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={() => onChange({})}
      >
        Clear Filters
      </Button>
    </aside>
  );
};

export default TeacherFilter;
