import FavoriteButton from '@/components/FavoriteButton';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof FavoriteButton> = {
  component: FavoriteButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

export const Base: Story = {
  args: {},
};
