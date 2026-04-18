import { render, screen, fireEvent } from '@testing-library/react'
import { TeacherCard } from '@/components/teacher/TeacherCard'
import { Teacher } from '@/types/teacher'

const mockTeacher: Teacher = {
  id: '1',
  name: 'Jane Doe',
  avatar: '',
  rating: 4.8,
  reviewCount: 120,
  specializations: ['Hatha', 'Vinyasa', 'Yin'],
  experience: 8,
  pricePerSession: 50,
  currency: 'USD',
  timezone: 'UTC',
  bio: 'Expert yoga teacher with 8 years of experience.',
  isAvailable: true,
}

describe('TeacherCard', () => {
  it('renders teacher name', () => {
    render(<TeacherCard teacher={mockTeacher} onBook={jest.fn()} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders rating', () => {
    render(<TeacherCard teacher={mockTeacher} onBook={jest.fn()} />)
    expect(screen.getByText(/4.8/)).toBeInTheDocument()
  })

  it('renders specializations', () => {
    render(<TeacherCard teacher={mockTeacher} onBook={jest.fn()} />)
    expect(screen.getByText('Hatha')).toBeInTheDocument()
    expect(screen.getByText('Vinyasa')).toBeInTheDocument()
  })

  it('calls onBook when book button clicked', () => {
    const onBook = jest.fn()
    render(<TeacherCard teacher={mockTeacher} onBook={onBook} />)
    fireEvent.click(screen.getByRole('button', { name: /book session with jane doe/i }))
    expect(onBook).toHaveBeenCalledWith(mockTeacher)
  })

  it('disables book button when teacher unavailable', () => {
    const unavailableTeacher = { ...mockTeacher, isAvailable: false }
    render(<TeacherCard teacher={unavailableTeacher} onBook={jest.fn()} />)
    expect(screen.getByRole('button', { name: /book session/i })).toBeDisabled()
  })

  it('shows available badge when teacher is available', () => {
    render(<TeacherCard teacher={mockTeacher} onBook={jest.fn()} />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('shows more specializations badge when more than 3', () => {
    const teacher = {
      ...mockTeacher,
      specializations: ['Hatha', 'Vinyasa', 'Yin', 'Restorative', 'Prenatal'],
    }
    render(<TeacherCard teacher={teacher} onBook={jest.fn()} />)
    expect(screen.getByText('+2 more')).toBeInTheDocument()
  })
})
