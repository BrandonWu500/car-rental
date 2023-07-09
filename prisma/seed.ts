import { Listing } from '@prisma/client';
import { addDays } from 'date-fns';
import { prisma } from './../libs/prismadb';
import { createTestUser } from './reset-db';

const createTestListing = async (userId: string) => {
  const listingInputData = {
    category: 'Sports Cars',
    imageSrc:
      'https://res.cloudinary.com/dqrdsleqt/image/upload/v1687955203/zl55ycdkze7q2tvcxg9r.jpg',
    info: "It's really fun to drive!",
    state: 'CA',
    city: 'Los Angeles',
    make: 'Honda',
    model: 'Civic',
    passengerCount: 5,
    price: 250,
    trim: 'Type R',
    userId,
  };

  return await prisma.listing.create({
    data: listingInputData,
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

    const listing1 = await createTestListing(user1.id);

    await createTestReservation(user2.id, listing1);
  } catch (error) {
    console.error('Failed to seed DB');
    console.error(error);
  }
};
