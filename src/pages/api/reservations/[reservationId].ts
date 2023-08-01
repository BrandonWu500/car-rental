import { serverAuth } from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.status(405).end();
  }

  try {
    const currentUser = serverAuth(req, res);

    if (!currentUser) return res.status(401).json({ message: 'Unauthorized' });

    const { reservationId } = req.query;

    if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.delete({
      where: { id: reservationId },
    });

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
