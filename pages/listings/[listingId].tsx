import { GetStaticPaths } from 'next';

import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import { prisma } from '@/libs/prismadb';
import { TypeSafeListing, TypeSafeUser } from '@/types';

interface ListingPageProps {
  listing: TypeSafeListing & {
    user: TypeSafeUser;
  };
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
    params: { listingId: listing.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const ListingPage = ({ listing }: ListingPageProps) => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            make={listing.make}
            model={listing.model}
            trim={listing.trim}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
          />
        </div>
      </div>
    </Container>
  );
};
export default ListingPage;
