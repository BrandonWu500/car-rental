import EmptyState from '@/components/EmptyState';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Base: Story = {
  args: {},
};
