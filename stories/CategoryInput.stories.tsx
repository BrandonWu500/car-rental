import CategoryInput from '@/components/inputs/CategoryInput';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CategoryInput> = {
  component: CategoryInput,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      type: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryInput>;

export const Base: Story = {
  args: {
    label: 'Sedans',
  },
};

export const Selected: Story = {
  args: {
    label: 'Sedans',
    selected: true,
  },
};
