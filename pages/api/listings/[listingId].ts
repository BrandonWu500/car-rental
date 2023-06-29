import { serverAuth } from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) return res.status(401).json({ message: 'Unauthorized' });

    if (req.method === 'GET') {
      const { listingId } = req.query;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }

      const listingReservations = await prisma.reservation.findMany({
        where: { listingId },
        include: {
          listing: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(listingReservations);
    }

    if (req.method === 'DELETE') {
      const { listingId } = req.query;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }

      const listing = await prisma.listing.deleteMany({
        where: {
          id: listingId,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(listing);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
