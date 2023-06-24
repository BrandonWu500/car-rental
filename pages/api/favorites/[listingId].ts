import { NextApiRequest, NextApiResponse } from 'next';

import { serverAuth } from '@/libs/serverAuth';
import { prisma } from './../../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await serverAuth(req, res);

    if (!currentUser) {
      throw new Error('Need to be logged in.');
    }

    if (req.method === 'POST') {
      const { listingId } = req.query;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }

      let favoriteIds = [...(currentUser.favoriteIds || [])];

      favoriteIds.push(listingId);

      const user = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds,
        },
      });

      return res.json(user);
    }

    if (req.method === 'DELETE') {
      const { listingId } = req.query;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }

      let favoriteIds = [...(currentUser.favoriteIds || [])];

      favoriteIds = favoriteIds.filter((id) => id !== listingId);

      const user = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds,
        },
      });

      return res.json(user);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
