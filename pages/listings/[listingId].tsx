import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import { prisma } from '@/libs/prismadb';
import { TypeSafeListing } from '@/types';

interface ListingPageProps {
  listing: TypeSafeListing;
}

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const listingId = ctx.params;

  if (typeof listingId !== 'string') return { notFound: true };

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) return { notFound: true };

  return {
    props: {
      ...listing,
      createdAt: listing.createdAt.toString(),
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
