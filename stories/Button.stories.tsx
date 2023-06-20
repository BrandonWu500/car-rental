import Button from '@/components/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { FcGoogle } from 'react-icons/fc';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      type: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {},
};

export const GoogleSignIn: Story = {
  args: {
    icon: FcGoogle,
    label: 'Continue with Google',
    intent: 'secondary',
  },
};
