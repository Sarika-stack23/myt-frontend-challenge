import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = { args: { label: 'Available', variant: 'success' } }
export const Warning: Story = { args: { label: 'Busy', variant: 'warning' } }
export const Error: Story = { args: { label: 'Cancelled', variant: 'error' } }
export const Info: Story = { args: { label: 'Hatha', variant: 'info' } }
export const Neutral: Story = { args: { label: '+2 more', variant: 'neutral' } }
