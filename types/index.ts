import { Listing, User } from '@prisma/client';

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type TypeSafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type TypeSafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
