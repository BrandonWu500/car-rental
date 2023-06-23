import ListingCard from '@/components/listings/ListingCard';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ListingCard> = {
  component: ListingCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListingCard>;

const MockListingCard = {
  category: 'Electric',
  createdAt: '2023-06-23T16:55:59.859Z',
  id: '6495ce9fda1a86acf46e2aef',
  imageSrc:
    'https://res.cloudinary.com/dqrdsleqt/image/upload/v1687539316/s4oddctnhknuljcns8oe.jpg',
  info: 'Color: White',
  locationValue: 'US',
  make: 'Tesla',
  model: 'Model Y',
  passengerCount: 4,
  price: 25,
  trim: 'Performance AWD',
  userId: '648cd3a64c4f14628549a8af',
};

export const Base: Story = {
  args: {
    listing: MockListingCard,
  },
};
