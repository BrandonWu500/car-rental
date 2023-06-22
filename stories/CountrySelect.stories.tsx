import CountrySelect from '@/components/inputs/CountrySelect';
import type { Meta, StoryObj } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CountrySelect> = {
  component: CountrySelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;

const CountrySelectMockValue = {
  value: 'AW',
  label: 'Aruba',
  flag: '🇦🇼',
  region: 'Americas',
};

export const Base: Story = {
  args: {},
};

export const SelectedOption: Story = {
  args: {
    value: CountrySelectMockValue,
  },
};
