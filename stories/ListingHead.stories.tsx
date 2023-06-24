import ListingHead from '@/components/listings/ListingHead';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ListingHead> = {
  component: ListingHead,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListingHead>;

export const Base: Story = {
  args: {
    locationValue: 'US',
    make: 'Tesla',
    model: 'Model Y',
    trim: 'Performance AWD',
    imageSrc:
      'https://res.cloudinary.com/dqrdsleqt/image/upload/v1687539316/s4oddctnhknuljcns8oe.jpg',
  },
};
