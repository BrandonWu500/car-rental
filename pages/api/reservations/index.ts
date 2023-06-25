import { serverAuth } from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
