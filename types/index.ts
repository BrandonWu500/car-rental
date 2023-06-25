import { Listing, User } from '@prisma/client';

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type SafeTypeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeTypeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
