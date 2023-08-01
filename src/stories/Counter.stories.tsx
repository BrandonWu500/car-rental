import Counter from '@/components/inputs/Counter';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Counter> = {
  component: Counter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Base: Story = {
  args: {
    value: 1,
  },
};
