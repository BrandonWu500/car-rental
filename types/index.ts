import { Listing, Reservation, User } from '@prisma/client';

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type SafeTypeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeTypeCar = Omit<Listing, 'createdAt'> & {
  createdAt: string;
  reservation: SafeTypeReservation;
};

export type SafeTypeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeTypeReservation = Omit<
  Reservation,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeTypeListing;
};

export enum LOCATION_TYPE {
  STATE,
  CITY,
}
