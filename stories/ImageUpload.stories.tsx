import ImageUpload from '@/components/inputs/ImageUpload';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ImageUpload> = {
  component: ImageUpload,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Base: Story = {
  args: {},
};
