import ListingReservation from '@/components/listings/ListingReservation';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ListingReservation> = {
  component: ListingReservation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListingReservation>;

const mockDateRange = {};

export const Base: Story = {
  args: {
    price: 25,
    dateRange: mockDateRange,
    totalPrice: 50,
    onChangeDate: (_mockDateRange) => {},
    onSubmit: () => {},
    disabledDates: [],
  },
};
