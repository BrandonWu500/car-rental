import { Listing } from '@prisma/client';

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type TypeSafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};
