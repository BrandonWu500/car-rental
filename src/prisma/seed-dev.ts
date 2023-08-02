import { PrismaClient } from '@prisma/client';
import { createTestUser } from './reset-db';
import { createTestListing } from './seed';

const prisma = new PrismaClient();

async function main() {
  const user1 = await createTestUser('joe', '123456');
  const user2 = await createTestUser('jane', '123456');

  await createTestListing(user1.id, 0);
  await createTestListing(user2.id, 1);
  await createTestListing(user1.id, 0);
  await createTestListing(user2.id, 1);
  await createTestListing(user1.id, 0);
  await createTestListing(user2.id, 1);
  await createTestListing(user1.id, 0);
  await createTestListing(user2.id, 1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
