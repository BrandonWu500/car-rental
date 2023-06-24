import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import { prisma } from '@/libs/prismadb';
import { TypeSafeListing } from '@/types';

interface ListingPageProps {
  listing: TypeSafeListing;
}

interface IParams {
  params: { listingId: string };
}

export const getStaticProps = async ({ params }: IParams) => {
  const { listingId } = params;

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: true,
    },
  });

  if (!listing) return { notFound: true };

  const typeSafeListing = {
    ...listing,
    createdAt: listing.createdAt.toString(),
    user: {
      ...listing.user,
      createdAt: listing.user.createdAt.toString(),
      updatedAt: listing.user.updatedAt.toString(),
      emailVerified: listing.user.emailVerified?.toString() || null,
    },
  };

  return {
    props: {
      listing: typeSafeListing,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const listings = await prisma.listing.findMany();

  const paths = listings.map((listing) => ({
    params: { id: listing.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const ListingPage = ({ listing }: ListingPageProps) => {
  return <div>ListingPage</div>;
};
export default ListingPage;
