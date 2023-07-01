import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';

import { prisma } from '@/libs/prismadb';
import { SafeTypeListing } from '@/types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { passengerCount, state, city, startDate, endDate, category } =
    ctx.query;

  // prisma query
  const query: any = {};

  if (passengerCount) {
    query.passengerCount = {
      gte: +passengerCount,
    };
  }

  if (state && city) {
    query.state = state;
    query.city = city;
  }

  if (category) {
    query.category = category;
  }

  if (startDate && endDate) {
    // filters out listings with reservations already made
    // that conflict with date range in query
    query.NOT = {
      reservations: {
        some: {
          OR: [
            // car will not be available at start of trip
            { startDate: { lte: startDate }, endDate: { gte: startDate } },

            // car will not be available at end of trip
            { startDate: { lte: endDate }, endDate: { gte: endDate } },
          ],
        },
      },
    };
  }

  const listings = await prisma.listing.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const safeTypeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return {
    props: { listings: safeTypeListings },
  };
};

interface HomeProps {
  listings: SafeTypeListing[];
}

const Home = ({ listings }: HomeProps) => {
  if (!listings.length) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="grid grid-cols-1 gap-8 pt-24
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    2xl:grid-cols-6"
      >
        {listings?.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
};
export default Home;
