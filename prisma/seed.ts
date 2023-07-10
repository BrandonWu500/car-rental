import { Listing, User } from '@prisma/client';
import { addDays } from 'date-fns';

import { prisma } from './../libs/prismadb';
import { LISTING_INPUT_DATA } from './../mocks/index';
import { createTestUser } from './reset-db';

const createTestListing = async (userId: string, idx: number) => {
  const listingInputData = {
    ...LISTING_INPUT_DATA[idx],
    userId,
  };

  return await prisma.listing.create({
    data: listingInputData,
  });
};

const favoriteTestListing = async (user: User, listing: Listing) => {
  const favoriteIds = [...(user.favoriteIds || [])];

  favoriteIds.push(listing.id);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });
};

const createTestReservation = async (userId: string, listing: Listing) => {
  const reservationInputData = {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    userId,
    totalPrice: listing.price * 2,
  };

  await prisma.listing.update({
    where: {
      id: listing.id,
    },
    data: {
      reservations: {
        create: reservationInputData,
      },
    },
  });
};

export const seed = async () => {
  try {
    const user1 = await createTestUser('joe', '123456');
    const user2 = await createTestUser('jane', '123456');

    const listing1 = await createTestListing(user1.id, 0);
    await createTestListing(user2.id, 1);

    await createTestReservation(user2.id, listing1);
  } catch (error) {
    console.error('Failed to seed DB');
    console.error(error);
  }
};
