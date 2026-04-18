import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Book Session', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Cancel', variant: 'secondary' },
}

export const Outline: Story = {
  args: { children: 'View Profile', variant: 'outline' },
}

export const Danger: Story = {
  args: { children: 'Cancel Booking', variant: 'danger' },
}

export const Loading: Story = {
  args: { children: 'Booking...', isLoading: true },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', disabled: true },
}

export const FullWidth: Story = {
  args: { children: 'Confirm & Pay', fullWidth: true },
  parameters: { layout: 'padded' },
}
