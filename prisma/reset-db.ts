import { hash } from 'bcrypt';

import { prisma } from './../libs/prismadb';

const deleteAll = async () => {
  await prisma.user.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.reservation.deleteMany();
};

const createTestUser = async (name: string, password: string) => {
  return await prisma.user.create({
    data: {
      email: `${name}@test.com`,
      name,
      hashedPassword: await hash(password, 12),
    },
  });
};

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

export const resetDB = async () => {
  await deleteAll();
  const user1 = await createTestUser('john', '123456');
  await createTestUser('jane', '123456');

  await createTestListing(user1.id);
};
