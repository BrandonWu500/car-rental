import ListingInfo from '@/components/listings/ListingInfo';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ListingInfo> = {
  component: ListingInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListingInfo>;

export const Base: Story = {
  args: {
    category: 'Electric',
    info: 'Color: White',
    passengerCount: 4,
    user: {
      id: 'test',
      name: 'John Doe',
      email: 'test@test.com',
      emailVerified: null,
      createdAt: '',
      updatedAt: '',
      image: '',
      hashedPassword: '',
      favoriteIds: [],
    },
  },
};
