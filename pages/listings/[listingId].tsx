import { GetStaticPaths } from 'next';

import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import ListingReservation from '@/components/listings/ListingReservation';
import { useReservation } from '@/hooks/useReservation';
import { useReservations } from '@/hooks/useReservations';
import { prisma } from '@/libs/prismadb';
import { SafeTypeListing, SafeTypeUser } from '@/types';

interface ListingPageProps {
  listing: SafeTypeListing & {
    user: SafeTypeUser;
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

  const safeTypeListing = {
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
      listing: safeTypeListing,
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
  const { createReservation, isLoading, dateRange, totalPrice, setDateRange } =
    useReservation({
      listing,
    });
  const {
    reservations,
    isLoading: loadingReservations,
    disabledDates,
  } = useReservations();

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
            id={listing.id}
          />
          <div
            className="mt-6 grid grid-cols-1
          md:grid-cols-7 md:gap-10"
          >
            <ListingInfo
              user={listing.user}
              category={listing.category}
              info={listing.info}
              passengerCount={listing.passengerCount}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={createReservation}
                disabled={isLoading || loadingReservations}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingPage;
