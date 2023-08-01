import Categories from '@/components/categories/Categories';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Categories> = {
  component: Categories,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Categories>;

export const Base: Story = {
  args: {},
};
