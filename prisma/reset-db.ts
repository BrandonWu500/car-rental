import { hash } from 'bcrypt';

import { prisma } from './../libs/prismadb';

const deleteAll = async () => {
  await prisma.user.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.reservation.deleteMany();
};

export const createTestUser = async (name: string, password: string) => {
  return await prisma.user.create({
    data: {
      email: `${name}@test.com`,
      name,
      hashedPassword: await hash(password, 12),
    },
  });
};

export const resetDB = async () => {
  try {
    await deleteAll();

    await createTestUser('john', '123456');
  } catch (error) {
    console.error('Failed to reset DB');
    console.error(error);
  }
};
