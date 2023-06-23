import Container from '@/components/Container';

import { prisma } from '@/libs/prismadb';
import { TypeSafeListing } from '@/types';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const listings = await prisma.listing.findMany();

  const typeSafeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return {
    props: { listings: typeSafeListings },
    revalidate: 5,
  };
};

interface HomeProps {
  listings: TypeSafeListing[];
}

const Home = ({ listings }: HomeProps) => {
  return (
    <Container>
      <div
        className="grid grid-cols-1 gap-8 pt-24
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    2xl:grid-cols-6"
      >
        {listings?.map((listing) => (
          <div key={listing.id}>{listing.make}</div>
        ))}
      </div>
    </Container>
  );
};
export default Home;
