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

    const {
      category,
      location,
      passengerCount,
      imageSrc,
      make,
      model,
      trim,
      info,
      price,
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        category,
        locationValue: location.value,
        passengerCount,
        imageSrc,
        make,
        model,
        trim,
        info,
        price: Number(price),
        userId: currentUser.id,
      },
    });

    return res.status(201).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
