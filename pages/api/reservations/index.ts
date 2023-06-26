import { serverAuth } from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const currentUser = await serverAuth(req, res);

      if (!currentUser) {
        throw new Error('Need to be logged in.');
      }

      const { listingId, startDate, endDate, totalPrice } = req.body;

      const listingAndReservation = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          reservations: {
            create: {
              userId: currentUser.id,
              startDate,
              endDate,
              totalPrice,
            },
          },
        },
      });

      return res.status(200).json(listingAndReservation);
    }

    if (req.method === 'GET') {
      const reservations = await prisma.reservation.findMany();
      return res.status(200).json(reservations);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
