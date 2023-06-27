import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { LOCATION_TYPE } from '@/types';

import LocationSelect from '@/components/inputs/LocationSelect';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LocationSelect> = {
  component: LocationSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LocationSelect>;

export const EmptyCity: Story = {
  args: {
    value: '',
    onChange: () => {},
    type: LOCATION_TYPE.CITY,
  },
};

export const SelectedCity: Story = {
  args: {
    value: 'Lexington, MA',
    onChange: () => {},
    type: LOCATION_TYPE.CITY,
  },
};

export const SelectCityTest: Story = {
  args: {
    type: LOCATION_TYPE.CITY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('City');
    await userEvent.click(input);
    await userEvent.type(input, 'Concord');
    const option = await canvas.findByText(/West Concord, MA/i);
    await userEvent.click(option);
    await expect(option).toBeInTheDocument();
  },
};

export const DiffStateCodeTest: Story = {
  args: {
    stateCode: 'CA',
    type: LOCATION_TYPE.CITY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('City');
    await userEvent.click(input);
    await userEvent.type(input, 'San Francisco');
    const option = await canvas.findByText('San Francisco, CA');
    await userEvent.click(option);
    await expect(option).toBeInTheDocument();
  },
};
