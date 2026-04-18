import type { Meta, StoryObj } from '@storybook/react'
import { TeacherCard } from './index'
import { Teacher } from '@/types/teacher'

const mockTeacher: Teacher = {
  id: '1',
  name: 'Priya Sharma',
  avatar: '',
  rating: 4.9,
  reviewCount: 234,
  specializations: ['Hatha', 'Vinyasa', 'Yin', 'Restorative'],
  experience: 10,
  pricePerSession: 60,
  currency: 'USD',
  timezone: 'Asia/Kolkata',
  bio: 'Experienced yoga teacher specializing in Hatha and Vinyasa styles.',
  isAvailable: true,
}

const meta: Meta<typeof TeacherCard> = {
  title: 'Teacher/TeacherCard',
  component: TeacherCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TeacherCard>

export const Available: Story = {
  args: { teacher: mockTeacher, onBook: () => {} },
}

export const Unavailable: Story = {
  args: {
    teacher: { ...mockTeacher, isAvailable: false },
    onBook: () => {},
  },
}

export const ManySpecializations: Story = {
  args: {
    teacher: {
      ...mockTeacher,
      specializations: ['Hatha', 'Vinyasa', 'Yin', 'Restorative', 'Prenatal', 'Ashtanga'],
    },
    onBook: () => {},
  },
}
