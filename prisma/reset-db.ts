import { hash } from 'bcrypt';
import { prisma } from './../libs/prismadb';

const deleteAll = async () => {
  await prisma.user.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.reservation.deleteMany();
};

const createTestUser = async (name: string, password: string) => {
  await prisma.user.create({
    data: {
      email: `${name}@test.com`,
      name,
      hashedPassword: await hash(password, 12),
    },
  });
};

export const resetDB = async () => {
  await deleteAll();
  await createTestUser('john', '123456');
  await createTestUser('jane', '123456');
};
