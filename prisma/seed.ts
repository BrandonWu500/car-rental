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

  await prisma.listing.create({
    data: listingInputData,
  });
};

export const seed = async () => {
  try {
    const user1 = await createTestUser('joe', '123456');
    await createTestUser('jane', '123456');

    await createTestListing(user1.id);
  } catch (error) {
    console.error('Failed to seed DB');
    console.error(error);
  }
};
