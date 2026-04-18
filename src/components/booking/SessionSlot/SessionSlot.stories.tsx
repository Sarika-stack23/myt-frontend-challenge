import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SessionSlot } from './index'
import { Session } from '@/types/session'

const mockSession: Session = {
  id: '1',
  teacherId: 'teacher-1',
  startTime: '2026-05-01T09:00:00Z',
  endTime: '2026-05-01T10:00:00Z',
  duration: 60,
  status: 'available',
  price: 60,
  currency: 'USD',
}

const meta: Meta<typeof SessionSlot> = {
  title: 'Booking/SessionSlot',
  component: SessionSlot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SessionSlot>

export const Available: Story = {
  args: { session: mockSession, onSelect: () => {}, isSelected: false },
}

export const Selected: Story = {
  args: { session: mockSession, onSelect: () => {}, isSelected: true },
}

export const Booked: Story = {
  args: {
    session: { ...mockSession, status: 'booked' },
    onSelect: () => {},
  },
}
