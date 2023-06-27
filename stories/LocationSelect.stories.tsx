import LocationSelect from '@/components/inputs/LocationSelect';
import { LOCATION_TYPE } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LocationSelect> = {
  component: LocationSelect,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: [LOCATION_TYPE.STATE, LOCATION_TYPE.CITY], // iterator
      mapping: [LOCATION_TYPE.STATE, LOCATION_TYPE.CITY], // values
      control: {
        type: 'radio',
        labels: ['state', 'city'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocationSelect>;

export const State: Story = {
  args: {
    type: LOCATION_TYPE.STATE,
  },
};

export const City: Story = {
  args: {
    type: LOCATION_TYPE.CITY,
    stateCode: 'MA',
  },
};
