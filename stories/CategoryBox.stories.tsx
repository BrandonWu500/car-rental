import CategoryBox from '@/components/categories/CategoryBox';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CategoryBox> = {
  component: CategoryBox,
  tags: ['autodocs'],
  argTypes: {
    selected: {
      type: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBox>;

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
