import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

import { prisma } from './../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill out the required fields' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ message: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: `Something went wrong: ${error}` });
  }
}
