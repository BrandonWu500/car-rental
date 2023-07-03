import { prisma } from './../libs/prismadb';

const deleteAll = async () => {
  await prisma.user.deleteMany();
};

export const resetDB = async () => {
  await deleteAll();
};
