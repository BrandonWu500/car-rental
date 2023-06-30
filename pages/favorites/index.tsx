import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import Grid from '@/components/layout/Grid';
import ListingCard from '@/components/listings/ListingCard';
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

const FavoritesPage = ({ favorites }: FavoritesPageProps) => {
  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite cars."
      />
    );
  }

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of cars you favorited!" />
      <Grid>
        {favorites.map((favorite: SafeTypeListing) => (
          <ListingCard key={favorite.id} listing={favorite} />
        ))}
      </Grid>
    </Container>
  );
};
export default FavoritesPage;
