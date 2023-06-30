import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { prisma } from '@/libs/prismadb';
import { serverAuth } from '@/libs/serverAuth';
import { SafeTypeListing } from '@/types';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { req, res } = ctx;

  const currentUser = await serverAuth(
    req as NextApiRequest,
    res as NextApiResponse
  );

  if (!currentUser)
    return {
      redirect: {
        permanent: false,
        destination: '/401',
      },
    };

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...(currentUser.favoriteIds ?? [])],
      },
    },
  });

  const safeFavorites = favorites.map((favorite) => ({
    ...favorite,
    createdAt: favorite.createdAt.toISOString(),
  }));

  return {
    props: {
      favorites: safeFavorites,
    },
  };
};

interface FavoritesPageProps {
  favorites: SafeTypeListing[];
}

const FavoritesPage = ({ favorites }: FavoritesPageProps) => {};
export default FavoritesPage;
